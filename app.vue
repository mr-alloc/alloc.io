<template>
  <div id="application-container" class="app-container" :class="{ dark: store.isDarkMode }">
    <MainHeader />
    <nuxt-page class="current-content" id="current-content-element" :page-key="route.fullPath" />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || photoViewStatus.isPhotoView || searchStatus.isSearchMode }"
         v-on:click="methods.clickBackground($event)">
      <div v-if="searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel" v-on:click="$event.stopPropagation()">
          <SearchResult v-for="group in groups.values()" :key="group" :row="group" />
        </div>
      </div>
      <PhotoView v-if="photoViewStatus.isPhotoView" v-on:click="$event.stopPropagation()" />
    </div>
    <LoadingBar />
  </div>
</template>
<script lang="ts" setup>
import Runner from '~/service/DefaultStarterService'
import appCache from "~/store/appCache";
import MainHeader from "~/components/layout/header/MainHeader.vue";
import LoadingBar from "~/components/layout/header/LoadingBar.vue";
import SearchResult from "~/components/layout/header/SearchResult.vue"
import MainFooter from "~/components/layout/content/MainFooter.vue";
import PhotoView from "~/components/layout/global/PhotoView.vue";
import { useDarkModeStore } from "~/store/DarkModeStore";
import {useHead} from "unhead";
import {mobileNaviStore, postCallStore} from "~/store";
import {PostSearchGroup} from "~/class/implement/PostSearchGroup";
import {Pair} from "~/class/implement/Pair";
import {useRoute, useRouter} from "vue-router";
import {PostSearchResult} from "~/class/implement/PostSearchResult";
import {groupingBy} from "~/utils/settingUtils";
import {useNuxtApp} from "#app/nuxt";
import {callPostFeed} from "~/utils/postUtil";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
import {usePhotoViewStatusStore} from "~/store/PhotoViewStore";


Runner.init()
const store = useDarkModeStore()
const route = useRoute()
const router = useRouter()
const { $emitter }= useNuxtApp()
const searchStatus = useSearchStatusStore()
const photoViewStatus = usePhotoViewStatusStore()

const components = {
  LoadingBar,
  MainHeader,
  MainFooter,
  SearchResult
}

const data = {
  mobileNaviStore,
  route
}

const groups = ref(new Map<string, PostSearchGroup>())
const searchLocationPair = ref<Pair<string, number>[]>([])
const currentLocationIndex = ref(0)
const methods = {
  clickBackground: (e: PointerEvent) => {
    if (searchStatus.isSearchMode) {
      data.mobileNaviStore.isActive = false
      searchStatus.cancelSearch()
    } else if (photoViewStatus.isPhotoView) {
      photoViewStatus.close()
    }
  }
}


