<script setup lang="ts">

import type ICategoryNode from "@/classes/i-category-node";
import {CategoryAlias} from "@/classes/constant/category-alias";
import type CategoryGroup from "@/classes/implement/category-group";
import type CategoryContent from "@/classes/implement/category-content";
import {toValueMap} from "@/utils/collection-util";

const route = useRoute();
const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 group-hover:bg-primary group-hover:ring-primary',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group hover:text-white dark:hover:text-white font-medium cursor-pointer duration-300',
    active: 'bg-primary ring-primary text-white dark:bg-primary dark:ring-primary dark:text-background',
    inactive: 'bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700'
  }
}
const props = defineProps<{
  categories: Array<ICategoryNode>,
  groups: Array<string>,
  depth: number,
  path: string
}>();
const isRange = ref<boolean>(false);
const group = ref<string>(props.groups[props.depth]);
const collapseGroup = ref<Map<string, boolean>>(new Map<string, boolean>());


watch(() => props.path, (n, o) => {
  isRange.value = props.groups && props.groups.length > props.depth;
  group.value = props.groups[props.depth];

  const directories = props.categories?.filter(cat => cat.isDirectory)
      .map(cat => cat as CategoryGroup);
  collapseGroup.value = toValueMap<CategoryGroup, string, boolean>(directories, cat => cat.name, cat => cat.isCollapse);

}, { immediate: true });


function collapseCategory(category: CategoryGroup) {
  if (collapseGroup.value.has(category.name)) {
    collapseGroup.value.set(category.name, !collapseGroup.value.get(category.name)!);
  }
}
</script>
<template>
  <li class="space-y-2 mx-1 lg:mx-0 select-none list-none"
      :class="{ 'mb': groups.length -1 === depth }" v-for="category in categories as Array<ICategoryNode>" :key="category.name">
    <a :class="[ui.icon.wrapper, isRange && group === category.name ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400']"
       v-if="category.isDirectory" role="button" @click.prevent="collapseCategory(category as CategoryGroup)">
      <div :class="[ui.icon.default, isRange && group === category.name ? ui.icon.active : ui.icon.inactive]">
        <span :class="`iconify i-ph:${CategoryAlias.find(category.name).name} w-4 h-4 flex-shrink-0`" aria-hidden="true"></span>
      </div>
      <div class="flex text-sm/6 relative text-gray-700 dark:text-gray-200 justify-center items-center">
        {{ CategoryAlias.find(category.name).alias }}
        <span class="h-4 px-1 ml-1 bg-gray-400 dark:bg-white text-white dark:text-gray-950 text-sm/none rounded-md">
          {{ (category as CategoryGroup).childrenCount }}
        </span>
      </div>
    </a>
    <ul v-if="category.isDirectory" class="ml-6 mt-0 text-slate-600 overflow-hidden"
        :class="{ 'h-0 my-0': collapseGroup.has(category.name) && collapseGroup.get(category.name)! }">
      <PostCategoryTree :categories="(category as CategoryGroup).children" :groups="groups" :depth="depth +1" :path="path" />
    </ul>
    <NuxtLink v-else class="ml-1.5 cursor-pointer  hover:text-gray-700 dark:hover:text-gray-200 duration-300"
       :class="path === (category as CategoryContent).path || route.path === (category as CategoryContent).path ? 'font-bold text-primary-500 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'"
       :to="(category as CategoryContent).path">
      <span class="text-xs">{{ category.name }}</span>
    </NuxtLink>
  </li>
</template>
