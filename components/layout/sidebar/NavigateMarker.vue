<template>
  <div class="navigator-title" id="navigator-title-ele">
    <span class="arrow"></span>
    <span class="dist" :class="{ disappear : explorerHeaderStore.isActive }">{{ data.navigator.dist }}</span>
    <span class="source">{{ data.navigator.source }}</span>
  </div>
</template>

<script lang="ts" setup>
import {explorerHeaderStore} from '@/store'
import {naviStack} from '@/store/site'
import {useNuxtApp} from "#app";
import {onMounted} from "vue";
const {
   $emitter
} = useNuxtApp()
const name: string = 'NavigateMarker'
const root = naviStack[0]?.name
const data = {
  isCallable: true,
  navigator: {
    dist: root,
    source: ''
  },
  titleId: 'navigator-title-ele',
  explorerHeaderStore
}
onMounted(() => {
  document.querySelector(`#${data.titleId} .dist`)?.addEventListener('click', methods.moveBack)

  $emitter.on('moveIn', (index: number) => {

    const titleElement = document.getElementById(data.titleId)
    const oldDist = document.querySelector(`#${data.titleId} .dist`)
    const oldSource = document.querySelector(`#${data.titleId} .source`)

    if(titleElement && ! titleElement.classList.contains('back')) {
      titleElement.classList.add('back')
      methods.getSource()?.classList.add('active')
    }

    if(index > 1) {

      const carry = new Promise((resolve: Function) => {

        const newSource = document.createElement('span')
        newSource.innerText = naviStack[index].name
        newSource.classList.add('source')
        document.getElementById(data.titleId)?.append(newSource)


        resolve()
      })

      carry.then(() => {
        if(oldDist && oldDist.classList && oldSource && oldSource.classList) {
          const oldDistClassList = oldDist.classList
          oldDistClassList.add('after-passed')
          oldDistClassList.remove('dist')

          const oldSourceClassList = oldSource.classList
          oldSourceClassList.add('dist')
          oldSourceClassList.remove('source')
          oldSourceClassList.remove('active')

          oldSource?.addEventListener('click', methods.moveBack)
          setTimeout(() => {
            methods.getSource()?.classList.add('active')

          }, 10)
        }
      }).then(() => {
        setTimeout(() => {
          methods.getPassed()?.remove()

        }, 600)
      })

    } else {

      methods.getSource().innerText = naviStack[index].name

    }
  })
})

const methods = {
  moveBack () {
      $emitter.emit('explore', true)
      const panel = document.getElementById('explored-panel')
      const oldDist = methods.getDist()
      const oldSource = methods.getSource()
      if(panel) {

        let selected = (index: number) => {
          return document.getElementById(`explored-stack-${index}`)
        }
        let changeStyle = new Promise((resolve: Function) => {

          const lastIndex = panel.children.length -1
          const stacked = selected(lastIndex)
          if(stacked) {
            stacked.classList.remove('navigator-force-style')
            selected(lastIndex -1)?.classList.remove('meet-up')

            //== 마지막 페이지 ==//
            if(naviStack.length == 2) {
              document.getElementById('navigator-title-ele')?.classList.remove('back')
              methods.getSource().classList.remove('active')
            }
            //== 현재 페이지가 2개이상 ==//
            if(naviStack.length > 2) {

              oldSource.classList.remove('active')
              oldDist.classList.add('source', 'active')
              oldDist.classList.remove('dist')


              const newSource = document.createElement('span')
              newSource.innerText = naviStack[naviStack.length -3].name
              newSource.classList.add('after-passed')
              newSource.addEventListener('click', methods.moveBack)
              document.getElementById(data.titleId)?.insertBefore(newSource, document.querySelector(`#${data.titleId} .source`))

              setTimeout(() => {
                newSource.classList.remove('after-passed')
                newSource.classList.add('dist')
              }, 100)

              setTimeout(() => {
                oldSource.remove()
              }, 600)
            }

            resolve()
          }
        })


        changeStyle.then(() => {
          setTimeout(() => {

            if(naviStack.length > 1) {

              naviStack.pop()
            }

          }, 600)
        }).catch((error) => {
          console.log('Error occurred with: ', error)
        })
        $emitter.emit('release_selected')
        $emitter.emit('explore', false)
      }
    },
    getDist(): HTMLElement {
      return document.querySelector('#navigator-title-ele .dist')!
    },
    getSource(): HTMLElement {
      return document.querySelector('#navigator-title-ele .source')!
    },
    getPassed(): HTMLElement {
      return document.querySelector('#navigator-title-ele .after-passed')!
    }
}
</script>

<style lang="scss">
@import '@/styles';


.dark .navigator-title {
  color: #ffffff;

  &.fixed {
    background-color: rgb(117 115 115 / 30%);
  }
}


.navigator-title {
  color: black;
  width: 100%;
  z-index: 1;
  -webkit-tap-highlight-color:transparent;
  position: relative;

  &.fixed {


    .dist {
      top: 10px;
      font-size: 1.09rem;
      white-space: nowrap;
      position: relative;
      top: 55px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
    }
  }


  span {


    &:not(:first-child) {

      position: absolute;
    }
  }

  .arrow {

    &:before {
      content: '〈';
      font-weight: bold;
      font-size: .82rem;
      color: #2997ff;
      position: absolute;
      opacity: 0;
      left: 20px;
      top: 15px;
    }
  }

  .dist {
    font-weight: bold;
    font-size: 2rem;
    top: 45px;
    left: 20px;

  }

  .after-passed {
    opacity: 0;
    left: -30px;
    top: 10px
  }

  .source {
    position: relative;
    left: $pc-navigator-width - 60px;
    top: 10px;
    opacity: 0;
    font-size: 1.09rem;
    white-space: nowrap;

    &.active {
      opacity: 1;
      margin: 0 auto;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &.back {
    align-items: flex-end;
    z-index: 111;

    .arrow:before {
      opacity: 1;
      left: 10px;
      font-size: 1.4rem;
      top: 5px;
    }

    .dist {
      font-size: 1.09rem;
      font-weight: normal;
      color: #2997ff;
      cursor: pointer;
      padding: 0px 5px;
      top: 10px
    }

  }
}

//.fixed .navigator-title {
//  z-index: 101;
//
//  .dist {
//
//    &.disappear {
//      opacity: 0;
//    }
//  }
//
//
//  &.appear {
//    position: fixed;
//    height: 45px;
//
//    .dist {
//      top: 10px;
//      left: 50%;
//      transform: translateX(-50%);
//      font-size: 1.09rem;
//      white-space: nowrap;
//
//      transition: left 0s, opacity .4s;
//    }
//  }
//}

@include tablet {

  .navigator-title {

    .source {
      left: 170px;
    }

    .dist {

    }
  }
}

@include mobile {

  .navigator-title {

    span.dist {
      top: 45px;
    }
  }


  //.fixed .navigator-title {
  //  width: $mobile-navigator-width;
  //
  //  .dist{
  //    z-index: 101;
  //
  //  }
  //
  //}
}
</style>