onMounted(() => {

  //검색 결과
  $emitter.on('searchText', (result: PostSearchResult[]) => {
    const map: Map<string, PostSearchResult[]> = groupingBy<string, PostSearchResult>(result, (result)=> {
      const node = appCache.fileNodeMap.store.get(result.content.path)
      return node.group
    })

    const keys = [...groups.value.keys()]
    // clonedArray: Map<string, PostSearchGroup> = 기존 검색 결과
    // map: Map<string, PostSearchResult[]> = 신규 검색 결과
    keys.forEach(key => {
      // 기존 검색결과 와 같은 그룹이라면 업데이트
      if (map.has(key)) {
        const newResult = map.get(key) ?? []
        map.delete(key)
        const oldResult = groups.value.get(key)
        oldResult?.update(newResult)

        if (oldResult?.results.length == 0) {
          console.log('delete key:', key)
          groups.value.delete(key)
        }
        return
      }
      // 기존 그룹에있지만, 신규 결과에서 그룹이 없는 경우
      else {
        // console.log('old key delete:', key)
        // const beFinalize = groups.value.get(key)
        // beFinalize?.finalizeAllChild()
        groups.value.delete(key)
      }
    })

    //기존에 그룹에는 없고, 신규 결과에서 그룹이 있는경우
    const newKeys = [...map.entries()]
    newKeys.forEach(([key, value]) => {
      const group = new PostSearchGroup(key, value)
      groups.value.set(key, group)
      group.updateNewer()
    })

    const array = [...groups.value.values()]
    searchLocationPair.value = array.map(val => val.results.map((res, idx) => new Pair<string, number>(val.icon, idx)))
        .flat()
    currentLocationIndex.value = 0

    // const status = array.map(group => `\n(${group.results.length}) ${group.icon}\n${group.results.map((re, i) => `\t[${re.status}]${++i}. ${re.content.header.title}`).join('\n')}`).join('\n')
    // console.debug(status)

  })

  $emitter.on('selectResult', (select: number) => {
    const length = searchLocationPair.value.length
    //검색 결과가 없다면,
    if (length === 0) {
      currentLocationIndex.value = 0
      return
    }
    const cIndex = currentLocationIndex.value
    const pair = searchLocationPair.value[cIndex]
    //DOWN
    const currentTarget = groups.value.get(pair.left)?.results[pair.right]

    // 검색 결과 중 첫번째 요소가 아직 선택되지 않았다면 선택 처리
    if (cIndex === 0 && ! currentTarget?.isSelected){
      currentTarget?.selected(true)
      return
    }
    //0: Arrow down, 1: arrow up
    const nextIndex = (select == 0)
        ? cIndex +1 > length-1 ? length-1 : cIndex +1
        : cIndex -1 < 0 ? 0 : cIndex -1

    const nextPair = searchLocationPair.value[nextIndex]
    currentTarget?.selected(false)

    const nextTarget = groups.value.get(nextPair.left)?.results[nextPair.right]
    nextTarget?.selected(true)
    currentLocationIndex.value = nextIndex
  })

  $emitter.on('moveToSelectedPost', () => {
    const cIndex = currentLocationIndex.value
    const pair = searchLocationPair.value[cIndex]
    //DOWN
    const currentTarget = groups.value.get(pair.left)?.results[pair.right]
    if (currentLocationIndex.value === 0 && ! currentTarget?.isSelected) {
      return
    }

    router.push(currentTarget?.content.path ?? '')
    searchStatus.cancelSearch()
    currentLocationIndex.value = 0
    $emitter.emit('resetSearchBar')
  })

  const element = document.getElementById('application-container')!

  const handleForScroll = (event: Event) => {
    /* 현재 스크롤 위치 */
    // const currentScroll = element.scrollTop
    const currentScroll = window.scrollY
    /* 엘리먼트 높이 */
    // const winHeight = element.clientHeight
    const winHeight = window.innerHeight
    /* 엘리먼트 스크롤 높이 */
    const docHeight = element.scrollHeight

    const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(0)

    const scrollPer = parseFloat(percent)

    if(( ! postCallStore.is_calling) && scrollPer > 80) {
      postCallStore.is_calling = true
      callPostFeed()
    }

    appCache.scrollStatus.on()
    appCache.scrollStatus.loadHeader()
    appCache.scrollStatus.checkScroll()

  }
  window.addEventListener('scroll', handleForScroll)
})


useHead({
  htmlAttrs: {
    lang: 'ko-kr'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' }
  ]
})
</script>

<style lang="scss">
@import './styles';
.app-container {
  display: flex;
  flex-direction: column;
  background-color: $point-light-color;

  .current-content {
    padding-top: $pc-header-height;
  }

  &.dark {
    background-color: $main-dark-color;
  }


  .background {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    transition: height 0s, background-color .6s;

    &.active {
      z-index: 1;
      background: rgb(0 0 0 / 40%);
      height: 100%;

    }

    .search-result-area {
      position: relative;
      top: 90px;
      width: 100%;
      height: 70%;

      .search-result-panel {
        background-color: white;
        max-width: 768px;
        height: 100%;
        margin: 0 auto;
        overflow-y: scroll;
        border-radius: 8px;

      }
    }
  }
}

@include tablet {
  .app-container {

    .background {

      .search-result-area {

        .search-result-panel {
          max-width: 496px;
        }
      }
    }
  }
}

@include mobile {
  .app-container {

    .background {
      display: flex;
      justify-content: center;

      .search-result-area {
        width: 100%;
        top: 60px;
        height: calc(100% - 60px);

        .search-result-panel {
          border-radius: 0px;
        }
      }
    }
  }
}

