<template>
    <li v-for="child in props?.headline.children" :key="child.fragmentId">
      <span :class="`headline-${child.grade}`">{{ child.title }}</span>
      <ul v-if="child.children">
        <TableOfContents :headline="child" />
      </ul>
    </li>
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
onMounted(() => {
  console.log('head line: ', props?.headline)
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
