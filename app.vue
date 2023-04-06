<template>
  <div class="app-container" :class="{ dark: store.isDarkMode }">
    <MainHeader />
    <RouteWrapper />
    <LoadingBar />
  </div>
</template>
<script lang="ts" setup>
import MainHeader from "@/components/layout/header/MainHeader.vue";
import LoadingBar from "@/components/layout/header/LoadingBar.vue";
import RouteWrapper from "@/components/layout/content/RouteWrapper.vue";
import { useDarkModeStore } from "@/store/DarkModeStore";
import Runner from '@/service/DefaultStarterService'

Runner.init()
const store = useDarkModeStore()

const components = {
  RouteWrapper,
  LoadingBar,
  MainHeader
}

useHead({
  meta: [
    {
      name: 'theme-color',
      content: '#010409'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://taech.io'
    },
    {
      property: 'og:title',
      content: 'taechnique의 기술 블로그'
    },
    {
      property: 'og:description',
      content: '별내용은 없어요 ~'
    },
    {
      property: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/65699391?v=4'
    }
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


  //& ::-webkit-scrollbar-thumb {
  //  background-color: #e1e1e1;
  //  border-radius: 10px;
  //  background-clip: padding-box;
  //  border: 10px solid transparent;
  //  //border: 3px solid transparent;
  //}
  //
  //& ::-webkit-scrollbar-track {
  //  background-color: $point-light-color;
  //  border-radius: 10px;
  //}
  //
  //& ::-webkit-scrollbar {
  //  height: 4px;
  //  width: 4px;
  //}

  .dark {
  }
}


#__nuxt {
  font-family: AppleSDGothicNeoL, Consolas;
  color: $main-font-color;

  .dark {
    background-color: $point-dark-color;
  }
}

* {
  padding: 0px;
  margin: 0px;
  transition: .6s;

  &:before {
    transition: .6s;
  }

  &:after {
    transition: .6s;
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
