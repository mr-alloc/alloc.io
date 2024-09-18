<template>
  <div id="application-container" class="app-container">
    <MainHeader />
    <main class="min-h-[calc(100vh-var(--header-height))]">
      <NuxtPage class="current-content" id="current-content-element" :page-key="route.fullPath" />
    </main>
    <div class="background" :class="[
        mobileNaviStore.isActive || photoViewStatus.isPhotoView || searchStatus.isSearchMode
        ? ['fixed', 'inset-0', 'transition-opacity', 'bg-gray-200/75', 'dark:bg-gray-800/75'] : []
        ]"
         v-on:click="methods.clickBackground($event)">
      <SearchView v-if="searchStatus.isSearchMode" />
      <PhotoView v-if="photoViewStatus.isPhotoView" v-on:click="$event.stopPropagation()" />
    </div>
    <LoadingBar />
  </div>
</template>
<script lang="ts" setup>
import Runner from '@/service/DefaultStarterService'
import appCache from "@/store/appCache";
import MainHeader from "@/components/layout/header/MainHeader.vue";
import LoadingBar from "@/components/layout/header/LoadingBar.vue";
import PhotoView from "@/components/layout/global/PhotoView.vue";
import {useHead} from "unhead";
import {mobileNaviStore, postCallStore} from "@/store";
import {PostSearchGroup} from "@/class/implement/PostSearchGroup";
import {Pair} from "@/class/implement/Pair";
import {PostSearchResult} from "@/class/implement/PostSearchResult";
import {groupingBy} from "@/utils/settingUtils";
import {callPostFeed} from "@/utils/postUtil";
import {useSearchStatusStore} from "@/store/SearchStatusStore";
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";
import {onMounted} from "vue";
import {useNuxtApp} from "nuxt/app";
import SearchView from "@/components/layout/global/SearchView.vue";

Runner.init();
const route = useRoute();
const router = useRouter();
const { $emitter } = useNuxtApp();
const searchStatus = useSearchStatusStore();
const photoViewStatus = usePhotoViewStatusStore();
const methods = {
  clickBackground: (event: PointerEvent) => {
    if (searchStatus.isSearchMode) {
      mobileNaviStore.isActive = false
      searchStatus.cancelSearch()
    } else if (photoViewStatus.isPhotoView) {
      photoViewStatus.close()
    }
  },
}

onMounted(() => {

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
      callPostFeed();
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
@import '@styles/index';



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



#__nuxt {
  font-family: -apple-system, BlinkMacSystemFont;

  .dark {
    background-color: $point-dark-color;
  }

}

* {
  padding: 0;
  margin: 0;
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


</style>
