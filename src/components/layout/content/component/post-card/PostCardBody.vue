<template>
  <div class="post-preview-body">
    <div class="post-contents">
      <span class="content-text" v-html="html"></span>
    </div>
    <nuxt-link v-bind:to="props.path" v-if="props.header.layout === 'post'">
      <div class="post-default-image">
        <div class="default-image-wrapper">
          <img :src="props.header.thumbnail" alt="profile thumbnail" />
        </div>
        <div class="post-title-box">
          <span class="post-title">{{ props.header.summary }}</span>
          <span class="post-path">devis.kr</span>
        </div>
      </div>
    </nuxt-link>
    <div class="bundled-images-wrapper" v-if="props.header.layout === 'tweet' && props.header.images.length !== 0">
      <ul class="image-bundles"
          :class="[
              `for-${Math.min(props.header.images.length, 5)}-images`,
              { 'over-5-images': props.header.images.length > 5 }
              ]">
        <li v-for="(image, index) in props.header.images.slice(1, 6)" @click="methods.openImages(props.header.images, index +1)">
          <img :src="image.src" :alt="image.alt"/>
          <div class="image-count-overlay">
            <span v-if="props.header.images.length > 5" class="additional-images">+{{ props.header.images.length -5 }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/classes/implement/Header";
import Image from "@/classes/implement/Image";
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";
import MarkdownIt from "markdown-it";
import {DEFAULT_MARKDOWN_IT_OPTIONS} from "@/utils/MarkdownUtils";
import DecoratorProvider from "@/markup/decorator/DecoratorProvider";
import RuleType from "@/markup/constant/RuleType";

const photoViewStatus = usePhotoViewStatusStore()

const props = defineProps<{
  header: Header,
  description: string,
  path: string
}>()

const methods = {
  openImages(images: Image[], index: number) {
    photoViewStatus.load(images)
    photoViewStatus.open(index)
  }
}

const html = ref('');
onMounted(() => {

  const markdownIt = new MarkdownIt(DEFAULT_MARKDOWN_IT_OPTIONS);

  DecoratorProvider.provide(RuleType.BLOCK_QUOTE).decorate(markdownIt);
  DecoratorProvider.provide(RuleType.HEADLINE).decorate(markdownIt);
  DecoratorProvider.provide(RuleType.CODE_BLOCK).decorate(markdownIt);

  html.value = markdownIt.render(props.description);
});

</script>

<style lang="scss">
@import '@styles/index';

.post-preview-body {
  display: flex;
  flex-direction: column;

  .post-default-image {
    cursor: pointer;

    .default-image-wrapper {
      display: grid;
      max-width: 486px;
      min-height: 60px;

      img {
        width: 100%;
      }
    }

    .post-title-box {
      background-color: #cfe6f8;
      padding: 4px 15px;
      color: #2c3e50;

      span {
        display: block;

        &.post-title {

        }

        &.post-path {
          font-size: .78rem;
        }
      }
    }
  }

  .post-contents {
    margin: 0 15px;
    //max-height: 6.6rem;
    overflow: hidden;
    font-size: .92rem;
    padding: 15px;
    line-height: 1.6;

    .content-text {

      display: block;
      font-family: inherit;
      white-space: break-spaces;
      word-break: break-all;

      img {
        width: 300px;
      }
    }

    .show-button {
      display: none;
    }

    &.show-more-text {

      .show-button {
        position: absolute;
        bottom: 0;
        right: 0;
        margin-left: 10px;
      }
    }
  }

  .bundled-images-wrapper {
    height: 538px;

    .image-bundles {
      display: flex;
      list-style: none;
      width: 100%;
      height: 100%;
      align-items: center;
      flex-wrap: wrap;
      position: relative;

      li {
        background-position: center center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid transparent;
        position: relative;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: cover;
          object-position: center;
          object-fit: cover;
        }
      }

      &.for-2-images {

        li {
          width: 50.00%;
          overflow: hidden;
        }
      }

      &.for-3-images {

        li:first-child {
          width: 100.00%;
          height: 50.00%;
        }
        li:not(:first-child) {
          width: 50.00%;
          height: 50.00%;
        }
      }

      &.for-4-images {

        li {
          width: 50.00%;
          height: 50.00%;
        }
      }

      &.for-5-images {

        li:nth-child(1), li:nth-child(2) {
          width: 50.00%;
          height: 60.00%;
        }

        li:nth-child(3), li:nth-child(4), li:nth-child(5) {
          width: 33.33%;
          height: 40.00%;
        }

        &.over-5-images {

          li:last-child {

            .image-count-overlay {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgb(0 0 0/.6);
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;

              .additional-images {
                color: white;
                font-size: 32px;
              }
            }
            span {
            }
          }
        }
      }

    }
  }
}

.dark .post-preview-body {
  .post-contents {
    border-color: $linear-dark-color;
  }

  .post-default-image {

    .default-image-wrapper {
      img {
        filter: brightness(70%);
      }

    }

    .post-title-box {
      background-color: #92acc0;
    }
  }
}

@include tablet() {

}

@include mobile() {
  .post-preview-body {

    .post-contents {
      margin: 0px 4px;
      padding: 7px;
    }

    .post-default-image {

      .default-image-wrapper {

        img {
          width: 100%;
        }
      }
      .post-title-box {

        .post-title {
          font-size: .82rem;
        }
      }
    }
  }
}
</style>
