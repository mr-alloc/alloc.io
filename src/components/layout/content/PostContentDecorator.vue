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

const html = useState(route.path, () => {
  const markdown = props.metadata.content;
  const md: MarkdownIt = nuxtApp.$md as MarkdownIt;

  return md.render(markdown);
});


onMounted(() => {

  prepareStore.prepare();

  const tables = [...document.querySelectorAll('.rendered-markdown-wrapper table').values()]
  tables.forEach(table => {
    const div = document.createElement('div')
    div.innerHTML = table.outerHTML
    div.className = 'content-table'

    table.parentNode?.insertBefore(div, table)
    table.remove();
  });

  const imageTags = document.querySelectorAll('.rendered-markdown-wrapper img')
  imageTags.forEach((imgTag, index) => {
    imgTag.addEventListener('click', (e) => {
      photoViewStore.open(index +1)
    });
  });

  photoViewStore.load(props.metadata.header.images);


  //콘솔로그를 찍기위해 CSR에서 테스트
  // const markdown = props.metadata.content;
  // const md: MarkdownIt = nuxtApp.$md as MarkdownIt;
  //
  // html.value = md.render(markdown);
});

</script>

<style lang="scss">
@import "@styles/index";
@import "@styles/markup";
@import '@styles/languages';
@import '@styles/icons';

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
