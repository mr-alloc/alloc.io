<template>
  <div v-show="searchStatusStore.isSearchMode" v-if="searchStatusStore.isSearchMode"
       class="relative text-left rtl:text-right flex flex-col bg-white dark:bg-gray-900 shadow-xl w-full sm:max-w-3xl h-dvh sm:h-[28rem] rounded-none sm:rounded-lg sm:my-8"
       :class="[
           searchStatusStore.isSearchMode ? [] : ['opacity-0', 'duration-200']
           ]"
  >
    <div class="flex flex-col flex-1 min-h-0 divide-y divide-gray-100 dark:divide-gray-800" v-on:click="$event.stopPropagation()">
      <div class="relative flex items-center">
        <span aria-hidden="true" class="iconify i-ph:magnifying-glass-duotone pointer-events-none absolute start-4 text-gray-400 dark:text-gray-500 h-5 w-5"></span>
        <input
            v-model="searchStatusStore.inputValue"
            ref="searchInput"
            placeholder="Search..."
            aria-expanded="true"
            autocomplete="off"
            class="w-full placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none sm:text-sm h-[--header-height] sm:h-12 px-4 ps-11 pe-10"
            v-on:input="methods.typeForText()"
            v-on:keyup="methods.sendKeyboardEvent($event)"
        />
        <button class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center absolute end-4"
                v-on:click="() => methods.inactivateSearchMode()">
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
import {useSearchStatusStore} from "@/store/search-status-store";
import {Key} from "@/classes/constant/key";
import {PostMetadata} from "@/classes/implement/PostMetadata";
import {PostSearchResult} from "@/classes/implement/post-search-result";
import {useNuxtApp} from "nuxt/app";
import {usePostContentStore} from "@/store/post-content-store";
import {PostSearchGroup} from "@/classes/implement/post-search-group";
import {Pair} from "@/classes/implement/pair";
import appCache from "@/store/app-cache";
import {grouping} from "@/utils/collection-util";
import DocumentType from "@/classes/constant/document-type";

const searchInput = ref<HTMLInputElement | null>(null);
const postContentStore = usePostContentStore();
const searchStatusStore = useSearchStatusStore();
const nuxtApp = useNuxtApp();
const router = useRouter();
const emitter: any = nuxtApp.$emitter;

const currentLocationIndex = ref(0);
const groups = ref(new Map<string, PostSearchGroup>());
const searchLocationPair = ref<Pair<string, number>[]>([]);

const methods = {
  activateSearchMode: () => {
    searchStatusStore.searching();
    const input = searchInput.value as HTMLInputElement;
    input.focus();
  },
  inactivateSearchMode: () => {
    const input = searchInput.value as HTMLInputElement;
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
      methods.deployResult([]);
      return;
    }

    if (/([a-zA-Z가-힣0-9@\W\-_])/.test(text)) {
      const RE = new RegExp(`(.+)?(${text})(.+)?`, 'i');
      const contentsForSearch = postContentStore.allValues() as Array<PostMetadata>;
      const results: PostSearchResult [] = contentsForSearch
          .filter(content => {
            const title = content.header.title;
            return RE.test(title)
          })
          .map(content => new PostSearchResult(content));
      methods.deployResult(results);
    }
  },
  deployResult(results: Array<PostSearchResult>) {
    const map: Map<string, PostSearchResult[]> = grouping<string, PostSearchResult>(results, (result)=> {
      const node = postContentStore.get(result.content.path)!;
      return node.group;
    })

    const keys = [...groups.value.keys()];
    // clonedArray: Map<string, PostSearchGroup> = 기존 검색 결과
    // map: Map<string, PostSearchResult[]> = 신규 검색 결과
    keys.forEach(key => {
      // 기존 검색결과 와 같은 그룹이라면 업데이트
      if (map.has(key)) {
        const newResult = map.get(key) ?? []
        map.delete(key)
        const oldResult = groups.value.get(key)
        oldResult?.update(newResult)

        if (oldResult?.results.length == 0) {
          groups.value.delete(key)
        }
        return
      }
      // 기존 그룹에있지만, 신규 결과에서 그룹이 없는 경우
      else {
        // console.log('old key delete:', key)
        // const beFinalize = groups.value.get(key)
        // beFinalize?.finalizeAllChild()
        groups.value.delete(key)
      }
    })

    //기존에 그룹에는 없고, 신규 결과에서 그룹이 있는경우
    const newKeys = [...map.entries()]
    newKeys.forEach(([key, value]) => {
      const group = new PostSearchGroup(key, value)
      groups.value.set(key, group)
      group.updateNewer()
    });

    const array = [...groups.value.values()]
    searchLocationPair.value = array.map(val => val.results.map((res, idx) => new Pair<string, number>(val.icon, idx)))
        .flat()
    currentLocationIndex.value = 0

    // const status = array.map(group => `\n(${group.results.length}) ${group.icon}\n${group.results.map((re, i) => `\t[${re.status}]${++i}. ${re.content.header.title}`).join('\n')}`).join('\n')
    // console.debug(status)
  },
  selectResult(index: number) {
    const length = searchLocationPair.value.length
    //검색 결과가 없다면,
    if (length === 0) {
      currentLocationIndex.value = 0
      return
    }
    const cIndex = currentLocationIndex.value
    const pair = searchLocationPair.value[cIndex]
    //DOWN
    const currentTarget = groups.value.get(pair.left)?.results[pair.right]

    // 검색 결과 중 첫번째 요소가 아직 선택되지 않았다면 선택 처리
    if (cIndex === 0 && ! currentTarget?.isSelected){
      currentTarget?.selected(true)
      return
    }
    //0: Arrow down, 1: arrow up
    const nextIndex = (index == 0)
        ? cIndex +1 > length-1 ? length-1 : cIndex +1
        : cIndex -1 < 0 ? 0 : cIndex -1

    const nextPair = searchLocationPair.value[nextIndex]
    currentTarget?.selected(false)

    const nextTarget = groups.value.get(nextPair.left)?.results[nextPair.right]
    nextTarget?.selected(true)
    currentLocationIndex.value = nextIndex
  },
  moveToSelectedPost() {
    const cIndex = currentLocationIndex.value
    const pair = searchLocationPair.value[cIndex]
    //DOWN
    const currentTarget = groups.value.get(pair.left)?.results[pair.right]
    if (currentLocationIndex.value === 0 && ! currentTarget?.isSelected) {
      return
    }

    router.push(currentTarget?.content.path ?? '')
    currentLocationIndex.value = 0;
    const input = searchInput.value as HTMLInputElement;
    input.value = '';
    searchStatusStore.cancelSearch();
  }
}

onMounted(() => {
  searchInput.value?.focus();
})
</script>
