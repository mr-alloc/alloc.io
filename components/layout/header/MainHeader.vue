<template>
  <div class="header-wrapper">
    <div class="blog-ci-area">
      <nuxt-link to="/">
        <div class="ci-logo-panel">
          <span>{{ blogInfo.title }}</span>
        </div>
      </nuxt-link>
    </div>
    <div class="search-box-wrapper" :class="{ 'search-mode' : searchStatusStore.isSearchMode }">
      <div class="search-box"
           v-on:click="methods.activateSearchMode()"
      >
        <div class="menu-icon-wrapper">
          <span class="menu-icon">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
        </div>
        <div class="menu-title">
          <input type="text" placeholder="찾기"
                 v-on:input="methods.typeForText($event)"
                 v-on:focusout="methods.inactivateSearchMode($event)"
          >
        </div>
      </div>
    </div>
    <div class="top-menu-area">
      <div class="top-level-menu">
        <ul class="top-menu-list">
          <li class="menu-item">
            <nuxt-link to="/tags">
              <div class="menu-icon-wrapper">
                <span class="menu-icon">
                  <font-awesome-icon :icon="['fa', 'tags']"/>
                </span>
              </div>
              <div class="menu-title">
                <span>태그</span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="progress-area" v-if="false" :class="{ hide : mobileNaviStore.isActive }">
      <span class="progress-bar"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {searchInputStore, mobileNaviStore, tabletNaviStore} from "@/store";
import { calPostDate } from "@/utils/settingUtils";
import { useNuxtApp } from "#app";
import {onMounted} from "vue";
import {blogInfo, postContents} from "~/store/site";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
const { $emitter } = useNuxtApp()
const searchStatusStore = useSearchStatusStore()
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

    // const element: HTMLElement = document.querySelector('.app-container .progress-area .progress-bar')!
    // element.style.width = percent

  })

})

const titleRE = /([a-zA-Z가-힣0-9@\w])/
const methods = {

  activateSearchMode: () => {
    searchStatusStore.searching()
  },
  inactivateSearchMode: (e: FocusEvent) => {
    const input = e.target as HTMLInputElement
    input.value = ''
    searchStatusStore.cancelSearch()
  },
  typeForText: (e: InputEvent) => {
    const text = e.data ?? ''
    if (titleRE.test(text)) {
      const RE = new RegExp(`.+?(${text}).+`)
      postContents.forEach(content => {
        const title = content.header.title
        if (RE.test(text)) {
          console.log(title)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles";
.header-wrapper {
  flex-shrink: 0;
  height: $pc-header-height;
  width: 90%;
  border-bottom: 1px solid $linear-color;
  box-shadow: 0 3px 12px 2px rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 10;
  margin-top: 10px;
  background-color: $main-light-color;
  left: 50%;
  top: 40px;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 15px;
  display: flex;


  * {
    -webkit-tap-highlight-color:transparent;
    user-select: none;

  }
  &.fold {
    margin-top: -50px;
  }

  .blog-ci-area {
    margin: 0 20px;
    display: table;
    height: 100%;
    flex-shrink: 0;
    width: 180px;
    text-align: center;


    .ci-logo-panel {
      position: absolute;
      top: $pc-header-interval + 10;
      display: table-cell;
      font-weight: bold;
      font-size: 1.19rem;
      color: black;
      vertical-align: middle;
    }
  }
  .search-box-wrapper {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 300px;

    .search-box {
      display: flex;
      background-color: $linear-color;
      color: black;
      border-radius: 10px;
      border: 1.42px solid $linear-color;
      cursor: pointer;
      transition: .4s;
      width: 90px;
      vertical-align: middle;
      justify-content: center;
      padding: 0 5px;
      height: 30px;
      align-items: center;
      flex-direction: row;

      .menu-icon-wrapper {
        display: flex;
        flex-shrink: 0;
        width: 30px;
        justify-content: center;

        .menu-icon {
          color: #757575;
          display: block;
          margin: 0 auto
        }
      }

      .menu-title {
        flex-grow: 1;


        input {
          outline: none;
          border: none;
          line-height: 2;
          width: 95%;
          background-color: transparent;
        }
      }

      &:hover {
        transition: .4s;
      }
    }

    &.search-mode {

      .search-box {
        width: 280px;
      }
    }
  }

  .top-menu-area {
    flex-grow: 1;
    display: flex;
    align-items: center;
    width: 100%;

    .top-level-menu {
      width: 100%;

      .top-menu-list {
        list-style: none;
        display: flex;
        justify-content: space-evenly;

        .menu-item {
          min-width: 50px;
          display: inline-block;

          .menu-icon-wrapper {
            padding: 0 5px;
            display: inline-block;
            font-size: 1.2rem;

            .menu-icon {

            }
          }

          .menu-title {
            padding: 0 5px;
            display: inline-block;
          }
        }
      }
    }

  }

  .progress-area {
    position: fixed;
    top: $pc-header-height;
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
