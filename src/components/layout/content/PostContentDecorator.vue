<template>
  <div class="rendered-markdown-wrapper" v-html="html"></div>
</template>
<script setup lang="ts">
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import MarkdownIt from "markdown-it";
import {usePagePrepareStore} from "@/store/PreparePostStore";
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";

const photoViewStore = usePhotoViewStatusStore();
const prepareStore = usePagePrepareStore();
const nuxtApp = useNuxtApp();
const route = useRoute();
const props = defineProps<{
  metadata: PostMetadata
}>();

const html = computed(() => {
  const md: MarkdownIt = nuxtApp.$md as MarkdownIt;
  return md.render(props.metadata.content);
});


onMounted(() => {
  prepareStore.prepare();
  photoViewStore.load(props.metadata.header.images);
});
</script>

<style lang="scss">
@use "@styles/index" as *;
@use "@styles/markup" as *;
@use '@styles/languages' as *;
@use '@styles/icons' as *;

div[class*=language-].line-numbers-mode pre {
  margin-left: $code-ln-wrapper-width;
  padding-left: 1rem;
  vertical-align: middle;
}

div[class*=language-].line-numbers-mode {

  .line-numbers-wrapper {
    position: absolute;
    top: 0;
    width: $code-ln-wrapper-width;
    text-align: center;
    padding-top: 1.25rem;
    counter-reset: line-number;
    line-height: 1.4;

    .line-number {
      position: relative;
      user-select: none;
      color: #999;

      &:before {
        counter-increment: line-number;
        content: counter(line-number);
        font-size: .85em;

      }
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: $code-ln-wrapper-width;
    height: 100%;
    border-radius: 6px 0 0 6px;
    border-right: 1px solid #777777;
  }
}


div[class*=language-] .highlight-lines {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding-top: 1.3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 1.4;
}

div[class*=language-].line-numbers-mode .highlight-lines .highlighted {
  position: relative;
}

div[class*=language-] .highlight-lines .highlighted {
  background-color: #5cbdfb59;
}

</style>