/* Global Styles */
@font-face {
  font-family: 'AppleSDGothicNeoB';
  src: url('/assets/fonts/Apple_Sandol_Gothic_Neo/AppleSDGothicNeoB.ttf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'AppleSDGothicNeoL';
  src: url('/assets/fonts/Apple_Sandol_Gothic_Neo/AppleSDGothicNeoL.ttf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SFMonoLight';
  src: url('/assets/fonts/sf-mono-cufonfonts/SFMonoLight.otf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono EL';
  src: url('/assets/fonts/JetBrains_Mono/JetBrainsMono-ExtraLight.ttf');
}

@font-face {
  font-family: 'JetBrainsMono it';
  src: url('/assets/fonts/JetBrains_Mono/JetBrainsMono-Italic.ttf');
}

html {


    .dark {
      //::-webkit-scrollbar-track {
      //  --tw-bg-opacity: 1;
      //  background-color: rgb(var(--color-gray-800)/1);
      //  background-color: rgb(var(--color-gray-800)/var(--tw-bg-opacity))
      //}
      //
      //::-webkit-scrollbar-thumb {
      //  --tw-bg-opacity: 1;
      //  background-color: rgb(var(--color-gray-700)/1);
      //  background-color: rgb(var(--color-gray-700)/var(--tw-bg-opacity))
      //}
      //
      //::-webkit-scrollbar-thumb:hover {
      //  --tw-bg-opacity: 1;
      //  background-color: rgb(var(--color-gray-600)/1);
      //  background-color: rgb(var(--color-gray-600)/var(--tw-bg-opacity))
      //}
    }


  //::-webkit-scrollbar {
  //  background-color: transparent;
  //  height: .6em;
  //  width: .6em
  //}
  //
  //::-webkit-scrollbar-track {
  //  --tw-bg-opacity: 1;
  //  background-color: rgb(var(--color-gray-100)/1);
  //  background-color: rgb(var(--color-gray-100)/var(--tw-bg-opacity))
  //}
  //
  //::-webkit-scrollbar-thumb {
  //  --tw-bg-opacity: 1;
  //  background-color: rgb(var(--color-gray-300)/1);
  //  background-color: rgb(var(--color-gray-300)/var(--tw-bg-opacity));
  //  border-radius: .6em
  //}
  //
  //::-webkit-scrollbar-thumb:hover {
  //  --tw-bg-opacity: 1;
  //  background-color: rgb(var(--color-gray-400)/1);
  //  background-color: rgb(var(--color-gray-400)/var(--tw-bg-opacity))
  //}
}


#__nuxt {
  font-family: -apple-system, BlinkMacSystemFont;

  .dark {
    background-color: $point-dark-color;
  }

}

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;

  &:before {
    transition: .6s;
  }

  &:after {
    transition: .6s;
  }
  .only-mobile {
    display: none;
  }
}

:root {
  --medium-zoom-z-index: 100;
  --medium-zoom-bg-color: #ffffff;
  --medium-zoom-opacity: 1;
  --back-to-top-z-index: 5;
  --back-to-top-color: #3eaf7c;
  --back-to-top-color-hover: #71cda3;
  --nprogress-color: #29d;
  --nprogress-z-index: 1031;

  --color-gray-100: 241 245 249;
  --color-gray-200: 226 232 240;
  --color-gray-300: 203 213 225;
  --color-gray-400: 148 163 184;
  --color-gray-500: 100 116 139;
  --color-gray-600: 71 85 105;
  --color-gray-700: 51 65 85;
  --color-gray-800: 30 41 59;
  --color-gray-900: 15 23 42;
  --color-gray-950: 2 4 32;
  transition: all .6s ease-out;
}


a {
  text-decoration: none;
  color: #2c3e50;
  -webkit-tap-highlight-color:transparent;
}

.window-controller {
  display: block;
  border-radius: 15px 15px 0px 0px;

  &:before {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin: 5px 4px;
    background-color: #FF605C;
    border: 1.12px solid #f35854;
  }

 .window-close {
  background-color: #FF605C;
  border: 1.12px solid #f35854;
  }

 .window-minimize {
  background-color: #FFBD44;
  border: 1.12px solid #f6b73b;
  }

   .window-maximize {
    background-color: #00CA4E;
    border: 1.12px solid #02be4a;
  }

}


</style>
