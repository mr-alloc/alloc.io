<template>
  <div class="main-content-view" id="main-content-wrapper">
    <nuxt-page class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || searchStatus.isSearchMode }"
         v-on:click="() => {
           data.mobileNaviStore.isActive = false
           searchStatus.cancelSearch()
         }"
    >
      <div v-if="searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel">
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

onMounted(() => {
  //검색 결과
  $emitter.on('searchText', (result: PostSearchResult[]) => {
    const map: Map<string, PostSearchResult[]> = groupingBy<string, PostSearchResult>(result, (result)=> {
      const node = fileNodeMap.store.get(result.content.path)
      return node.group
    })

    const entryArray = [...map.entries()]
    console.log('received:', entryArray)
    entryArray.forEach(([k, v]) => {
      if (groups.value.has(k)) {
        groups.value.get(k)?.update(v)
        return
      }
      groups.value.set(k, new PostSearchGroup(k, v))
    })
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
