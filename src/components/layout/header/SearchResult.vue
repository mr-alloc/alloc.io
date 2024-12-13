<template>
  <div class="search-result-row flex flex-row">
    <div class="flex shrink-0 justify-center pt-4 mx-4 w-14">
      <span class="iconify text-2xl" :class="`i-ph:${props.row.icon}`"/>
    </div>
    <div class="grow w-full py-0.5">
      <ul class="list-none">
        <li class="py-2 px-1 my-1 mx-0.5 rounded-md cursor-pointer"
            :class="[`${result.status}`, { select: result.isSelected}]"
            v-for="result in props.row.results"
            :key="result.content.path"
            v-on:click="goTo(result.content.path)">
          <div class="text-black">
            <span class="text-gray-600 dark:text-gray-50 font-bold">{{ result.content.header.title }}</span>
          </div>
          <div class="text-slate-600 text-xs">
            <ul class="flex">
              <li class="flex items-center" v-for="(crumb, index) in result.content.header.breadcrumbs">
                <span>{{ crumb }}</span>
                <span class="iconify i-ph:caret-right flex-shrink-0 rtl:rotate-180 w-4 h-4"
                      v-if="index < result.content.header.breadcrumbs.length -1"
                      aria-hidden="true" role="presentation"></span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PostSearchGroup} from "@/classes/implement/PostSearchGroup";
import {useRouter} from "vue-router";
import {useSearchStatusStore} from "@/store/SearchStatusStore";

const router = useRouter()
const searchStatus = useSearchStatusStore()
const props = defineProps<{
  row: PostSearchGroup
}>();

const goTo = (path: string) => {
  router.push(path)
  searchStatus.cancelSearch()
}
</script>
