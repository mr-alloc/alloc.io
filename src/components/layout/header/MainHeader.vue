<template>
  <header class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0">
    <div id="main-header" class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]" :class="{
      'search-mode' : searchStatusStore.isSearchMode,
      'going-down': appCache.scrollStatus.isDown || photoViewStatus.isPhotoView
    }">
      <div class="lg:flex-1 flex items-center gap-1.5" @click="router.push('/')">
        <div class="relative inline-flex text-left rtl:text-right">
          <div class="inline-flex w-full">
            <NuxtLink href="/" class="flex gap-2 items-end">
              <!--          <img src="/assets/dev_is_record.png" :style="{-->
              <!--              width: '100%',-->
              <!--              cursor: 'pointer'-->
              <!--          }" />-->
              <div class="relative inline-flex">
                <span class="inline-flex items-center text-xs px-1.5 py-0.5 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 -mb-[2px] rounded font-semibold">
                  {{ packageJson.version }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <ul class="items-center gap-x-8 hidden lg:flex">
        <li class="relative">
            <div class="inline-flex w-full">
              <client-only>
                <a href="/tags" class="text-sm/6 font-semibold flex items-center gap-1 text-primary">태그</a>
              </client-only>
            </div>
        </li>
      </ul>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <div class="relative inline-flex">
          <button type="button" v-on:click="methods.activateSearchMode()" aria-label="Search"
                  class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
            <span class="iconify i-ph:magnifying-glass-duotone flex-shrink-0 h-5 w-5"></span>
          </button>
        </div>
      </div>
      <div class="progress-area" v-if="false" :class="{ hide : mobileNaviStore.isActive }">
        <span class="progress-bar"></span>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import {mobileNaviStore, searchInputStore} from "@/store";
import {calPostDate} from "@/utils/settingUtils";
import {onMounted} from "vue";
import appCache from "@/store/appCache";
import {useSearchStatusStore} from "@/store/SearchStatusStore";
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";
import {useNuxtApp} from "nuxt/app";
import packageJson from "~/package.json"

const router = useRouter();
const nuxtApp = useNuxtApp();
const emitter: any = nuxtApp.$emitter;

const searchStatusStore = useSearchStatusStore();
const photoViewStatus = usePhotoViewStatusStore();

onMounted(() => {
  emitter.on('initScroll', () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  });

  emitter.on('resetSearchBar', () => {
    methods.inactivateSearchMode()
  });

});
const methods = {

  activateSearchMode: () => {
    searchStatusStore.searching();
    // const input = document.getElementById('search-bar') as HTMLInputElement
    // input.focus()
  },
  inactivateSearchMode: () => {
    const input = document.getElementById('search-bar') as HTMLInputElement
    input.value = ''
    input.blur()
    searchStatusStore.cancelSearch()
  },
}
</script>
