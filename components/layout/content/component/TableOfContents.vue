<template>
    <li v-for="child in props.headlines.children" :key="child.fragmentId">
      <span :class="`headline-${child.grade}`">{{ child.title }}</span>
      <ul v-if="child.children">
        <TableOfContents :headlines="child" />
      </ul>
    </li>
</template>

<script lang="ts" setup>
import {TocNode} from "~/class/implement/TocNode";
import TableOfContents from "~/components/layout/content/component/TableOfContents.vue";
const components = {
  TableOfContents
}
const props = defineProps({
  headlines: TocNode
})
</script>

<style scoped>

</style>
