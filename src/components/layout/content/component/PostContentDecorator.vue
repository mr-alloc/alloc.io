<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import MarkdownIt from "markdown-it";
import DecoratorProvider from "@/markup/decorator/DecoratorProvider";
import RuleType from "@/markup/constant/RuleType";
import Prism from "prismjs";
import * as PrismUtils from "@/utils/prismUtils";
import escapeHtml from "escape-html";

const props = defineProps<{
  metadata: PostMetadata
}>();

const html = ref('');
onMounted(() => {
  function wrap(code: string, lang: string) {
    if(lang === 'text') {
      code = escapeHtml(code)
    }

    return `<pre class="language-${lang} code-snippet"><code>${code}</code></pre>`
  }

  function getLangCodeFromExtension (extension: string): string {
    const extensionMap = new Map<string, string>([
      ['vue', 'markup'],
      ['html', 'markup'],
      ['md', 'markdown'],
      ['rb', 'ruby'],
      ['ts', 'typescript'],
      ['py', 'python'],
      ['sh', 'bash'],
      ['yml', 'yaml'],
      ['styl', 'stylus'],
      ['kt', 'kotlin'],
      ['rs', 'rust']
    ])

    return extensionMap.get(extension) || extension
  }
  const markdown = props.metadata.content;
  const markdownIt = new MarkdownIt({
    html: true,
    xhtmlOut: true,

    highlight: (code: string, lang: string) => {
    if (!lang) {
      return wrap(code, 'text')
    }

    lang = lang.toLowerCase()
    const rawLang = lang
    lang = getLangCodeFromExtension(lang)
    if ( ! Prism.languages[lang]) {
      PrismUtils.loadLanguage(lang)
    }
    if (Prism.languages[lang]) {
      const coded = Prism.highlight(code, Prism.languages[lang], lang)
      return wrap(coded, rawLang)
    }
    return wrap(code, 'text')
  }
  });

  DecoratorProvider.provide(RuleType.BLOCK_QUOTE).decorate(markdownIt);
  DecoratorProvider.provide(RuleType.HEADLINE).decorate(markdownIt);
  DecoratorProvider.provide(RuleType.CODE_BLOCK).decorate(markdownIt);

  html.value = markdownIt.render(markdown);
});
</script>

<style lang="scss">
@import "@styles/index";
@import "@styles/markup";
@import '@styles/languages';
@import '@styles/icons';



/* Code snippet*/
div[class*=language-] {
  transition: .6s;
  position: relative;
  background-color: #2d2d2d;
  border-radius: 7px;
  box-shadow: 0 18px 22px rgba(0, 0, 0, 0.6);
  margin: 40px 0px;

  &.popup {
    transform: translate(-50%, 0%);
    position: fixed;
    left: 50%;
    top: 0%;
    width: 95%;
    max-width: 1092px;
    max-height: 95vh;
    overflow-y: scroll;
    z-index: 115;
    margin-top: 15px;

    pre {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }

}

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


div[class*=language-] pre, div[class*=language-] pre[class*=language-] {
  background: transparent!important;
  position: relative;
  z-index: 1;
}

pre[class*=language-] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

code[class*=language-], pre[class*=language-] {
  color: #ccc;
  background: none;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
.post-content pre code, .post-content pre[class*=language-] code {
  color: #fff;
  padding: 0 !important;
  background-color: transparent;
  border-radius: 0;
  overflow-wrap: unset !important;

  .comment {
    color: #a8a8a8;
  }
}

code {
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: .85em !important;
  border-radius: 3px;
  overflow-wrap: break-word !important;
  color: #3a3838;
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

/* dark mode */
.dark .post-view-container {

  .post-area {
    background-color: $main-dark-color;
    border-color: $linear-dark-color;
    color: #ffffff;



  }

  .post-content-wrapper {

    .post-content {

      h1, h2, h3, h4 {
        color: #51c470;
        border-bottom-color: $linear-dark-color !important;
      }

      div[class*=language-].line-numbers-mode:after {
        border-color: $linear-dark-color;
      }

      pre {
        border-color: $linear-dark-color;
        background-color: $main-dark-color;

        code {
          color: #ededed;
        }
      }

      img {
        filter: brightness(70%);
      }
      p {
        color: white;
      }

      code {
        color: #f7c57d;
      }

      blockquote {
        background-color: #272a3f;
        border-color: $linear-dark-color;
        color: white;
      }

      ol, ul {

        color: white;
      }

      table {
        color: white;
        thead {
          border-color: #797979;

        }
      }
    }
    .hide-box {
      background: linear-gradient(to top, #21262d, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
    }

    .post-tag {
      .tag {
        background-color: #413f3f;
      }
    }

    .zoom-in-image-wrapper {

      .image-resizer {

        img {
          filter: brightness(70%);
        }
      }
    }
  }


  /* Code Snippet */
  div[class*=language-]{
    background-color: #282c34 !important;

    .title-wrapper {
      background-color: #282c34 !important;
      color: white;

    }

  }

  .highlight-lines {

    .highlighted {
      background-color: #000000a8 !important;
    }
  }

  pre[class^=language-] {

    .keyword {
      color: #8f5ea0 !important;
    }
  }
}
</style>
