<script setup lang="ts">

import {usePostContentStore} from "@/store/post-content-store";
import type ICategoryNode from "@/classes/i-category-node";
import CategoryContent from "@/classes/implement/category-content";
import CategoryGroup from "@/classes/implement/category-group";
import PostCategoryTree from "@/components/layout/sidebar/PostCategoryTree.vue";
import DocumentType from "@/classes/constant/document-type";
import {useCategoriesStore} from "@/store/category-store";
import type {PostMetadata} from "@/classes/implement/PostMetadata";

const props = defineProps<{
  path: string
}>();
const findPost = (path: string) => {
  const found = postContentStore.get(path);
  if (!found) throw createError({ status: 404, message: 'Not Found for post.' });
  return found;
}
const route = useRoute()
const postContentStore = usePostContentStore();
const post = ref<PostMetadata>(findPost(route.path));
const categoryTree = ref<Array<ICategoryNode>>([]);
watch(() => route.path, (n, o) => {
  post.value = findPost(n);
  categoryTree.value = postContentStore.values(DocumentType.POST)
      .filter(post => post.hasCategories)
      .filter(post => post.isPublic)
      .reduce((tree, post) => {
        const foundGroup = findOrCreateGroup(tree, post.header.categories, 0);
        foundGroup.addChild(new CategoryContent(false, post.header.title, post.path));
        return tree;
      }, new Array<ICategoryNode>());
}, { immediate: true, deep: true });

function findOrCreateGroup(existingGroups: Array<ICategoryNode>, categories: Array<string>, depth: number): CategoryGroup {
  const currentGroup = categories[depth];
  const found = existingGroups.find(exist => exist.isDirectory && exist.name === currentGroup);
  //존재하지 않는 경우 생성
  if (!found) {
    const isActive = post.value.header.categories.length > depth && post.value.header.categories[depth] === currentGroup;
    const newGroup = new CategoryGroup(true, currentGroup, !isActive);
    existingGroups.push(newGroup);
    if (categories.length -1 === depth) {
      return newGroup;
    }
    return findOrCreateGroup(newGroup.children, categories, depth +1);
  }

  const exist = found as CategoryGroup;
  //마지막 인덱스인경우 찾았으므로 처리
  if (categories.length -1 === depth) {
    return exist;
  }

  return findOrCreateGroup(exist.children, categories, depth +1);
}

const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700 group-hover:bg-primary group-hover:ring-primary group-hover:text-background',
    active: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-primary ring-primary text-background',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium cursor-pointer'
  },
}
</script>
<template>
  <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4">
    <div class="relative">
      <ul class="m-0">
        <PostCategoryTree :categories="categoryTree" :groups="post.header.categories" :depth="0" :path="post.path"/>
      </ul>
    </div>
  </aside>
</template>
