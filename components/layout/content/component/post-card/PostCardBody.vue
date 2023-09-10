<template>
  <div class="post-preview-body">
    <div class="post-contents">
      <span class="content-text" v-html="markUp(props.description)"></span>
    </div>
    <nuxt-link v-bind:to="props.path" v-if="props.header.layout === 'post'">
      <div class="post-default-image">
        <div class="default-image-wrapper">
          <img :src="props.header.thumbnail" />
        </div>
        <div class="post-title-box">
          <span class="post-title">{{ props.header.summary }}</span>
          <span class="post-path">devis.kr</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import {Header} from "@/class/implement/Header";
import markUp from "@/utils/markUp";

const props = defineProps({
  header: Header,
  description: String,
  path: String
})


</script>

<style lang="scss">
@import '@/styles';

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
    border-top: 1px $linear-color solid;

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
