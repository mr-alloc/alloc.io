<template>
  <div class="photo-view-area relative w-screen h-screen flex flex-col" :class="{ 'full-screen': photoViewStore.isFullScreen }">
    <div class="photo-view-panel flex h-4/5 shrink-0 bg-gray-800 dark:bg-gray-800 overflow-hidden relative justify-center" :class="[`photoViewStore.zoom !== 1 && ${`x${photoViewStore.zoom}`}`, { zoom: photoViewStore.zoom !== 1}]">
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
      <div class="flex lg:w-[800px] justify-center">
        <img id="w-full my-0 bg-white dark:bg-gray-200 p-2 mx-auto object-contain origin-top-left rounded-md" style="background-color: white;" :src="photoViewStore.current()?.src" :alt="photoViewStore.current()?.alt"/>
      </div>
      <!-- 자막 -->
      <div class="image-subtitles">
        <span>{{ photoViewStore.current()?.alt }}</span>
      </div>
      <!-- 다음 버튼 -->
      <button class="next-button" type="button" v-if="photoViewStore.hasNext()" v-on:click="photoViewStore.nextImage()">
        <svg class="svg-inline--fa fa-chevron-right" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path class="" fill="currentColor" d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
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
              <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="methods.zoonOut()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="methods.toggleFullScreen()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </li>
          <li class="image-tool" v-on:click="photoViewStore.close()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
          </li>
        </ul>
      </div>
    </div>
    <div class="photo-view-wrapper">
      <ol class="photo-view-list" id="image-preview-wrapper">
        <li :class="{ selected: photoViewStore.currentIndex === index +1 }"
            v-for="(image, index) in photoViewStore.imageList() as Array<Image>"
            :key="index"
            v-on:click="photoViewStore.open(index +1)">
          <img class="image-preview object-cover" style="background-color: white;" :src="image.src" :alt="image.alt"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import type Image from "@/classes/implement/image";

const photoViewStore = usePhotoViewStatusStore();

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
$photo-view-height: 500px;
$tool-item-width: 60px;

.photo-view-area {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .photo-view-panel {
    height: 80%;
    flex-shrink: 0;
    background-color: #1E1C1CFF;
    display: flex;
    overflow: hidden;
    transition: .3s ease-in-out;
    position: relative;

    img {
      width: 100%;
      transition: .3s ease-in-out;
      margin: 0 auto;
      object-fit: contain;
      transform-origin: left top;
    }

    &.zoom {
      overflow-y: scroll;
      overflow-x: scroll;
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
      position: fixed;
      cursor: pointer;
      z-index: 7;
      bottom: 50%;

      width: 70px;
      height: 70px;
      border-radius: 50%;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: rgb(0, 0, 0, 0.1);
        }
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
      bottom: calc(20% + 10px);
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

          @media (hover: hover) and (pointer: fine) {
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
        }

        .image-tool:nth-child(1), .image-tool:nth-child(2) {
          cursor: default;

          &:hover, &:active {
            &:before {
              display: none;
            }
          }
        }
      }
    }

    .image-subtitles {
      padding: 3px 5px;
      position: fixed;
      bottom: 270px;
      display: flex;
      font-size: 1.5rem;
      font-weight: 500;
      width: 100%;
      justify-content: center;
      color: white;
      margin: 0 auto;
      transition: .3s ease-in-out;

      span {
        padding: 3px 5px;
        background-color: rgb(0, 0, 0, .3);
        border-radius: 5px;
      }
    }
  }

  .photo-view-wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    transition: .3s ease-in-out;
    user-select: none;
    background-color: #1E1C1CFF;

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
        border: 2px solid lightgray;
        margin: 0 10px;
        overflow: hidden;
        border-radius: 15px;
        transition: .3s;

        img {
          height: inherit;
          width: inherit;
        }

        &.selected {
          border-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
          scale: 1.1;
        }

        &:hover {
          border-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
          scale: 1.1;
        }
      }
    }
  }

  &.full-screen {
    .photo-view-panel {
      height: 100vh;

      img {
      }

      .image-subtitles {
        bottom: 20px;
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
