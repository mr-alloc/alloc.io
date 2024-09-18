<template>
  <div v-if="searchStatusStore.isSearchMode" class="flex min-h-full items-end sm:items-center justify-center text-center p-0 sm:p-4">
    <div class="relative text-left rtl:text-right flex flex-col bg-white dark:bg-gray-900 shadow-xl w-full sm:max-w-3xl h-dvh sm:h-[28rem] rounded-none sm:rounded-lg sm:my-8" v-on:click="$event.stopPropagation()">
      <div class="relative flex items-center">
        <span class="iconify i-ph:magnifying-glass-duotone pointer-events-none absolute start-4 text-gray-400 dark:text-gray-500 h-5 w-5"></span>
        <input
            ref="searchInput"
            class="w-full placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none sm:text-sm h-[--header-height] sm:h-12 px-4 ps-11 pe-10"
            v-on:input="methods.typeForText()"
            v-on:keyup="methods.sendKeyboardEvent($event)"
        />
        <button class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute end-4">
          <span class="iconify i-heroicons:x-mark-20-solid flex-shrink-0 h-5 w-5"></span>
        </button>
      </div>
      <div class="relative flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scroll-py-10">
        <SearchResult v-for="group in groups.values()" :key="group" :row="group" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchResult from "@/components/layout/header/SearchResult.vue";
import {useSearchStatusStore} from "@/store/SearchStatusStore";
import {Key} from "@/class/implement/Key";
import {PostContent} from "@/class/implement/PostContent";
import {PostSearchResult} from "@/class/implement/PostSearchResult";
import {useNuxtApp} from "nuxt/app";
import {usePostContentStore} from "@/store/PostContentStore";
import {PostSearchGroup} from "@/class/implement/PostSearchGroup";
import {Pair} from "@/class/implement/Pair";

const searchInput = ref<HTMLInputElement | null>(null);
const postContentStore = usePostContentStore();
const searchStatusStore = useSearchStatusStore();
const nuxtApp = useNuxtApp();
const emitter: any = nuxtApp.$emiiter;

const groups = ref(new Map<string, PostSearchGroup>());
const searchLocationPair = ref<Pair<string, number>[]>([]);

const methods = {
  activateSearchMode: () => {
    searchStatusStore.searching();
    const input = searchInput.value as HTMLInputElement
    input.focus();
  },
  inactivateSearchMode: () => {
    const input = searchInput.value as HTMLInputElement
    input.value = ''
    input.blur()
    searchStatusStore.cancelSearch();

  },
  typeForText: () => {
    const inputElement = searchInput.value as HTMLInputElement
    const text = inputElement.value ?? ''

    methods.searchText(text)
  },
  sendKeyboardEvent: (e: KeyboardEvent) => {
    if (e.code == Key.ESC) {
      methods.inactivateSearchMode();
    }
    else if (e.code == Key.ENTER) {
      emitter.emit('moveToSelectedPost')
      return
    }

    else if(e.code == Key.ARROW_DOWN || e.code == Key.ARROW_UP) {
      const select = e.code == Key.ARROW_DOWN ? 0 : 1
      emitter.emit('selectResult', select)
    }
  },
  searchText: (text: string) => {
    if (text === '') {
      emitter.emit('searchText', [])
    }

    if (/([a-zA-Z가-힣0-9@\W\-_])/.test(text)) {
      const RE = new RegExp(`(.+)?(${text})(.+)?`, 'i');
      const contentsForSearch = postContentStore.postContentList as Array<PostContent>;
      const result: PostSearchResult [] = contentsForSearch
          .filter(content => {
            const title = content.header.title;
            return RE.test(title)
          })
          .map(content => new PostSearchResult(content));
      emitter.emit('searchText', result)
    }
  }
}
</script>
