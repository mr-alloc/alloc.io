<script setup lang="ts">

import type ICategoryNode from "@/classes/ICategoryNode";
import {CategoryAlias} from "@/classes/constant/CategoryAlias";
import type CategoryGroup from "@/classes/implement/CategoryGroup";
import type CategoryContent from "@/classes/implement/CategoryContent";
import {toValueMap} from "@/utils/CollectionUtil";
import {useRouter} from "vue-router";

const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 group-hover:bg-primary group-hover:ring-primary group-hover:text-background',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group hover:text-gray-700 dark:hover:text-gray-200 font-medium cursor-pointer duration-300',
    active: 'bg-primary ring-primary text-background dark:bg-primary dark:ring-primary dark:text-background',
    inactive: 'bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700'
  }
}
const router = useRouter();
const props = defineProps<{
  categories: Array<ICategoryNode>,
  groups: Array<string>,
  depth: number,
  path: string
}>();
const isRange = props.groups && props.groups.length > props.depth;
const group = props.groups[props.depth];
const collapseGroup = ref((() => {
  const directories = props.categories?.filter(cat => cat.isDirectory)
      .map(cat => cat as CategoryGroup);
  return toValueMap<CategoryGroup, string, boolean>(directories, cat => cat.name, cat => cat.isCollapse);
})())

function moveTo(path: string) {
  router.push(path);
}

function collapseCategory(category: CategoryGroup) {
  if (collapseGroup.value.has(category.name)) {
    collapseGroup.value.set(category.name, !collapseGroup.value.get(category.name)!);
  }
}
</script>
<template>
  <li class="space-y-2 mx-1 lg:mx-0 select-none list-none"
      :class="{ 'mb-2 lg:mb-3': groups.length-1 === depth }"
      v-for="category in categories as Array<ICategoryNode>"
      :key="category.name">
    <a :class="[ui.icon.wrapper, isRange && group === category.name ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400']" v-if="category.isDirectory" role="button"
       @click.prevent="collapseCategory(category as CategoryGroup)">
      <div :class="[ui.icon.default, isRange && group === category.name ? ui.icon.active : ui.icon.inactive]">
        <span :class="`iconify i-ph:${CategoryAlias.find(category.name).name} w-4 h-4 flex-shrink-0`" aria-hidden="true"></span>
      </div>
      <span class="text-sm/6 relative">{{ CategoryAlias.find(category.name).alias }}</span>
    </a>
    <ul v-if="category.isDirectory" class="ml-6 mt-0 text-slate-600 duration-300 overflow-hidden" :class="{ 'h-0 my-0': collapseGroup.has(category.name) && collapseGroup.get(category.name)! }"
    >
      <PostCategoryTree :categories="(category as CategoryGroup).children" :groups="groups" :depth="depth +1" :path="path" />
    </ul>
    <a v-else class="ml-1.5 hover:underline cursor-pointer"
       :href="(category as CategoryContent).path" @click.prevent="moveTo((category as CategoryContent).path)">
      <span class="text-xs text-gray-500 dark:text-gray-400" :class="{ 'font-bold text-primary-500 dark:text-primary-400': path === (category as CategoryContent).path }">{{ category.name }}</span>
    </a>
  </li>
</template>
