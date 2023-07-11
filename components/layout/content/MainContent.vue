<template>
  <div class="main-content-view" id="main-content-wrapper">
    <nuxt-page class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || !searchStatus.isSearchMode }" v-on:click="data.mobileNaviStore.isActive = false">
      <div v-if="!searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel">
          <div class="search-result-row">
            <div class="category-icon-area">
              <span class="category-icon">
                <img src="@/assets/icon/algorithm.png"/>
              </span>
            </div>
            <div class="detected-content-area">
              <div class="result-string">
                <span>검색을 좋아하는 나는 <strong>육포</strong>를 좋아한다.</span>
              </div>
              <div class="result-breadcrumb">
                <span>
                  검색
                <font-awesome-icon :icon="['fas', 'chevron-right']"/>
                  2022년 07월 21일 일기
                </span>
              </div>
            </div>
          </div>
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
const route = useRoute()
const searchStatus = useSearchStatusStore()
const components = {
  MainFooter
}

const data = {
  mobileNaviStore,
  route
}

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

        .search-result-row {
          display: flex;
          flex-direction: row;

          .category-icon-area {
            flex-shrink: 0;
            width: 40px;
            justify-content: center;
            align-items: center;

            .category-icon {
              display: inline-block;

              img {
                width: $small-icon-size;
              }
            }
          }
        }

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
