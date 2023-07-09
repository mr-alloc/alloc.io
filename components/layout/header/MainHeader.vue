<template>
  <div class="header-wrapper">
    <div class="blog-ci-area">
      <nuxt-link to="/">
        <div class="ci-logo-panel">
          <span>{{ blogInfo.title }}</span>
        </div>
      </nuxt-link>
    </div>
    <div class="progress-area" :class="{ hide : mobileNaviStore.isActive }">
      <span class="progress-bar"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {searchInputStore, mobileNaviStore, tabletNaviStore} from "@/store";
import { calPostDate } from "@/utils/settingUtils";
import { useNuxtApp } from "#app";
import {onMounted} from "vue";
import {blogInfo} from "~/store/site";
const { $emitter } = useNuxtApp()

const data = {
    blogInfo,
    calPostDate,
    is_hide: false,
    searchInputStore,
    mobileNaviStore,
    search_input: '',
    headers: {
      search_box: {
        is_focus: false
      },
      mobile: {
        is_navi_active: mobileNaviStore.isActive
      },
      menus: [
        {key: '0', item_name: 'Home', link_to: '/'},
        {key: '1', item_name: 'Categories', link_to: '/categories'},
        {key: '2', item_name: 'Tags', link_to: '/tags'},
        {key: '3', item_name: 'About', link_to: '/about'}
      ]
    }
}
onMounted(() => {

  const body = document.getElementById('main-content-wrapper')!
  $emitter.on('initScroll', () => {
    if (body.scrollTop) {
      body.scrollTop = 0
    }
  })

  body.addEventListener('scroll', () => {
    const currentScroll = body.scrollTop
    const winHeight = body.clientHeight
    const docHeight = body.scrollHeight
    const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(4) + '%'

    const element: HTMLElement = document.querySelector('.app-container .progress-area .progress-bar')!
    element.style.width = percent

  })

})
const methods = {


  // searchContents: (word: string) => {
  //   const result_list: FileData [] = fileListStore.file_list.filter(e => {
  //     const regex = new RegExp('(?:(.)?('+ word +')+(.)?)', 'gi')
  //     return regex.test(e.file_title)
  //   })
  //
  //   data.searchInputStore.result_list = result_list
  // }
}
</script>

<style lang="scss">
@import "@/styles";
.header-wrapper {
  flex-shrink: 0;
  height: $pc-header-interval;
  border-bottom: 1px solid $linear-color;
  box-shadow: 0 3px 12px 2px rgba(0, 0, 0, 0.6);
  z-index: 1;

  * {
    -webkit-tap-highlight-color:transparent;
    user-select: none;

  }

  .blog-ci-area {
    margin: 0 20px;
    display: table;
    height: 100%;

    .ci-logo-panel {
      position: absolute;
      top: 10px;
      display: table-cell;
      font-weight: bold;
      font-size: 1.79rem;
      color: black;
      vertical-align: middle;
    }
  }

  .progress-area {
    position: fixed;
    top: $pc-header-interval;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 1;

    .progress-bar {
      display: block;
      background-color: #0AC291FF;
      width: 0%;
      height: 100%;
      transition: none;
      border-radius: 15px;
    }
  }

  .main-header {
    width: 100%;
    margin: 0 auto;
    background-color: #0a66c2;
    display: grid;
    position: fixed;
    top: 0;
    //box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

    .menu-info {
      display: flex;
      flex-direction: column;

      .menu-item {
        width: 100%;
        padding: 4px 0;

        .spread-items {
          list-style: none;
          display: flex;
          justify-content: space-between;
          width: 60%;
          margin: 0 auto;

          li {
            display: inline-block;
            color: #717171;
            font-size: 1.14rem;
            cursor: pointer;
            text-align: center;

            a {
              color:white;
              vertical-align: middle;
            }

            & .search-layer {
              flex: 1;

              & .search-box {
                width: 120px;
                height: 100%;
                padding: 2px;
                border-radius: 15px;
                justify-content: center;
                background-color: #fcfcfc;
                overflow: hidden;

                & input {
                  border: 0px;
                  width: 100%;
                  padding: 3px 5px;
                  margin: 3px 0;
                  background-color: #fcfcfc;
                  font-size: 0.92em;

                  &:focus {
                    outline: none;
                    background-color: white;
                  }
                }

                &.focus {
                  border-color: #2c3e50;
                  background-color: white;
                  width: 250px;
                }
              }
            }
          }
        }
      }
    }

    & .search-list-area {
      width: 100%;
      top: 44px;
      position: fixed;

      .search-list {
      }

      &.focus {
        height: 100%;
        background: rgb(0 0 0 / 40%);
        backdrop-filter: blur(5px);
      }
    }
  }
}

@include tablet {

  .header-wrapper {

  }
}
@include mobile {

  .header-wrapper {
    height: 0px;
    background-color: transparent;
    border-bottom: none;


    .progress-area {
      top: 0px;

      &.hide {
        display: none;
      }
    }

  }
}
.dark .header-wrapper {
  border-bottom: 1px solid $linear-dark-color;

  .mobile-header {
    background-color: rgba(103, 102, 102, 0.89);
  }
}
</style>
