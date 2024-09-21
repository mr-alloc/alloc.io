<template>
  <ul class="space-y-1 hidden lg:block">
    <li v-for="child in props.headline?.children" :key="child.fragmentId" class="space-y-1 hidden lg:block" :class="{
       'ml-3': props.isInner
    }">
      <a class="block text-sm/6 truncate text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
         :href="'#' + child.fragmentId"> {{ child.title }}</a>
      <TableOfContents  v-if="child.children.length > 0" :headline="child" :is-inner="true" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import TocNode from "@/classes/implement/TocNode";
import TableOfContents from "@/components/layout/content/component/TableOfContents.vue";

const props = defineProps<{
  headline: TocNode,
  isInner: boolean,
}>();
</script>

<style lang="scss" scoped>
@import "@styles/index";

.outline-link {
  color: #3c3c3cb3;
  transition: color .25s;

  &:hover, :active {
    color: #213547;
  }
}
$levels : (1, 2, 3, 4, 5);
ul {
  list-style: none;
  padding-left: 1em;

  li {
    color: var(--vt-c-text-2);
    transition: color .5s;
    line-height: 28px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
  }
}

</style>
