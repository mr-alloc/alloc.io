<template>
  <div class="rendered-markdown-wrapper" v-html="html"></div>
</template>
<script setup lang="ts">
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import MarkdownIt from "markdown-it";
import {usePhotoViewStatusStore} from "@/store/photo-view-store";

const photoViewStore = usePhotoViewStatusStore();
const nuxtApp = useNuxtApp();
const props = defineProps<{
  metadata: PostMetadata
}>();

const html = computed(() => {
  const md: MarkdownIt = nuxtApp.$md as MarkdownIt;
  return md.render(props.metadata.content);
});

onMounted(() => {
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


.rendered-markdown-wrapper {
  .float-left {
    float: left;
  }

  .float-right {
    float: right;
  }

  .\!h-\[39\.0625rem\] {
  height: 39.0625rem!important
  }

  .\!h-auto {
    height: auto!important
  }

  .h-0\.5 {
    height: .125rem
  }

  .h-1 {
    height: .25rem
  }

  .h-1\.5 {
    height: .375rem
  }

  .h-1\/2 {
    height: 50%
  }

  .h-1\/3 {
    height: 33.333333%
  }

  .h-2\/3 {
    height: 66.666667%;
  }

  .h-1\/4 {
    height: 25%
  }

  .h-3\/4 {
    height: 75%;
  }

  .h-1\/5 {
    height: 20%
  }

  .h-1\/6 {
    height: 16.666667%
  }

  .h-5\/6 {
    height: 83.333333%;
  }

  .h-10 {
    height: 2.5rem
  }

  .h-12 {
    height: 3rem
  }

  .h-14 {
    height: 3.5rem
  }

  .h-16 {
    height: 4rem
  }

  .h-18 {
    height: 4.5rem
  }

  .h-2 {
    height: .5rem
  }

  .h-2\.5 {
    height: .625rem
  }

  .h-20 {
    height: 5rem
  }

  .h-24 {
    height: 6rem
  }

  .h-28 {
    height: 7rem
  }

  .h-3 {
    height: .75rem
  }

  .h-3\.5 {
    height: .875rem
  }

  .h-32 {
    height: 8rem
  }

  .h-36 {
    height: 9rem
  }

  .h-4 {
    height: 1rem
  }

  .h-40 {
    height: 10rem
  }

  .h-48 {
    height: 12rem
  }

  .h-5 {
    height: 1.25rem
  }

  .h-52 {
    height: 13rem
  }

  .h-56 {
    height: 14rem
  }

  .h-6 {
    height: 1.5rem
  }

  .h-60 {
    height: 15rem
  }

  .h-64 {
    height: 16rem
  }

  .h-7 {
    height: 1.75rem
  }

  .h-72 {
    height: 18rem
  }

  .h-8 {
    height: 2rem
  }

  .h-80 {
    height: 20rem
  }

  .h-9 {
    height: 2.25rem
  }

  .h-96 {
    height: 24rem
  }

  .h-112 {
    height: 28rem
  }

  .sm\:h-80 {
    @media (min-width: 640px) {
      height: 20rem
    }
  }

  .md\:h-112 {
    @media (min-width: 768px) {
      height: 28rem
    }
  }

  .hover\:md\:zoom-image {
    @media (min-width: 768px) {
      transition: .3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .h-\[1\.375rem\] {
    height: 1.375rem
  }

  .h-\[20\.8125rem\] {
    height: 20.8125rem
  }

  .h-\[200px\] {
    height: 200px
  }

  .h-\[22rem\] {
    height: 22rem
  }

  .h-\[24\.25rem\] {
    height: 24.25rem
  }

  .h-\[2px\] {
    height: 2px
  }

  .h-\[3\.625rem\] {
    height: 3.625rem
  }

  .h-\[30\.625rem\] {
    height: 30.625rem
  }

  .h-\[31\.625rem\] {
    height: 31.625rem
  }

  .h-\[32rem\] {
    height: 32rem
  }

  .h-\[340px\] {
    height: 340px
  }

  .h-\[37\.5rem\] {
    height: 37.5rem
  }

  .h-\[395px\] {
    height: 395px
  }

  .h-\[4\.5rem\] {
    height: 4.5rem
  }

  .h-\[400px\] {
    height: 400px
  }

  .h-\[48px\] {
    height: 48px
  }

  .h-\[496px\] {
    height: 496px
  }

  .h-\[498px\] {
    height: 498px
  }

  .h-\[500px\] {
    height: 500px
  }

  .h-\[5px\] {
    height: 5px
  }

  .h-\[600px\] {
    height: 600px
  }

  .h-\[60px\] {
    height: 60px
  }

  .h-\[673px\] {
    height: 673px
  }

  .h-\[8\.75rem\] {
    height: 8.75rem
  }

  .h-\[calc\(0\.5rem\+1px\)\] {
    height: calc(.5rem + 1px)
  }

  .h-auto {
    height: auto
  }

  .h-dvh {
    height: 100dvh
  }

  .h-full {
    height: 100%
  }

  .h-lvh {
    height: 100lvh
  }

  .h-px {
    height: 1px
  }

  .h-screen {
    height: 100vh
  }

  .h-svh {
    height: 100svh
  }

  .\!max-h-\[24\.75rem\] {
    max-height: 24.75rem!important
  }

  .\!max-h-\[none\] {
    max-height: none!important
  }

  .max-h-24 {
    max-height: 6rem
  }

  .max-h-32 {
    max-height: 8rem
  }

  .max-h-40 {
    max-height: 10rem
  }

  .max-h-48 {
    max-height: 12rem
  }

  .max-h-56 {
    max-height: 14rem
  }

  .max-h-60 {
    max-height: 15rem
  }

  .max-h-64 {
    max-height: 16rem
  }

  .max-h-80 {
    max-height: 20rem
  }

  .max-h-96 {
    max-height: 24rem
  }

  .max-h-\[220px\] {
    max-height: 220px
  }

  .max-h-\[33rem\] {
    max-height: 33rem
  }

  .max-h-\[350px\] {
    max-height: 350px
  }

  .max-h-\[60vh\] {
    max-height: 60vh
  }

  .max-h-\[800px\] {
    max-height: 800px
  }

  .max-h-\[none\] {
    max-height: none
  }

  .max-h-dvh {
    max-height: 100dvh
  }

  .max-h-full {
    max-height: 100%
  }

  .max-h-lvh {
    max-height: 100lvh
  }

  .max-h-screen {
    max-height: 100vh
  }

  .max-h-svh {
    max-height: 100svh
  }

  .min-h-0 {
    min-height: 0
  }

  .min-h-24 {
    min-height: 6rem
  }

  .min-h-32 {
    min-height: 8rem
  }

  .min-h-40 {
    min-height: 10rem
  }

  .min-h-48 {
    min-height: 12rem
  }

  .min-h-64 {
    min-height: 16rem
  }

  .min-h-80 {
    min-height: 20rem
  }

  .min-h-\[220px\] {
    min-height: 220px
  }

  .min-h-\[37\.5rem\] {
    min-height: 37.5rem
  }

  .min-h-\[75dvh\] {
    min-height: 75dvh
  }

  .min-h-dvh {
    min-height: 100dvh
  }

  .min-h-full {
    min-height: 100%
  }

  .min-h-lvh {
    min-height: 100lvh
  }

  .min-h-svh {
    min-height: 100svh
  }



}
</style>
