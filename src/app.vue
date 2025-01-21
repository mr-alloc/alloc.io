<template>
  <div id="application-container" class="duration-300">
    <AppHeader />

    <AppMain class="relative">
      <BackdropCurtain
          class="absolute w-full top-[1px] transition-all text-primary flex-shrink-0"
          :class="[
              isLoading ? 'animate-pulse' : (appear ? 'opacity-100' : 'opacity-0'),
              appeared ? 'duration-[400ms]': 'duration-1000',
              heroBackgroundClass
          ]"
      />
      <NuxtPage />
    </AppMain>

    <AppFooter />
    <ClientOnly>
      <Transition name="fade">
        <div class="background fixed inset-0 overflow-y-auto transition-opacity"
             v-if="photoViewStatus.isPhotoView || searchStatus.isSearchMode"
             :class="[
               photoViewStatus.isPhotoView || searchStatus.isSearchMode
            ? ['z-50', 'bg-gray-200/75', 'dark:bg-gray-800/75'] : ['opacity-0']
            ]"
             v-on:click="($event) => methods.clickBackground($event as PointerEvent)">
          <SearchView v-show="searchStatus.isSearchMode"/>
          <PhotoView v-if="photoViewStatus.isPhotoView" v-on:click="$event.stopPropagation()" />
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import Runner from '@/service/default-starter-service'
import AppHeader from "@/components/layout/header/AppHeader.vue";
import PhotoView from "@/components/layout/global/PhotoView.vue";
import {callPostFeed} from "@/utils/post-util";
import {useSearchStatusStore} from "@/store/search-status-store";
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import {computed, onMounted} from "vue";
import SearchView from "@/components/layout/global/SearchView.vue";
import {usePostCallStore} from "@/store/post-call-store";
import BackdropCurtain from "@/components/layout/content/BackdropCurtain.vue";
import AppMain from "@/components/layout/global/AppMain.vue";
import AppFooter from "@/components/layout/footer/AppFooter.vue";

Runner.init();
const route = useRoute();
const searchStatus = useSearchStatusStore();
const photoViewStatus = usePhotoViewStatusStore();
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
  window.addEventListener('scroll', handleForScroll);
})


const colorMode = useColorMode();
const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white');
useHead(() => ({
  htmlAttrs: {
    lang: 'ko-kr',
    class: colorMode.value
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' },
    { name: 'theme-color', key: 'theme-color', content: color }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap' },
  ]
}));

watch(() => colorMode.value, (newValue) => {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(newValue);
});

const heroBackgroundClass = computed(() => route.meta?.heroBackground || '');
const { isLoading } = useLoadingIndicator();
const appear = ref(false)
const appeared = ref(false)
onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<style lang="scss">

#__nuxt {
  font-family: "Noto Sans KR", serif, -apple-system, BlinkMacSystemFont;
  font-optical-sizing: auto;
  font-style: normal;

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
