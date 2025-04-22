<template>
  <div class="search-result-row flex flex-row text-gray-600 dark:text-gray-50 hover:text-primary-600 hover:dark:text-primary-400 duration-300">
    <div class="flex shrink-0 justify-center pt-4 mx-4 w-14">
      <span class="iconify text-2xl" :class="`i-ph:${props.row.icon}`"/>
    </div>
    <div class="grow w-full py-0.5">
      <ul class="list-none">
        <li class="py-2 px-1 my-1 mx-0.5 rounded-md cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800 duration-300"
            :class="[`${result.status}`, { select: result.isSelected}]"
            v-for="result in props.row.results"
            :key="result.contentPath"
            v-on:click="goTo(result.content.path)">
          <div class="text-gray-600 dark:text-gray-50">
            <span class="text-inherit font-bold">{{ result.content.header.title }}</span>
          </div>
          <div class="text-slate-600 text-xs">
            <ul class="flex">
              <li v-if="result.content.header.layout === 'post'" class="flex items-center" v-for="(crumb, index) in result.content.header.breadcrumbs">
                <span>{{ crumb }}</span>
                <span class="iconify i-ph:caret-right flex-shrink-0 rtl:rotate-180 w-4 h-4"
                      v-if="index < result.content.header.breadcrumbs.length -1"
                      aria-hidden="true" role="presentation"></span>
              </li>
              <li v-else-if="result.content.header.layout === 'wiki'">
                <span>위키</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PostSearchGroup} from "@/classes/implement/post-search-group";
import {useRouter} from "vue-router";
import {useSearchStatusStore} from "@/store/search-status-store";
import {usePostContentStore} from "@/store/post-content-store";

const router = useRouter()
const postContentStore = usePostContentStore();
const searchStatus = useSearchStatusStore()
const props = defineProps<{
  row: PostSearchGroup
}>();

const goTo = (path: Path) => {
  const value = postContentStore.isWiki(path.last)
      ? `/wiki/${path.last}`
      : path.value;
  router.push(value)
  searchStatus.cancelSearch()
}
</script>
