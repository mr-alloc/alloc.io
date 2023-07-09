<template>
  <div class="post-resource-navigator" :class="[{ active: mobileNaviStore.isActive }, { hide: tabletNaviStore.isActive}]">
    <div id="element-wrapper" class="navigate-element-wrapper" :class="{ fixed : explorerHeaderStore.isActive }">
      <NavigateMarker />
      <client-only>
        <div class="explored-control-panel" id="explored-panel">
          <PackageExplorer v-bind:key="idx" v-for="(parent, idx) in naviStack" :index="idx" :parent="parent" />
        </div>
      </client-only>
    </div>
    <div class="system-setting-wrapper" v-if="false">
      <div class="profile-element-wrapper">
        <div class="profile-image-area">
          <div class="round-image-frame">
            <img src="/assets/blogging/profile/default.jpeg" alt="프로필 이미지"/>
          </div>
        </div>
        <div class="profile-info-area">
          <div class="author-text-area">
            <div class="profile-author-name">
              <span>{{ blogInfo.fullname }}</span>
            </div>
            <span class="intro">누군지 궁금하세요?</span>
          </div>
        </div>
        <div class="feature-trailer">
          <span class="trailer-arrow">
            <font-awesome-icon :icon="['fas', 'chevron-right']"/>
          </span>
        </div>
        <div class="tooltip-bubble">
          <div class="tooltip-content"><span>준비중 입니다.</span></div>
          <div class="arrow"></div>
        </div>
      </div>
      <DefaultSettings />
    </div>
    <div class="non-clickable-area" :class="{ active: menuClickableStore.isNotClickable }"></div>
  </div>
</template>

<script lang="ts" setup>
import {explorerHeaderStore, menuClickableStore, mobileNaviStore, tabletNaviStore} from "@/store";
import PackageExplorer from "@/components/layout/sidebar/PackageExplorer.vue";
import NavigateMarker from "@/components/layout/sidebar/NavigateMarker.vue";
import DefaultSettings from "@/components/layout/sidebar/DefaultSettings.vue";
import {naviStack} from "@/store/site";
import {useNuxtApp} from "#app";
import {onMounted} from "vue";
import { blogInfo } from "@/store/site";

const { $emitter } = useNuxtApp()


onMounted(() => {
  $emitter.on('explore',(status: boolean) => {
    if(status) {
      menuClickableStore.isNotClickable = status
    } else {
      setTimeout(() => {

        menuClickableStore.isNotClickable = status
      }, 700)
    }
    const panel = document.getElementById('element-wrapper')
    panel?.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0
    })
  })

  const titleElement = document.getElementById('navigator-title-ele')
  const elementWrapper = document.getElementById('element-wrapper')

  /* 엘리먼트 높이 */
  // const winHeight = elementWrapper.clientHeight
  /* 엘리먼트 스크롤 높이 */
  // const docHeight = elementWrapper.scrollHeight

  // const percent = ((docHeight - winHeight) / 100)
  // const barHeight = elementWrapper.scrollHeight * percent
  // const customScrollBar = document.getElementById('scroll-bar')
  //
  // customScrollBar.style.height = `${barHeight}px`
  // customScrollBar.style.transition = '0s'

  elementWrapper?.addEventListener('scroll', () => {
    let scroll = elementWrapper.scrollTop
    // customScrollBar.style.top = `${62 + scroll}px`

    if(( ! explorerHeaderStore.isActive) && scroll >= 45) {
      explorerHeaderStore.isActive = true
      setTimeout(() => {
        titleElement?.classList.add('appear')
        titleElement?.children.item(1)?.classList.remove('disappear')

      }, 600)

    } else if(explorerHeaderStore.isActive && scroll < 45) {
      titleElement?.children.item(1)?.classList.add('disappear')

      setTimeout(() => {
        titleElement?.classList.remove('appear')
        explorerHeaderStore.isActive = false

      }, 600)
    }

  })
})
</script>

<style lang="scss">
@import '@/styles';

