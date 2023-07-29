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
import { useRoute } from "#app";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
import {onMounted} from "vue";
import {PostSearchGroup} from "~/class/implement/PostSearchGroup";
import {groupingBy} from "~/utils/settingUtils";
import SearchResult from "@/components/layout/header/SearchResult.vue"
import {fileNodeMap} from "~/store/site";
import {PostSearchResult} from "~/class/implement/PostSearchResult";

const route = useRoute()
const { $emitter }= useNuxtApp()
const searchStatus = useSearchStatusStore()

const components = {
  MainFooter
}

const data = {
  mobileNaviStore,
  route
}

const groups = ref(new Map<string, PostSearchGroup>())

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

    const entryArray = [...map.entries()]
    //그룹 데이터 (k: 그룹명, v: 포스트 리스트)
    entryArray.forEach(([k, v]) => {
      if (groups.value.has(k)) {
        const oldResult = groups.value.get(k);
        oldResult?.update(v)
        if (oldResult?.results.length == 0) {
          console.log(`${k}: 모두 제거됨`)
          groups.value.delete(k)
        }
        return
      }
      groups.value.set(k, new PostSearchGroup(k, v))
    })

    const keys = [...groups.value.keys()]
    // clonedArray: Map<string, PostSearchGroup> = 기존 검색 결과
    // map: Map<string, PostSearchResult[]> = 신규 검색 결과
    keys.forEach(key => {
      // 기존 검색결과 와 같은 그룹이라면 업데이트
      if (map.has(key)) {
        const newResult = map.get(key) ?? [];
        const oldResult = groups.value.get(key);
        oldResult?.update(newResult)
        console.log('oldResult:', oldResult)

        if (oldResult?.results.length == 0) {
          console.log(`${key}: 모두 제거됨`)
          groups.value.delete(key)
        }
      }
    })


    const array = [...groups.value.values()]
    const status = array.map(group => `\n(${group.results.length}) ${group.icon}\n${group.results.map((re, i) => `\t${++i}. ${re.content.header.title}`).join('\n')}`).join('\n')
    console.debug(status)
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
      top: 100px;
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

}

@include  mobile {

  .main-content-view {
    border-top: none;
    height: 100%;

    .main-body {
      margin: 0;
    }
  }
}
</style>
