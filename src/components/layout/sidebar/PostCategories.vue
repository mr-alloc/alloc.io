<script setup lang="ts">

import {usePostContentStore} from "@/store/post-content-store";
import type ICategoryNode from "@/classes/ICategoryNode";
import CategoryContent from "@/classes/implement/CategoryContent";
import CategoryGroup from "@/classes/implement/CategoryGroup";
import PostCategoryTree from "@/components/layout/sidebar/PostCategoryTree.vue";
import DocumentType from "@/classes/constant/document-type";
import {useCategoriesStore} from "@/store/category-store";

const categoriesStore = useCategoriesStore();
const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700 group-hover:bg-primary group-hover:ring-primary group-hover:text-background',
    active: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-primary ring-primary text-background',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium cursor-pointer'
  },
}
const props = defineProps<{
  groups: Array<string>,
  path: string
}>();
</script>
<template>
  <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4">
    <div class="relative">
      <ul class="m-0">
        <PostCategoryTree :categories="categoriesStore.categoryTree" :groups="groups" :depth="0" :path="path"/>
      </ul>
    </div>
  </aside>
</template>
