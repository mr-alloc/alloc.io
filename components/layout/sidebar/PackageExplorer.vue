<template>
  <div :id="`explored-stack-${props.index}`" class="package-explorer-wrapper">
    <div class="explored-directory-element">
      <ul class="element-box">
          <li v-for="(child, index) in props.parent.nodes" v-bind:key="index" class="directory-element" @click="methods.selectFile(child, props.index, index)">
            <div class="element-icon-wrapper">
            <span class="element-icon" >
              <img class="custom-icon" :src="`/assets/icon/${methods.getFileIcon(child)}.png`" alt="file icon image" />
            </span>
            </div>
            <div class="element-content">
              <div class="element-title-area">
                <span class="title-text">{{ child._summary }}</span>
              </div>
              <div class="feature-trailer">
                <span class="trailer-arrow">
                  <svg class="svg-inline--fa fa-chevron-right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path class="" fill="currentColor" d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FileNodeWrapper } from "@/class/implement/FileNodeWrapper";
import {mobileNaviStore} from "@/store";
import {naviStack} from "@/store/site";
import {useNuxtApp, useRouter} from "#app";
import {FileNode} from "~/class/implement/FileNode";
import {IFileNode} from "~/class/IFileNode";
import {onBeforeMount, onMounted} from "vue";
const { $emitter } = useNuxtApp();
const router = useRouter()

const data = {
  naviStack,
  mobileNaviStore,
  isCallable: true
}

const props = defineProps({
  index: Number,
  parent: FileNodeWrapper
})

onBeforeMount(() => {
  $emitter.on('release_selected', () => {

    if(naviStack.length <= 3) {
      const children = methods.getStack(naviStack.length - 2)?.children

      for(let child of children!) {
        child.classList.remove('selected')
      }
    }
  })
})

const methods = {
  getFileType: (child: FileNode) => {
    console.log('child: ', child)

    if(child._type == 'DIRECTORY')
      return 'folder'

    return 'file-lines'
  },
  selectFile (file: FileNode, nodeIndex: number, index: number) {
    $emitter.emit('explore', true)

    if(file.isDirectory()) {

      const clicked = this.getStack(nodeIndex)?.children.item(index)!
      clicked.classList.add('selected')

      let sortedFiles: IFileNode[] = file.files?.sort((a, b) => `${a._type}`.localeCompare(`${b._type}`))!
      naviStack.push(new FileNodeWrapper(file._summary, sortedFiles))
      const panel = document.getElementById('explored-panel')
      if(panel) {

        let selected = (index: number) => {
          return document.getElementById(`explored-stack-${index}`)
        }
        setTimeout(() => {
          const lastIndex = panel.children.length -1
          const stacked = selected(lastIndex)

          if(stacked) {
            stacked.classList.add('navigator-force-style')
            selected(lastIndex -1)?.classList.add('meet-up')
          }
        }, 100)
      }

      $emitter.emit('moveIn', (nodeIndex +1))
    } else {

      router.push(file.path)
      mobileNaviStore.isActive = false
    }

    $emitter.emit('explore', false)
  },
  getStack(idx: number) {

    return document.querySelector(`#explored-stack-${idx} .element-box`)
  },
  getFileIcon(child: FileNode) {
    let iconName;
    if(child.hasIcon()) {
      iconName = child._name
    } else if(child.isDirectory()) {
      iconName = 'folder_default'
    } else {
      iconName = 'post_default'
    }
    return iconName
  }
}
</script>

<style lang="scss">
@import '@/styles';

.package-explorer-wrapper {
  flex-shrink: 0;
  position: absolute;
  width: calc($pc-navigator-width - ($pc-navigator-padding * 2));
  padding: 90px 20px 40px;
  background-color: #f2f1f7;
  min-height: calc(100% - 60px);
  transition: color 0s;

  .explored-directory-element {
    background-color: $main-light-color;
    border-radius: 7px;

    .element-box {
      color: black;
      font-size: .84rem;
      list-style: none;
      font-family: "AppleSDGothicNeoL";

      .directory-element {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        height: 39px;

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

        .element-icon-wrapper {
          margin: auto;
          flex-shrink: 0;
          width: 50px;

          .element-icon {


            font-size: 15px;
            border-radius: 5px;
            text-align: center;
            width: 20px;
            display: block;
            margin: 0px auto;
          }

          .custom-icon {

            font-size: 15px;
            border-radius: 5px;
            text-align: center;
            width: 25px;
            display: block;
            margin: 0px auto;
            background-color: transparent;
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

          .element-title-area {
            flex-grow: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: table;

            .title-text {
              vertical-align: middle;
              display: table-cell;

            }
          }

          .feature-trailer {
            flex-shrink: 0;
            width: 60px;
            display: table;

            .trailer-arrow {
              display: table-cell;
              vertical-align: middle;
              padding-left: 30px;
            }
          }
        }

        &.selected {
          background-color: #cccccc;
        }

        &:active {

          background-color: #cccccc;
        }
      }

      .type-dir:before {
        content: '';
        margin: 0px 20px
      }
    }
  }

  &:not(:first-child) {
    padding-top: 55px;
  }

  &:last-child {
    margin-left: $pc-navigator-width;

    &.navigator-force-style {
      margin-left: 0px;
    }
  }

  &:first-child {
    margin-left: 0px;
  }

  &.meet-up {
    margin-left: $pc-navigator-width * (-0.3);
  }
}


.dark .package-explorer-wrapper {
  background-color: $point-dark-color;

  .explored-directory-element {
    background-color: $main-dark-color;

    .element-box {
      color: #ffffff;
      transition: color .4s;

      .directory-element {

        &:active {

          background-color: #3b3939;
        }

        &:not(:last-of-type) .element-content {
          border-bottom-color: #3b3939;
        }


        &.selected {
          background-color: #545252;
        }
      }
    }
  }
}

.fixed .package-explorer-wrapper {
  padding-top: 90px;

  &:not(:first-child) {
    padding-top: 55px;
  }

  &:last-child {
    margin-left: $pc-navigator-width;

    &.navigator-force-style {
      margin-left: 0px;
    }
  }

  &:first-child {
    margin-left: 0px;
  }
}

@include tablet {

  .package-explorer-wrapper {
    padding: 90px $tablet-navigator-padding 40px;
    width: calc($tablet-navigator-width - ($tablet-navigator-padding * 2));

    &:not(:first-child) {
      padding-bottom: 45px;
    }

    .current-explorer-title {

    }

    .explored-directory-element {

      .element-box {
      }
    }
  }
}

@include mobile {

  .package-explorer-wrapper {
    width: 90%;
    padding: 90px 5% 40px;

    &:not(:first-child) {
      padding-top: 55px;
      padding-bottom: 75px;
    }

    &:last-child {
      margin-left: 100%;

      &.navigator-force-style {
        margin-left: 0px;
      }
    }

    &:first-child {
      margin-left: 0px;
    }

    &.meet-up {
      margin-left: $mobile-navigator-width * (-0.3);
    }

    .explored-directory-element {

      ul.element-box {

        li.directory-element {

          &:hover {

            .element-icon-wrapper {
              //border-top: 1.5px solid #ededed;
              transition: border-top-color 0s;

            }
          }


          .element-icon-wrapper {
            width: 60px;

            .element-icon {

              &.folder {

              }
              font-size: 20px;
              width: 28px;
            }
          }


        }
      }
    }
  }
}
</style>
