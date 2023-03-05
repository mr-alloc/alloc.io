<template>
  <div class="header-wrapper">
    <div class="mobile-controller" :class="{ active: mobileNaviStore.isActive }">
      <div class="control-panel">
        <span class="control-button" v-on:click="mobileNaviStore.isActive = !mobileNaviStore.isActive">
<!--          <font-awesome-icon class="button-text" :icon="['fas', 'plus']"/>-->
        </span>
      </div>
    </div>
    <div class="progress-area" :class="{ hide : mobileNaviStore.isActive }">
      <span class="progress-bar"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userInfoStore, searchInputStore, fileListStore, mobileNaviStore } from "@/store";
import { calPostDate } from "@/utils/settingUtils";
import { useNuxtApp } from "#app";
import {FileData} from "~/class/implement/FileData";
import {onMounted} from "vue";
const { $emitter } = useNuxtApp()

const data = {

    calPostDate,
    is_hide: false,
    me: {
      profile_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/images/profile.png?raw=true'
    },
    userInfoStore,
    searchInputStore,
    mobileNaviStore,
    search_input: '',
    headers: {
      search_box: {
        is_focus: false
      },
      mobile: {
        vue_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/logo.png?raw=true',
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

  * {
    -webkit-tap-highlight-color:transparent;
    user-select: none;

  }

  .mobile-header {
    display: none;
  }



  .mobile-controller {
    display: none;
    .control-panel {

      .control-button {

      }
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


    .main-header {
      margin: 0 auto;
      box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

      .menu-info {

      }

      & .header-item-layer {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;

        & .author-profile {
          display: grid;

          & .profile-image {
            width: 150px;
            height: 150px;
            margin: 7px auto;
          }

          & .author-info {
            display: inline-block;
            padding: 7px 20%;
            text-align: center;

            & .author {
              margin: 3px auto;
              font-size: 1.45rem;
            }

            & .author-says {
              font-size: 0.92rem;
            }
          }
        }
      }
    }
  }
}
@include mobile {

  .header-wrapper {
    height: 0px;
    background-color: transparent;

    .mobile-controller {
      display: flex;
      z-index: 1000;
      position: fixed;
      bottom: 20px;
      width: 100%;
      flex-direction: row-reverse;

      .control-panel {
        height: 60px;
        width: 60px;
        background-color: #ae70ce;
        margin-right: 20px;
        border-radius: 40px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        display: table;

        .control-button {
          display: table-cell;
          vertical-align: middle;
          text-align: center;

          .button-text {
            font-size: 2.32rem;
            color: white;
          }
        }
      }



      &.active {
        .control-panel {
          background-color: #86569d;
        }

        .control-button {
          transform: rotate(135deg);
        }
      }
    }

    .mobile-header {
      z-index: 99;
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: rgba(255,255,255,0.89);
      border-bottom: $point-light-color 1px solid;
      width: 100%;
      height: 50px;
      font-size: 1.7rem;

      & .burger {
        padding: 2px 20px;
        margin: 2px auto;

        & img {
          width: 40px;
          position: absolute;
          top: 5px;
          left: 45%;
        }

        & svg {
          -webkit-tap-highlight-color:transparent;
          float: right;
          margin-top: 5px;

        }

      }

      & .background {
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        transition: height 0s, background-color .6s;

      }

      & .mobile-navigator-wrapper {
        position: fixed;
        top: 0;
        left: -1999px;
        height: 100%;
        width: 77%;
        transition: 2s;


        & .nav-panel-box {
          display: flex;
          width: 100%;
          height: 100%;
          padding: 20px 10px;
          flex-direction: column;
          background-color: $main-light-color;

          & .nav-items {
            padding: 20px 40px;

            ul {
              list-style: none;

              li {
                height: 40px;
              }
            }
          }

          & .search-items {

            width: 100%;

            & .search-box {
              margin: 4px auto;
              height: 40px;
              border-radius: 15px;
              border: 3.34px lightgray solid;
              overflow: hidden;

              & input {
                line-height: 32px;
                border: 0px;
                width: 100%;
                height: 100%;
                padding: 3px 5px;;
                background-color: $main-light-color;
                font-size: .92rem;

                &:focus {
                  outline: none;
                }
              }

              &.focus {
                border-color: #2c3e50;
              }
            }

          }

          & .search-result {

            .search-card {

              .card-date {
                font-size: .72rem;
              }
              .card-title {
                font-size: 1.12rem;
              }
            }
          }
        }
      }

      &.active {

        .mobile-navigator-wrapper {
          left: 0;
          z-index: 2;
          transition: .6s;
        }
      }
    }

    .main-header {
      display: none;
      width: 90%;
      height: 400px;
      margin-top: 80px;


    }

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
