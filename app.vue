<template>
  <div id="application-container" class="app-container" :class="{ dark: store.isDarkMode }">
    <MainHeader />
    <RouteWrapper />
    <LoadingBar />
<!--    <MobileExpander/>-->
  </div>
</template>
<script lang="ts" setup>
import MainHeader from "@/components/layout/header/MainHeader.vue";
import LoadingBar from "@/components/layout/header/LoadingBar.vue";
import RouteWrapper from "@/components/layout/content/RouteWrapper.vue";
import { useDarkModeStore } from "@/store/DarkModeStore";
import Runner from '@/service/DefaultStarterService'
import {blogInfo} from "~/store/site";
import MobileExpander from "~/components/layout/header/MobileExpander.vue";
import {onMounted} from "vue";
import {useHead} from "@vueuse/head";


Runner.init()
const store = useDarkModeStore()

const components = {
  RouteWrapper,
  LoadingBar,
  MainHeader
}


onMounted(() => {

  document.addEventListener('keydown', (e) => {

  })
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width=, initial-scale=1.0, maximum-scale=1.0' }
  ]
})
</script>

<style lang="scss">
@import '@/styles';
.app-container {
  display: flex;
  flex-direction: column;
  background-color: $point-light-color;

  &.dark {
    background-color: $main-dark-color;
  }
}


@include mobile {
  .app-container {

  }
}

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

body {
  overflow: hidden;

  .dark {
  }
}


#__nuxt {
  font-family: -apple-system, BlinkMacSystemFont;

  .dark {
    background-color: $point-dark-color;
  }
}

* {
  padding: 0px;
  margin: 0px;

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

:root {
  --medium-zoom-z-index: 100;
  --medium-zoom-bg-color: #ffffff;
  --medium-zoom-opacity: 1;
  --back-to-top-z-index: 5;
  --back-to-top-color: #3eaf7c;
  --back-to-top-color-hover: #71cda3;
  --nprogress-color: #29d;
  --nprogress-z-index: 1031;
  transition: all .6s ease-out;
}


a {
  text-decoration: none;
  color: #2c3e50;
  -webkit-tap-highlight-color:transparent;
}

.window-controller {
  display: block;
  border-radius: 15px 15px 0px 0px;

  &:before {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin: 5px 4px;
    background-color: #FF605C;
    border: 1.12px solid #f35854;
  }

 .window-close {
  background-color: #FF605C;
  border: 1.12px solid #f35854;
  }

 .window-minimize {
  background-color: #FFBD44;
  border: 1.12px solid #f6b73b;
  }

   .window-maximize {
    background-color: #00CA4E;
    border: 1.12px solid #02be4a;
  }

}


</style>
