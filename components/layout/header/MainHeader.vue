<template>
  <div class="header-wrapper" :class="{ 'search-mode' : searchStatusStore.isSearchMode }">
      <div class="header-center">
      <div class="blog-ci-area" @click="router.push('/')">
        <img src="@/assets/dev_is_record.png" style="height: 100%; cursor: pointer" />
      </div>
      <div class="search-box-wrapper">
        <div class="search-box" v-on:click="methods.activateSearchMode()">
          <div class="menu-icon-wrapper">
          <span class="menu-icon">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
          </div>
          <div class="menu-title">
            <input type="text" placeholder="찾기" id="search-bar"
                   v-on:input="methods.typeForText()"
                   v-on:keyup="methods.sendKeyboardEvent($event)"
            >
          </div>
        </div>
        <div class="cancel-search">
          <button type="button" class="cancel-button" v-on:click="methods.inactivateSearchMode()">Cancel</button>
        </div>
      </div>
      <div class="top-menu-area">
        <div class="top-level-menu">
          <ul class="top-menu-list">
            <li class="menu-item">
              <a href="/tags">
                <div class="menu-icon-wrapper">
                <span class="menu-icon">
                  <font-awesome-icon :icon="['fa', 'tags']"/>
                </span>
                </div>
                <div class="menu-title">
                  <span>태그</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="progress-area" v-if="false" :class="{ hide : mobileNaviStore.isActive }">
        <span class="progress-bar"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {searchInputStore, mobileNaviStore, postCallStore} from "@/store";
import { calPostDate } from "@/utils/settingUtils";
import {useNuxtApp, useRouter} from "#app";
import {onMounted} from "vue";
import {blogInfo, contentsForSearch} from "~/store/site";
import {useSearchStatusStore} from "~/store/SearchStatusStore";
import {PostSearchResult} from "~/class/implement/PostSearchResult";
import {Key} from "~/class/implement/Key";
import {callPostFeed} from "~/utils/postUtil";
import {useRoute} from "vue-router";

const route = useRoute()
const router = useRouter()
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
  $emitter.on('initScroll', () => {
    console.log('initScroll')
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  })

  $emitter.on('resetSearchBar', () => {
    methods.inactivateSearchMode()
  })

})

const titleRE = /([a-zA-Z가-힣0-9@\W\-\_])/
const methods = {

  activateSearchMode: () => {
    searchStatusStore.searching()
    const input = document.getElementById('search-bar') as HTMLInputElement
    input.focus()
  },
  inactivateSearchMode: () => {
    const input = document.getElementById('search-bar') as HTMLInputElement
    input.value = ''
    input.blur()
    searchStatusStore.cancelSearch()

  },
  typeForText: () => {
    const inputElement = document.getElementById('search-bar') as HTMLInputElement
    const text = inputElement.value ?? ''

    methods.searchText(text)
  },
  sendKeyboardEvent: (e: KeyboardEvent) => {
    if (e.code == Key.ESC) {
      methods.inactivateSearchMode()
    }
    else if (e.code == Key.ENTER) {
      $emitter.emit('moveToSelectedPost')
      return
    }

    else if(e.code == Key.ARROW_DOWN || e.code == Key.ARROW_UP) {
      const select = e.code == Key.ARROW_DOWN ? 0 : 1
      $emitter.emit('selectResult', select)
    }
  },
  searchText: (text: string) => {
    if (text === '') {
      $emitter.emit('searchText', [])
    }

    if (titleRE.test(text)) {
      const RE = new RegExp(`(.+)?(${text})(.+)?`, 'i')
      const result: PostSearchResult [] = contentsForSearch
          .filter(content => {
            const title = content.header.title;
            const isMatch = RE.test(title)
            return isMatch
          })
          .map(content => new PostSearchResult(content))
      // console.debug(`-----검색어: "${text}"-----------`)
      $emitter.emit('searchText', result)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles";
  .header-wrapper {
    flex-shrink: 0;
    height: $pc-header-height;
    background-color: $main-light-color;
    display: flex;
    width: 100%;

    &.search-mode {
      position: fixed;
      z-index: 100;

      .header-center {

        .search-box-wrapper {

          .search-box {
            flex-shrink: 0;
            width: 190px;
          }

          .cancel-search {
            width: 40px;
            margin: 0 5px;
            opacity: 1;

            .cancel-button {
              cursor: pointer;
            }
          }
        }
      }
    }

    .header-center {
      display: flex;
      max-width: 1024px;
      margin:0 auto;

      * {
        -webkit-tap-highlight-color:transparent;
        user-select: none;

      }

      &.fold {
        margin-top: -50px;
      }

      .blog-ci-area {
        margin: 0 20px;
        height: 100%;
        flex-shrink: 0;
        width: 100px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        .blog-logo-wrapper {
          width: 50px;
          height: 50px;
          background: url("/assets/logo.svg");
          display: inline-block;
          cursor: pointer;
          transition: .6s;

          &:hover {
            transform: translate(20px,-5px)rotate(45deg);
          }
        }
      }

      .search-box-wrapper {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        width: 300px;


        .cancel-search {
          width: 0px;
          opacity: 0;
          transition: .6s;

          .cancel-button {
            cursor: default;
            outline: none;
            border: none;
            background: transparent;
            color: #0a66c2;
          }
        }

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

        .cancel-search {
        }


      }

      .top-menu-area {
        flex-grow: 1;
        display: flex;
        align-items: center;
        width: 200px;

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
}

@include tablet {
  .header-wrapper {
  }
}
@include mobile {

  .header-wrapper {
    transition: .4s;

    &.search-mode {
      width: 100%;
      top: 0;
      border-radius: 0px;
      margin: 0px;

      .header-center {
        .search-box-wrapper {

          .search-box {
            width: calc(90% - 40px);
          }
          .cancel-search {
            transform: unset;
          }
        }
      }
    }

    .header-center {
      width: 100%;

      .blog-ci-area {
        display: flex;
        align-items: center;
        justify-content: left;
        width: 50px;
        flex-shrink: 0;

        .ci-logo-panel {
          position: inherit;
          top: 0px;
          width: 50px;
          height: 50px;

          .only-mobile {
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .search-box-wrapper {
        flex-grow: 1;
        width: unset;

        .search-box {
          width: 90%;
        }
        .cancel-search {
          transform: translateY(10px);
        }
      }

      .top-menu-area {
        display: none;
      }

      .progress-area {
        top: 0px;

        &.hide {
          display: none;
        }
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
