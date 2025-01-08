<template>
  <nav :class="noWrapper ? '' : ui.wrapper">
    <div :class="[headline ? ui.container.base : ui.container.empty]">

      <slot name="top" />

      <button class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group" tabindex="-1">
        <span class="text-sm/6 truncate sm:block block lg:hidden font-bold">{{ scrollspy.representationTitle ?? props.title }}</span>

        <span class="font-semibold text-sm/6 truncate sm:hidden hidden lg:block">Table Of Contents</span>

        <span class="iconify i-ph:caret-down lg:!hidden ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90" aria-hidden="true"></span>
      </button>


      <TableOfContents :headline="props.headline as TocNode" :is-inner="false" />

      <slot name="bottom" />
    </div>
  </nav>
</template>
<script setup lang="ts">
import TableOfContents from "@/components/layout/content/TableOfContents.vue";

import type TocNode from "@/classes/implement/toc-node";
import {useScrollspy} from "@/store/scroll-spy";
import Pair from "@/classes/implement/pair";

const appConfig = useAppConfig();
const scrollspy = useScrollspy();

const props = defineProps<{
  headline: TocNode | undefined,
  noWrapper: boolean,
  title: string
}>();


const ui = computed(() => ({
  wrapper: 'sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]',
  container: {
    base: 'py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3',
    empty: 'lg:py-8 space-y-3'
  },
  button: {
    base: 'flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group',
    label: 'font-semibold text-sm/6 truncate',
    // trailingIcon: {
    //   name: appConfig.ui.icons.chevron,
    //   base: 'w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5',
    //   active: 'text-gray-700 dark:text-gray-200',
    //   inactive: 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90'
    // }
  },
}));
</script>
