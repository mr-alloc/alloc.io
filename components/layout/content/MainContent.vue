<template>
  <div class="main-content-view" id="main-content-wrapper">
    <nuxt-page class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || searchStatus.isSearchMode }"
         v-on:click="methods.clickBackground($event)"
    >
      <div v-if="searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel" v-on:click="$event.stopPropagation()">
          <SearchResult v-for="group in groups.values()" :key="group" :row="group" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainFooter from "@/components/layout/content/MainFooter.vue";
import {mobileNaviStore} from "@/store";
import {useRoute} from "#app";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
import {onMounted} from "vue";
import {PostSearchGroup} from "~/class/implement/PostSearchGroup";
import {groupingBy} from "~/utils/settingUtils";
import SearchResult from "@/components/layout/header/SearchResult.vue"
import {fileNodeMap} from "~/store/site";
import {PostSearchResult} from "~/class/implement/PostSearchResult";
import {Pair} from "~/class/implement/Pair";
import {useRouter} from "vue-router";

const route = useRoute()
const { $emitter }= useNuxtApp()
const searchStatus = useSearchStatusStore()
const router = useRouter()

const components = {
  MainFooter
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
    data.mobileNaviStore.isActive = false
    searchStatus.cancelSearch()
  }
}
onMounted(() => {
  //검색 결과
  $emitter.on('searchText', (result: PostSearchResult[]) => {
    const map: Map<string, PostSearchResult[]> = groupingBy<string, PostSearchResult>(result, (result)=> {
      const node = fileNodeMap.store.get(result.content.path)
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
    const pairs = array.map(val => val.results.map((res, idx) => new Pair<string, number>(val.icon, idx))).flat()
    searchLocationPair.value = pairs
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
})
</script>

<style lang="scss">
@import "@/styles";

.dark .main-content-view {

  border-top-color: $linear-dark-color;
}
.main-content-view {
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;


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

  .fade-out {
    padding-left: 90px;
    opacity: 0.34;
  }

  .current-content {
    min-height: 100vh;
  }
}

@include tablet {
  .main-content-view {

    .background {

      .search-result-area {

        .search-result-panel {
          max-width: 496px;
        }
      }
    }
  }
}

@include  mobile {

  .main-content-view {
    border-top: none;
    height: 100%;

    .main-body {
      margin: 0;
    }

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
</style>
