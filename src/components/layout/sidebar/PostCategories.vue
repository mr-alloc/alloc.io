<script setup lang="ts">

import {usePostContentStore} from "@/store/PostContentStore";
import {useCategoriesStore} from "@/store/CategoriesStore";
import type ICategoryNode from "@/classes/ICategoryNode";
import {ref} from "@vue/reactivity";
import CategoryContent from "@/classes/implement/CategoryContent";
import CategoryGroup from "@/classes/implement/CategoryGroup";
import {CategoryAlias} from "@/classes/constant/CategoryAlias";

const postContentStore = usePostContentStore();
const categories = ref<Array<ICategoryNode>>(new Array<ICategoryNode>());

function findOrCreateGroup(existingGroups: Array<ICategoryNode>, newGroups: Array<string>, depth: number): CategoryGroup {
  const currentGroup = newGroups[depth];
  const found = existingGroups.find(exist => exist.isDirectory && exist.name === currentGroup);
  //존재하지 않는 경우 생성
  if (!found) {
    const newGroup = new CategoryGroup(true, currentGroup);
    existingGroups.push(newGroup);
    if (newGroups.length -1 === depth) {
      return newGroup;
    }
    return findOrCreateGroup(newGroup.children, newGroups, depth +1);
  }

  const exist = found as CategoryGroup;
  //마지막 인덱스인경우 찾았으므로 처리
  if (newGroups.length -1 === depth) {
    return exist;
  }

  return findOrCreateGroup(exist.children, newGroups, depth +1);
}

onMounted(() => {
  const contents = postContentStore.values()
      .filter(post => post.header.layout === 'post');

  contents.forEach(post => {
    const foundGroup = findOrCreateGroup(categories.value, post.header.categories, 0);
    foundGroup.addChild(new CategoryContent(false, post.header.title, post.path))
  });

})

const ui = {
  icon: {
    default: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700 group-hover:bg-primary group-hover:ring-primary group-hover:text-background',
    active: 'rounded-md p-1 inline-flex ring-inset ring-1 bg-primary ring-primary text-background',
    wrapper: 'flex items-center gap-1.5 lg:gap-2 group text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium'
  },
}
</script>

<style scoped lang="scss">

</style>
<template>
  <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4">
    <div class="relative">
      <div class="space-y-3 mb-3 lg:mb-6 -mx-1 lg:mx-0 select-none">
        <div :class="ui.icon.wrapper"
             v-for="category in categories.filter(cat => cat.isDirectory) as Array<ICategoryNode>"
             :key="category.name">
          <div :class="ui.icon.default">
            <span :class="`iconify i-ph:${CategoryAlias.find(category.name).name} w-4 h-4 flex-shrink-0`" aria-hidden="true"></span>
          </div>
          <span class="text-sm/6 relative">{{ CategoryAlias.find(category.name).alias }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>
