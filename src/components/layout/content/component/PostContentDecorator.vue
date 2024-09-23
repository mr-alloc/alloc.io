<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import MarkdownIt from "markdown-it";
import DecoratorProvider from "@/markup/decorator/DecoratorProvider";
import RuleType from "@/markup/constant/RuleType";

const props = defineProps<{
  metadata: PostMetadata
}>();

const html = ref('');
onMounted(() => {
  const markdown = props.metadata.content;
  const markdownIt = new MarkdownIt();

  DecoratorProvider.provide(RuleType.BLOCK_QUOTE).decorate(markdownIt);
  DecoratorProvider.provide(RuleType.HEADLINE).decorate(markdownIt);

  html.value = markdownIt.render(markdown);
});
</script>

<style lang="scss">
@import "@styles/index";
@import "@styles/markup";
@import '@styles/languages';
@import '@styles/icons';


.headline-wrapper {
  margin: 60px 0 20px;
  padding: 10px 0;
  border-bottom: 1.22px solid $point-light-color;
  color: #2d3235;

  &:before {
    transition: .6s;
    position: absolute;
    opacity: 1;
    font-size: 2rem;
  }

  &:hover {

    &:before {
      opacity: 1;
    }
  }
}


.key-mac {
  code {
    color: #393d43;
    background: linear-gradient(-225deg,#d5dbe4,#f8f8f8);
    box-shadow: inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);
  }
}
.key-win {
  code {
    border-radius: unset;
    background: linear-gradient(-225deg,#d5dbe4,#f8f8f8);
    box-shadow: inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);
  }
}

pre {
  overflow: auto;
  border-radius: 15px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,Liberation Mono, monospace !important;

  code {
    border: none;
    color: #fff;
    background-color: transparent;

  }

}

hr {
  margin: 30px 0;
}
.array {
  margin: 20px 0;
  text-align: center;

  span {
    width: 25px;
    height: 25px;
    color: #666;
    display: inline-block;
    text-align: center;
    border: 1px solid #e6e6e6;

    &.over {
      background-color: lightgray;
    }

    &.current {
      background-color: pink;
    }

    &.target {
      background-color: green;
      color: white;
    }
  }
}
img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
  cursor: zoom-in;
}

blockquote {
  padding: 0px 10px;
  margin: 20px 0px 50px;
  color: #004085;
  background-color: #cce5ff;
  border: 1px #b8daff solid;
  border-radius: 6px;

  p {
    margin: 0;
  }
}

table.case-table {

  th, td {
    border: none;
    padding-bottom: 20px;
  }
  th {
    width: 100px;
    vertical-align: top;

    .case-head {
      border: 2px solid #d0d7de;
      border-radius: 10px;
      padding: 2px 5px;
    }
  }
  td {
    padding-top: 0px;
  }
  tr {
    border: none;
  }
}

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

.post-content pre, .post-content pre[class*=language-] {
  line-height: 1.4 !important;
  padding: 1.3rem 1.5rem;
  margin: 0.85rem 0;
  border-radius: 6px;
  overflow: auto;
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
