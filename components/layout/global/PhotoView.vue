<template>
  <div class="photo-view-area" :class="{ 'full-screen': photoViewStore.isFullScreen }">
    <div class="photo-view-panel" :class="photoViewStore.zoom !== 1 && `x${photoViewStore.zoom}`">
      <!-- 이전 버튼 -->
      <button class="before-button" type="button" v-if="photoViewStore.hasBefore()"
              v-on:click="photoViewStore.beforeImage()">
        <svg class="svg-inline--fa fa-chevron-left" style="" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
             data-v-eb64f7a0="">
          <path class="" style="" fill="currentColor"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
        </svg>
      </button>
      <!-- 이미지 -->
      <img id="current-image" :src="photoViewStore.current().src" :alt="photoViewStore.current().alt"/>
      <!-- 자막 -->
      <span class="image-description">{{ photoViewStore.current().alt }}</span>
      <!-- 다음 버튼 -->
      <button class="next-button" type="button" v-if="photoViewStore.hasNext()" v-on:click="photoViewStore.nextImage()">
        <svg class="svg-inline--fa fa-chevron-right" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path class="" fill="currentColor"
                d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
        </svg>
      </button>
      <div class="image-toolbar-wrapper">
        <ul class="tool-list">
          <li class="image-tool">
            <span>{{ `${photoViewStore.currentIndex}/${photoViewStore.imageCount()}` }}</span>
          </li>
          <li class="image-tool">
            <span>{{ `x${photoViewStore.zoom}` }}</span>
          </li>
          <li class="image-tool" v-on:click="methods.zoonIn()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="methods.zoonOut()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="methods.toggleFullScreen()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="photoViewStore.close()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
          </li>
        </ul>
      </div>
    </div>
    <div class="photo-view-wrapper">
      <ol class="photo-view-list" id="image-preview-wrapper">
        <li :class="{ selected: photoViewStore.currentIndex === index +1 }"
            v-for="(image, index) in photoViewStore.imageList()"
            :key="index"
            v-on:click="photoViewStore.open(index +1)">
          <img class="image-preview" :src="image.src" :alt="image.alt"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {usePhotoViewStatusStore} from "~/store/PhotoViewStore";
import {useNuxtApp} from "#app";

const photoViewStore = usePhotoViewStatusStore();
const {$emitter} = useNuxtApp();

const methods = {
  zoonIn() {
    photoViewStore.zoomIn()
  },
  zoonOut() {
    photoViewStore.zoomOut()
  },
  toggleFullScreen() {
    if (photoViewStore.isFullScreen) {
      photoViewStore.inactivateFullScreen()
    } else {
      photoViewStore.activateFullScreen()
    }
  }
}

</script>

<style scoped lang="scss">
@import '@/styles/index.scss';

$photo-view-height: 500px;
$tool-item-width: 60px;

.photo-view-area {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .photo-view-panel {
    height: $photo-view-height + $pc-header-height;
    flex-shrink: 0;
    background-color: #1E1C1CFF;
    display: flex;
    overflow: hidden;
    transition: .3s ease-in-out;
    overflow-y: scroll;
    overflow-x: scroll;

    img {
      width: 100%;
      transition: .3s ease-in-out;
      margin: 0 auto;
      object-fit: contain;
      transform-origin: left top;
    }

    &.x2 {
      img {
        transform: scale(1.25);
      }
    }

    &.x3 {
      img {
        transform: scale(1.5);
      }
    }

    &.x4 {
      img {
        transform: scale(1.75);
      }
    }

    &.x5 {
      img {
        transform: scale(2);
      }
    }

    button {
      font-size: 2rem;
      outline: none;
      background-color: transparent;
      border: none;
      color: #808080FF;
      width: 160px;
      position: fixed;
      height: inherit;
      cursor: pointer;
      z-index: 7;

      &:hover {
        background-color: rgb(0, 0, 0, 0.1);
      }
    }

    button.before-button {
      left: 0;
    }
    button.next-button {
      right: 0;
    }

    .image-toolbar-wrapper {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      position: fixed;
      right: 0;
      bottom: calc(100vh - ($photo-view-height + $pc-header-height - 10px));
      height: $tool-item-width;
      background: rgb(0, 0, 0, 0.3);
      transition: .3s ease-in-out;
      z-index: 8;

      .tool-list {
        list-style: none;
        display: flex;
        flex-direction: row;
        height: 100%;

        .image-tool {
          width: $tool-item-width;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: .3s ease-in-out;

          &:before {
            transition: .4s;
            background-color: rgb(255, 255, 255, 0.1);
            border-radius: 30px;
            content: "";
            position: fixed;
          }
          span {
            color: $point-light-color;
            user-select: none;
          }
          svg {
            font-size: 1.4rem;
            fill: $point-light-color;
          }
          &:hover {
            cursor: pointer;

            &:before {
              width: $tool-item-width;
              height: $tool-item-width;
              animation-name: spread_60px;
              animation-duration: .3s;
              animation-iteration-count: 1;
            }
          }
        }

        .image-tool:nth-child(1), .image-tool:nth-child(2) {
          cursor: default;

          &:hover {
            &:before {
              display: none;
            }
          }
        }
      }
    }

    .image-description {
      padding: 3px 5px;
      position: fixed;
      top: 10px;
      display: flex;
      font-size: 1.5rem;
      font-weight: 500;
      width: 100%;
      justify-content: center;
      color: white;
      text-shadow: #000000 0 0 7px;
      margin: 0 auto;
      background-color: rgb(0, 0, 0, 0.3);
      transition: .3s ease-in-out;
    }
  }

  .photo-view-wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    transition: .3s ease-in-out;

    .photo-view-list {
      display: flex;
      flex-direction: row;
      list-style: none;

      li {
        width: 150px;
        height: 120px;
        display: flex;
        justify-content: center;
        background-color: #1E1C1CFF;
        margin: 0 10px;
        border-radius: 5px;
        transition: .4s;

        img {
          height: inherit;
          width: inherit;
        }

        &.selected {
          border: 2px solid $main-light-color;
          box-shadow: 0 0 10px $main-light-color;
        }

        &:hover {
          box-shadow: 0 0 10px $main-light-color;
        }
      }
    }
  }

  &.full-screen {
    .photo-view-panel {
      height: 100vh;

      .image-description {
        top: 10px;
      }

      img {
      }

      &.x2 {
        img {
          transform: scale(1.25);
        }
      }

      &.x3 {
        img {
          transform: scale(1.5);
        }
      }

      &.x4 {
        img {
          transform: scale(1.75);
        }
      }

      &.x5 {
        img {
          transform: scale(2);
        }
      }

      .image-toolbar-wrapper {
        top: unset;
        bottom: 10px;

        .tool-list {

          .image-tool:nth-child(5) {
            rotate: -180deg;
          }
        }
      }
    }
  }
}

</style>
