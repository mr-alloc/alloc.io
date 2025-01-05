<template>
  <ul class="space-y-1 hidden lg:block">
    <li v-for="(child, index) in headlines" :key="child.fragment" class="space-y-1 hidden lg:block" :class="{
       'ml-3': props.isInner
    }">
      <a class="block text-sm/6 truncate"
         :href="`#${child.fragment}`"
         :class="scrollspy.activeHeadings.includes(decodeURIComponent(child.fragment)) ? config.active : config.inactive"
         @click.prevent="scrollToHeading(child.fragment)"
      > {{ child.title }}</a>
      <TableOfContents  v-if="props.headline.children.length > 0" :headline="props.headline.children[index]" :is-inner="true" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import TocNode from "@/classes/implement/toc-node";
import TableOfContents from "@/components/layout/content/TableOfContents.vue";
import {useScrollspy} from "@/store/scroll-spy";
import {useNuxtApp} from "nuxt/app";

const router = useRouter();
const scrollspy = useScrollspy();
const props = defineProps<{
  headline: TocNode,
  isInner: boolean,
}>();
const fragmentRE = /([^:]+)(?:::([\s\S]+))?/mg;
const config = {
  wrapper: 'space-y-1',
  base: 'block text-sm/6 truncate',
  active: 'text-primary',
  inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  depth: 'ml-3'
}
const headlines = computed(() => {
  return Array.of(...props.headline?.children ?? [])
      .map(child => methods.parseHeadline(child.title))
      .map(([title, fragment]) => ({title, fragment}));
});
const emit = defineEmits(['move']);
const scrollToHeading = (id: string) => {
  router.push(`#${id}`)
  emit('move', id)
};

const methods = {
  parseHeadline(headline: string): [string, string] {
    const executed = fragmentRE.exec(headline);
    fragmentRE.lastIndex = 0;

    const title = executed?.[1] ?? '';
    const fragment = executed?.[2] ?? '';

    return [title, fragment];
  }
}
</script>

<style lang="scss" scoped>

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
