<template>
  <div class="main-content-view" id="main-content-wrapper">
    <nuxt-page class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive || !searchStatus.isSearchMode }" v-on:click="data.mobileNaviStore.isActive = false">
      <div v-if="!searchStatus.isSearchMode" class="search-result-area">
        <div class="search-result-panel">
          <div class="search-result-row" v-for="b in [1, 2, 3, 4, 5, 6]">
            <div class="category-icon-area">
              <span class="category-icon">
                <img src="@/assets/icon/algorithm.png"/>
              </span>
            </div>
            <div class="detected-content-area">
              <ul class="detected-list">
                <li v-for="a in [1, 2, 3]" class="each-detected-content">
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
                </li>
              </ul>
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
        padding-top: 3px;
        overflow-y: scroll;

        .search-result-row {
          margin-top: 3px;
          display: flex;
          flex-direction: row;

          .category-icon-area {
            display: flex;
            flex-shrink: 0;
            width: 55px;
            justify-content: center;
            padding-top: 7px;

            .category-icon {
              display: inline-block;
              height: 25px;
              border: 0.88px $linear-color solid;
              border-radius: 3px;

              img {
                width: $small-icon-size;
              }
            }
          }

          .detected-content-area {
            flex-grow: 1;
            width: 100%;
            padding: 8px 5px;
            border-bottom: 1px $linear-color solid;

            .detected-list {
              list-style: none;

              .each-detected-content {
                .result-string {
                  color: black
                }
                .result-breadcrumb {
                  font-size: 0.71rem;
                  color: #818080;
                }
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
