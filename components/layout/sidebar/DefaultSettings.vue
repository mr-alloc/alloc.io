<template>
    <div class="default-list-panel">
      <ul class="spread-element-list">
        <li class="setting-element" v-bind:key="idx" v-for="(setting, idx) in data.settings" @click="method.moveInto(setting.type, setting.link_to)" :class="{ clickable: setting.type == 'LINK' }">
          <div class="setting-icon-area" :class="{ active: setting.has_icon }">
            <div class="element-icon-wrapper">
              <span class="element-icon">
                <img class="custom-icon" v-show="setting.icon != ''" :src="`/assets/icon/${setting.icon}.png`" alt="file icon image" />
              </span>
            </div>
          </div>
          <div class="element-content">
            <div class="element-title-area">
              <span class="title-text">{{ setting.title }}</span>
            </div>
            <div class="feature-trailer">
              <SwitchButton v-if="setting.type == 'SWITCH'" :default="setting.switch.default" :switch="setting.switch.change"/>
              <span class="trailer-arrow" v-else>
                <font-awesome-icon :icon="['fas', 'chevron-right']"/>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script lang="ts" setup>
import SwitchButton from "@/components/layout/sidebar/SwitchButton.vue";
import { darkModeStore, mobileNaviStore } from "@/store";
import {useNuxtApp, useRouter} from "#app";

const { $emitter } = useNuxtApp()
const router = useRouter()

const data = {
  settings: [
    {
      icon: '',
      has_icon: false,
      title: 'Home',
      type: 'LINK',
      link_to: '/'
    },
    {
      icon: '',
      has_icon: false,
      title: 'Tags',
      type: 'LINK',
      link_to: '/tags'
    },
    {
      icon: 'moon',
      has_icon: true,
      title: '다크 모드',
      type: 'SWITCH',
      switch: {
        default: darkModeStore.isDarkMode,
        change: () => {
          const behavior: boolean = !darkModeStore.isDarkMode
          const themeColor: HTMLElement = document.querySelector('meta[name="theme-color"]')!
          if(behavior) {
            themeColor.setAttribute('content', '#010409')
            data.settings[2].icon = 'moon'
          } else {
            themeColor.setAttribute('content', '#ededed')
            data.settings[2].icon = 'sun'
          }
          darkModeStore.isDarkMode = behavior
          return behavior
        }
      }
    }
  ],
  darkModeStore
}
const components = {
  SwitchButton
}
const method = {
  moveInto(type: string, link: string) {
    if(type == 'LINK') {
      router.push(link)
      mobileNaviStore.isActive = false
      $emitter.emit('initScroll')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles';

.default-list-panel {
  background-color: $main-light-color;
  border-radius: 7px;

  .spread-element-list {
    color: black;
    font-size: .92rem;
    list-style: none;
    font-family: "AppleSDGothicNeoL";

    .clickable {

      &:active {
        background-color: #cccccc;

      }
    }

    .setting-element {
      display: flex;
      flex-direction: row;
      height: 39px;
      cursor: pointer;


      &:first-child {
        border-radius: 7px 7px 0px 0px;
      }

      &:last-child {
        border-radius: 0px 0px 7px 7px;
      }

      &:not(:last-of-type) {
        .element-content {

          border-bottom: .6px solid #c5c5c5;
        }
      }


      .setting-icon-area {
        margin: auto;
        flex-shrink: 0;
        width: 20px;

        .element-icon {

          &.folder {
            background-color: #7ec9ff;
            color: white;

          }
          .custom-icon {
            font-size: 15px;
            border-radius: 5px;
            text-align: center;
            width: 20px;
            display: block;
            margin: 0px auto;
          }
        }

        &.active {
          width: 50px;

        }
      }

      .element-content {
        flex-grow: 1;
        padding: 5px 0px;
        display: flex;
        flex-direction: row;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        div {

          display: table;
        }
        .element-title-area {
          flex-grow: 1;

          .title-text {
            vertical-align: middle;
            display: table-cell;
          }
        }

        .feature-trailer {
          flex-shrink: 0;
          width: 60px;

          .trailer-arrow {
            display: table-cell;
            vertical-align: middle;
            padding-left: 30px;
          }
        }

      }
    }
  }
}

.dark {

  .default-list-panel {
    background-color: $main-dark-color;

    .spread-element-list {

      .setting-element {

        &:not(:last-of-type) .element-content {
          border-bottom-color: #3b3939;
        }

        .setting-icon-area {

        }

        .element-content {
          color: white;

          .element-title-area {

          }

        }

      }

      .clickable {

        &:active {

          background-color: #545252;
        }
      }
    }
  }
}

@include tablet {
}
</style>
