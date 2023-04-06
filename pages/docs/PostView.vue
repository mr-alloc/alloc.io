<template>
  <div class="post-container" :class="{prepare : preparePost}">
    <div class="not-found" v-show="post === null">
      <NotFound />
    </div>
    <div class="post-area" v-show="post !== null">
      <div class="post-title-area">
        <span class="title" id="post-title">{{ post.title }}</span>
        <div class="post-intro">
          <div class="reported-date">
            <font-awesome-icon class="clock-icon" :icon="['fa', 'clock']"/>
            <span class="date-text" id="post-date-text">{{ post.date }}</span>
          </div>
        </div>
      </div>
      <div class="post-content-wrapper" id="document-content">
        <div class="post-content" id="post-content-frame" v-html="post.content">
        </div>
        <TagArea :tags="post.tags" />
        <div class="zoom-in-image-wrapper" @click="zoomOut()" v-show="data.zoom_in.isActive">
          <div class="image-resizer">
            <img :src="data.zoom_in.imageLink">
          </div>
        </div>
      </div>
    </div>
    <div class="zoom-image-aria" :class="{zoom : data.zoom_in.isActive}"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  setPageTitle
} from "~/utils/settingUtils";
import {
  fileListStore,
  postMapStore
} from "~/store";
import NotFound from "~/components/layout/content/NotFound.vue";
import TagArea from "~/components/layout/content/component/post-card/TagArea.vue";
import { useRoute } from "vue-router";
import { PostContent } from "~/class/implement/PostContent";
import {PagePost} from "~/class/implement/PagePost";

const route = useRoute();
const path = route.fullPath
const postMeta: PostContent = postMapStore.map.get(path)
const pagePost: PagePost | null = PagePost.of(postMeta)

if (pagePost) {
  setPageTitle(pagePost.title)
}
const preparePost = ref(true)

setTimeout(() => {
  preparePost.value = false
}, 200)

const post = ref(pagePost)
const data = {
  is_code_popup: false,
  image_map: new Map(),
  code_map: new Map(),
  zoom_in: {
    isActive: false,
    imageLink: ''
  },
  fileListStore,
  postMapStore
}

const components = {
  NotFound,
  TagArea
}

const zoomOut = () => {
  if(data.zoom_in.isActive) {
    data.zoom_in.isActive = false

    const popup = document.querySelector('.popup')

    if(popup) {
      popup.classList.remove('popup')
    }
  }
}
const clickedContent = (e: Event) => {
  // if(e && e.target instanceof Element) {
  //   const target: Element = e.target
  //   const nodeName = target.nodeName
  //   console.log('clicked node name:',nodeName)
  //   switch (nodeName) {
  //     case 'IMG': {
  //       const src = target.src
  //       if (data.image_map.size == 0) {
  //         const postContent: HTMLElement | null = document.getElementById('document-content')
  //         if(postContent){
  //           const images = postContent.querySelectorAll('.post-content img')
  //
  //           images.forEach(value => {
  //             data.image_map.set(src, value)
  //           })
  //         }
  //       }
  //
  //       if ( ! data.image_map.has(src)) {
  //         data.image_map.set(src, e.target)
  //       }
  //
  //       break
  //     }
  //     case 'PRE': {
  //       const code = e.target.offsetParent
  //       code.classList.add('popup')
  //       data.zoom_in.isActive = true
  //
  //       break
  //     }
  //     default:
  //       break
  //   }
  // }
}

</script>

<style lang="scss">
@import '@/styles';


