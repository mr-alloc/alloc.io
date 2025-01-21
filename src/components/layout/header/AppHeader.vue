<template>
    <header :class="ui.header.wrapper">
      <div :class="[ui.header.inner, { 'search-mode' : searchStatusStore.isSearchMode }]">
        <div :class="ui.header.logo.wrapper" @click="router.push('/')">
          <div :class="ui.header.logo.inner.wrapper">
            <div :class="ui.header.logo.inner.frame">
              <NuxtLink href="/" :class="ui.header.logo.inner.link">
                <img src="/logo.png" alt="Site Log Image" class="h-8" />
                <div :class="ui.header.logo.inner.version.wrapper">
                  <span :class="ui.header.logo.inner.version.text">v{{ packageJson.version }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <ul :class="ui.header.menu.wrapper">
          <li :class="ui.header.menu.item.frame">
            <div :class="ui.header.menu.item.inner">
              <NuxtLink to="/wikis" :class="ui.header.menu.item.link">나만의 위키({{
                  postContentStore.wikiCount
                }})
              </NuxtLink>
            </div>
          </li>
        </ul>
        <div :class="ui.header.feature.wrapper">
          <div :class="ui.header.feature.item.wrapper" v-for="feature in features">
            <UTooltip :text="feature.label">
              <button type="button" :class="ui.header.feature.item.button" v-on:click="feature.click">
                <span :class="[ui.header.feature.item.icon, feature.icon]"></span>
              </button>
            </UTooltip>
          </div>
          <div :class="ui.header.feature.item.wrapper">
            <UTooltip :text="colorMode.preference === 'dark' ? '라이트 모드로' : '다크모드로'">
              <button type="button" :class="ui.header.feature.item.button" v-on:click="toggleDarkMode">
                <span :class="[ui.header.feature.item.icon, colorMode.value === 'dark' ? appConfig.ui.icons.dark : appConfig.ui.icons.light]"></span>
              </button>
            </UTooltip>
          </div>
        </div>
      </div>
    </header>
</template>
<script lang="ts" setup>
import {useSearchStatusStore} from "@/store/search-status-store";
import {useNuxtApp} from "nuxt/app";
import packageJson from "~/package.json"
import {usePostContentStore} from "@/store/post-content-store";

const router = useRouter()
const nuxtApp = useNuxtApp();
const emitter: any = nuxtApp.$emitter;

const searchStatusStore = useSearchStatusStore();
const postContentStore = usePostContentStore();
const appConfig = useAppConfig();
const colorMode = useColorMode();

const features = [
  {
    label: '검색',
    click: (e: PointerEvent) => searchStatusStore.searching(),
    icon: 'i-ph:magnifying-glass'
  }
]

const toggleDarkMode = () => {
  const mode = colorMode.value === 'dark' ? 'light' : 'dark';
  colorMode.preference = mode;
  colorMode.value = mode;
}

onMounted(() => {
  emitter.on('initScroll', () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  });
});

const ui = {
  header: {
    wrapper: 'bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0',
    inner: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]',
    logo: {
      wrapper: 'lg:flex-1 flex items-center gap-1.5',
      inner: {
        wrapper: 'relative inline-flex text-left rtl:text-right',
        frame: 'inline-flex w-full',
        link: 'flex gap-2 items-center',
        image: 'text-black dark:text-white block w-auto h-6',
        version: {
          wrapper: 'relative inline-flex',
          text: 'inline-flex items-center text-xs px-1.5 py-0.5 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 -mb-[2px] rounded font-semibold'
        }
      }
    },
    menu: {
      wrapper: 'items-center gap-x-8 hidden lg:flex',
      item: {
        frame: 'relative',
        inner: 'inline-flex w-full',
        link: 'text-sm/6 font-semibold flex items-center gap-1 text-primary'
      }
    },
    feature: {
      wrapper: 'flex items-center justify-end lg:flex-1 gap-1.5',
      item: {
        wrapper: 'relative inline-flex',
        button: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center',
        icon: 'iconify flex-shrink-0 h-5 w-5'
      }
    }
  }
}
</script>
