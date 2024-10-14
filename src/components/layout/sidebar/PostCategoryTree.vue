<script setup lang="ts">

import type ICategoryNode from "@/classes/ICategoryNode";
import {CategoryAlias} from "@/classes/constant/CategoryAlias";
import type CategoryGroup from "@/classes/implement/CategoryGroup";
import type CategoryContent from "@/classes/implement/CategoryContent";

const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700 group-hover:bg-primary group-hover:ring-primary group-hover:text-background',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium cursor-pointer duration-300'
  }
}

defineProps<{
  categories: Array<ICategoryNode>,
  groups: Array<string>,
  depth: number
}>();

function moveTo(path: string) {
  useRouter().push(path)
}
</script>
<template>
  <li class="space-y-3 mb-2 lg:mb-3 mx-1 lg:mx-0 select-none list-none"
      v-for="category in categories as Array<ICategoryNode>"
      :key="category.name">
    <div :class="ui.icon.wrapper" v-if="category.isDirectory">
      <div :class="[ui.icon.default, { 'rounded-md p-1 inline-flex ring-inset ring-1 bg-primary ring-primary text-background' : groups && groups.length > depth && groups[depth] === category.name }]">
        <span :class="`iconify i-ph:${CategoryAlias.find(category.name).name} w-4 h-4 flex-shrink-0`" aria-hidden="true"></span>
      </div>
      <span class="text-sm/6 relative">{{ CategoryAlias.find(category.name).alias }}</span>
    </div>
    <ul v-if="category.isDirectory" class="ml-6 mt-0">
      <PostCategoryTree :categories="(category as CategoryGroup).children" :groups="groups" :depth="depth +1" />
    </ul>
    <a v-else class="ml-1.5 hover:underline cursor-pointer" :href="(category as CategoryContent).path" @click.prevent="moveTo((category as CategoryContent).path)">
      <span class="text-xs">{{ category.name }}</span>
    </a>
  </li>
</template>