.post-container {
  padding: $pc-header-interval 0px;
  min-height: 700px;

  &.prepare {
    margin-left: 60px;
    opacity: 0.1;
  }

  .post-explorer {
    padding: 5px 3px;
    color: #2c3e50;
    font-size: 1.4rem;
    margin: 40px auto;
    max-width: 786px;
    word-break: break-word;

    & span {

      &:nth-child(n+2):before {
        content: '>';
        margin: 0px 30px;
      }
    }
  }
  .post-area {
    max-width: 768px;
    background-color: $main-light-color;
    border: 1.29px solid #d3d1d1;
    margin: 0 auto;
    border-radius: 15px;
    color: #344063;

    .post-title-area {
      background: url("/assets/images/title_background.jpg") center;
      background-size: cover;
      height: 200px;
      display: table;
      width: 100%;
      border-radius: 14px 14px 0 0;
      position: relative;

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        content: '';
        border-radius: 14px 14px 0 0;
      }

      .title {
        text-shadow: #000000 0px 0px 7px;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        background-color: transparent;
        text-decoration: none;

        font-size: 1.5em;
        transition: color .3s ease;
        font-weight: 600;
        color: white !important;
      }
      .post-intro {
        position: absolute;
        display: flex;
        left: 0px;
        width: 100%;
        height: 100%;
        flex-direction: row-reverse;
        align-items: flex-end;

        .reported-date {
          float: right;
          font-size: .92rem;
          margin-bottom: 7px;

          .clock-icon {
            color: #b7b4b4;
          }

          .date-text {
            margin: 0px 10px;
            color: white;
          }
        }
      }
    }

    .post-content-wrapper {
      margin: 40px auto;
      padding: 0px 50px;

      .post-content {
        min-height: 300px;
        word-break: break-word;
        font-weight: 400;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #666;
        //
        //&.hide {
        //  height: 400px;
        //  overflow: hidden;
        //}

        a {
          color: #2997ff;
          font-weight: bold;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0px;

          thead {
            border-bottom: 1px solid #d0d7de;
          }

          th {

          }

          th, td {
            box-sizing: border-box;
            padding: 3px 5px;
          }
        }

        p {
          margin: 7px 0px;
          line-height: 30px;
          width: 100%;
        }

        ul, ol {
          padding: 0 20px;
          margin-bottom: 20px;


          li {
            line-height: 25px;
          }
        }

        & h1, h2, h3, h4 {
          margin: 60px 0px 20px;
          padding: 10px 0px;
          border-bottom: 1.22px solid $point-light-color;
          color: #24238f;
        }

        h4 {
          font-size: 1em;
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

        code {
          background-color: rgba(175,184,193,0.2);
          border-radius: 6px;
          padding: 0.082em 0.5em;
          word-break: break-word;
          font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,Liberation Mono, monospace !important;
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

        //== Java ==//
        .language-java {

          .annotation {
            color: #cccc20;
          }

          .constant {
            color: #9c6b9d;

          }

          .keyword {
            color: #7171af;
            font-weight: 500;
          }

          .string {
            color: #4db46d;
          }

          .class-name:hover {
            color: #5cbdfb;
            text-decoration: underline #5cbdfb;
            text-shadow: 0 0 3vw #8298e3;
            transition: 0s;
          }
        }

        //== Swift ==//
        pre.language-swift {

          .operator {
            color: #67cdcc;
          }

          .keyword {
            color: #cc99cd;
            font-weight: 500;
          }

          .number {
            color: #8181f3;
          }

          .string-literal {
            color: #7ec699;
          }

          .interpolation {
            color: white;
          }

          .interpolation-punctuation {
            color: #f08d49;
          }

          .function {
            color: #f08d49;
          }
        }
      }

      .hide-box {
        height: 300px;
        background: linear-gradient(to top, #fcfcfc, rgba(252, 252, 252, .9), rgba(252, 252, 252, 0));
        box-sizing: content-box;
        position: relative;
        top: -300px;
      }

      .zoom-in-image-wrapper{
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        background: rgb(0 0 0 / 80%);
        cursor: zoom-out;
        justify-content: center;
        align-items: center;
        z-index: 113;

        .image-resizer {
          width: 700px;
          background-color: black;

          img {
            height: 100%;
          }
        }
      }

      .post-tag {
        margin: 30px 0px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        font-size: .82rem;

        .tag-icon {
          color: #a83234;
          font-size: 20px;
          margin: 4px 6px;
        }

        .tag {
          background-color: #b7b4b4;
          border-radius: 7px;
          padding: 2px 12px;
          color: white;
          margin: 4px 6px;
          box-sizing: border-box;
          height: 20px;
          display: table-cell;


          &:hover, :active {
            background-color: #2855ab;
            transition: 0.1s;
          }
        }
      }

    }
  }
}

@include tablet {
  .post-container {
    padding: 0px;

    .post {
      max-width: 100%;
      margin: 40px auto;
    }

    .post-area {
      width: 100%;
      border: none;

      .post-title-area {
        border-radius: 0px;

        &:before {
          border-radius: 0;
        }
      }

      .post-content-wrapper {
        padding: 0px 15px;

        .post-content {

          img {
            max-width: 70%;
          }

          pre {

            code {
              font-size: 0.8rem;
            }
          }
          .popup {

          }
        }

        .zoom-in-image-wrapper {

          .image-resizer {
            width: 80%;
          }
        }
      }
    }
  }
}

@include mobile {
  .post-container {
    padding: 0px;


    .post-area {
      width: 100%;
      border-radius: 0px;

      .post-title-area {
        border-radius: 0px;

        .title {
          padding: 0px 10px;
        }


        &:before {
          border-radius: 0;
        }
      }

      .post-content-wrapper {
        padding: 0px 15px;


        .post-intro {
          font-size: .92rem;
        }

        .post-content {

          img {
            max-width: 100%;
          }
        }

        .zoom-in-image-wrapper {

          .image-resizer {
            width: 100%
          }
        }
      }
    }
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
    border-right: 1px solid $linear-color;
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
  -moz-tab-size: 4;
  -o-tab-size: 4;
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
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;


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
.dark .post-container {

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
