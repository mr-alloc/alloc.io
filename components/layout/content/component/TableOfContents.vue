<template>
  <ul>
    <li v-for="child in props.headline.children" :key="child.fragmentId">
      <a :href="'#' + child.fragmentId"> {{ child.title }}</a>
      <TableOfContents  v-if="child.children.length > 0" :headline="child" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {TocNode} from "~/class/implement/TocNode";
import TableOfContents from "~/components/layout/content/component/TableOfContents.vue";
import {onMounted} from "vue";
const components = {
  TableOfContents
}
const props = defineProps({
  headline: TocNode
})
</script>

<style lang="scss">
@import "@/styles";

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
