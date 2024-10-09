<template>
  <div id="application-container" class="app-container">
    <MainHeader />
    <main class="min-h-[calc(100vh-var(--header-height))] relative">
      <ClientOnly>
        <BackdropCurtain />
      </ClientOnly>
      <NuxtPage class="mx-auto current-content" id="current-content-element" :page-key="route.fullPath" :keepalive="false" />
    </main>
    <div class="background" :class="[
        photoViewStatus.isPhotoView || searchStatus.isSearchMode
        ? ['z-50', 'fixed', 'inset-0', 'overflow-y-auto', 'transition-opacity', 'bg-gray-200/75', 'dark:bg-gray-800/75'] : []
        ]"
         v-on:click="methods.clickBackground($event)">
      <div class="flex min-h-full items-end sm:items-center justify-center text-center p-0 sm:p-4">
        <SearchView />
      </div>
      <PhotoView v-if="photoViewStatus.isPhotoView" v-on:click="$event.stopPropagation()" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Runner from '@/service/DefaultStarterService'
import MainHeader from "@/components/layout/header/MainHeader.vue";
import PhotoView from "@/components/layout/global/PhotoView.vue";
import {callPostFeed} from "@/utils/PostUtil";
import {useSearchStatusStore} from "@/store/SearchStatusStore";
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";
import {computed, onMounted} from "vue";
import {useNuxtApp} from "nuxt/app";
import SearchView from "@/components/layout/global/SearchView.vue";
import {usePostCallStore} from "@/store/PostCallStore";
import {useDarkModeStore} from "@/store/DarkModeStore";
import BackdropCurtain from "@/components/layout/content/BackdropCurtain.vue";

Runner.init();
const route = useRoute();
const router = useRouter();
const { $emitter } = useNuxtApp();
const searchStatus = useSearchStatusStore();
const photoViewStatus = usePhotoViewStatusStore();
const darkModeStore = useDarkModeStore();
const postCallStore = usePostCallStore();

const methods = {
  clickBackground: (event: PointerEvent) => {
    if (searchStatus.isSearchMode) {
      searchStatus.cancelSearch()
    } else if (photoViewStatus.isPhotoView) {
      photoViewStatus.close()
    }
  },
}

onMounted(() => {

  const element = document.getElementById('application-container')!

  const handleForScroll = (event: Event) => {
    /* 현재 스크롤 위치 */
    // const currentScroll = element.scrollTop
    const currentScroll = window.scrollY
    /* 엘리먼트 높이 */
    // const winHeight = element.clientHeight
    const winHeight = window.innerHeight
    /* 엘리먼트 스크롤 높이 */
    const docHeight = element.scrollHeight

    const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(0)

    const scrollPer = parseFloat(percent)

    if(( ! postCallStore.isCall) && scrollPer > 80) {
      postCallStore.call();
      callPostFeed();
    }

  }
  window.addEventListener('scroll', handleForScroll)

//initialize
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeStore.force(prefersColorScheme.matches);

  //add event
  prefersColorScheme.addEventListener('change', event => {
    darkModeStore.force(event.matches);
  });
})



useHead(() => ({
  htmlAttrs: {
    lang: 'ko-kr',
    class: computed(() => darkModeStore.isDarkMode ? 'dark' : 'light')
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' }
  ]
}))
</script>

<style lang="scss">
@import '@styles/index';


/* Global Styles */
@font-face {
  font-family: 'AppleSDGothicNeoB';
  src: url('/assets/fonts/Apple_Sandol_Gothic_Neo/AppleSDGothicNeoB.ttf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'AppleSDGothicNeoL';
  src: url('/assets/fonts/Apple_Sandol_Gothic_Neo/AppleSDGothicNeoL.ttf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SFMonoLight';
  src: url('/assets/fonts/sf-mono-cufonfonts/SFMonoLight.otf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono EL';
  src: url('/assets/fonts/JetBrains_Mono/JetBrainsMono-ExtraLight.ttf');
}

@font-face {
  font-family: 'JetBrainsMono it';
  src: url('/assets/fonts/JetBrains_Mono/JetBrainsMono-Italic.ttf');
}



#__nuxt {
  font-family: -apple-system, BlinkMacSystemFont;

  .dark {
    background-color: $point-dark-color;
  }

}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  &:before {
    transition: .6s;
  }

  &:after {
    transition: .6s;
  }
  .only-mobile {
    display: none;
  }
}


</style>
