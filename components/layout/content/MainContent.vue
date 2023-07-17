<template>
  <div class="main-content-view" id="main-content-wrapper">
    <nuxt-page class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || searchStatus.isSearchMode }" v-on:click="data.mobileNaviStore.isActive = false">
      <div v-if="searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel">
          <SearchResult />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainFooter from "@/components/layout/content/MainFooter.vue";
import { mobileNaviStore } from "@/store";
import { useRoute } from "#app";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
import {onMounted} from "vue";
import {PostContent} from "~/class/implement/PostContent";
import {PostContentGroup} from "~/class/implement/PostContentGroup";

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

onMounted(() => {
  //검색 결과
  $emitter.on('searchText', (result: PostContentGroup[]) => {
    //SettingUtils.groupingBy() 사용
    // const entryArray = [...map.entries()]
    // return entryArray.map(([k, v]) => new PostContentGroup(k, v))
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
        padding-top: 3px;
        overflow-y: scroll;

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