.post-resource-navigator {
  width : $pc-navigator-width;
  background-color: $point-light-color;
  border-right: 1px solid #d3d1d1;
  display: flex;
  flex-direction: column;

  * {
    transition: .4s;
    -webkit-tap-highlight-color:transparent;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    &:before {
      transition: .4s;
    }
    &:after {
      transition: .4s;
    }

  }

  .navigate-element-wrapper {
    //height: 350px;
    height: 100%;
    overflow-y: scroll;
    flex-shrink: 0;

    .explored-control-panel {
      width: 300px;
      position: relative;
      height: 100%;
    }

    #scroll-bar {
      position: absolute;
      margin-left: $pc-navigator-width;
      top: calc($pc-header-interval + 2px);
      left: -10px;
      width: 7px;
      background-color: $scroll-light-color;
      border-radius: 15px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }


  .system-setting-wrapper {
    flex-grow: 1;
    background-color: #ededed;
    padding: 20px;
    border-top: 1px solid #d3d1d1;
    width: ($pc-navigator-width - ($pc-navigator-padding * 2));
    display: flex;
    flex-direction: column;

    > div {
      margin-bottom: 20px;
    }

    .profile-element-wrapper {
      padding: 5px 0 5px 15px ;
      border-radius: 7px;
      background-color: $main-light-color;
      display: flex;
      cursor: pointer;

      &:active {
        background-color: #cccccc;

        .tooltip-bubble {
          opacity: 1;
        }
      }


      .profile-image-area {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        flex-shrink: 0;

        .round-image-frame {
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .profile-info-area {
        flex-grow: 1;
        padding: 3px 15px;
        display: table;

        .author-text-area {
          display: table-cell;
          vertical-align: middle;
          line-height: .9;

          .profile-author-name {
            font-size: 1.21rem;

          }
          .intro {
            font-size: .62rem;
          }
        }
      }

      .feature-trailer {
        display: table;
        flex-shrink: 0;
        width: 60px;

        .trailer-arrow {
          display: table-cell;
          padding-left: 30px;
          vertical-align: middle;
        }
      }

      .tooltip-bubble {
        opacity: 0;
        transition: .0s;
        position: absolute;
        height: 0px;
        margin: 0 auto;
        font-size: .82rem;
        width: 150px;
        left: 100px;

        .tooltip-content {
          width: 60%;
          margin: 0 auto;
          background-color: black;
          color: white;
          padding: 4px 3px;
          border-radius: 15px;
          text-align: center;

        }

        .arrow {
          height: 0px;

          &:before {
            content: "";
            border-style: solid;
            border-color: transparent;
            position: relative;
            top: 5px;
            border-width: 0.4rem 0.4rem 0;
            border-top-color:black;
            left: 65px;
          }
        }
      }
    }
  }

  .non-clickable-area {
    position: absolute;
    z-index: 112;
    left: 0;
    top: 44px;
    width: $pc-navigator-width;
    background-color: transparent;
    display: block;

    &.active {
      height: 100%;

    }
  }


}

.dark {
  .post-resource-navigator {
    color: $dark-font-color;
    border-right: 1px solid $linear-dark-color;
    background-color: $point-dark-color;


    .system-setting-wrapper {
      background-color: $point-dark-color;
      border-top: 1px solid $linear-dark-color;

      .profile-element-wrapper {
        background-color: $main-dark-color;

        .profile-info-area {
          color: white;
        }

        .feature-trailer {
          .trailer-arrow {

            color: white;
          }
        }
      }
    }

  }

}

@include tablet {

  .post-resource-navigator {
    position: relative;

    &.hide {
      margin-left: -$tablet-navigator-width;
    }

    .navigate-element-wrapper {

    }
    .non-clickable-area {
      width: $tablet-navigator-width;

    }

    .system-setting-wrapper {
      padding: $tablet-navigator-padding;
      width: calc($tablet-navigator-width - ($tablet-navigator-padding * 2));

    }
  }

}

@include mobile {

  .post-resource-navigator {
    position: fixed;
    overflow-x: hidden;
    width: 80%;
    height: 100%;
    top: 0px;
    left: -105%;
    z-index: 999;
    border-top: none;

    border-left: 0px !important;

    &.active {
      left:0px;
    }

    .non-clickable-area {
      width: $mobile-navigator-width;

    }

    .system-setting-wrapper {
      width: auto;

    }

    .navigate-element-wrapper {

      .explored-control-panel {
        width: 100%;
      }
    }

  }

}
</style>
