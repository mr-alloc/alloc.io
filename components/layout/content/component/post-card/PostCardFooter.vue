<template>
  <div class="post-preview-footer">
    <TagArea :tags="feed.header.tags" />
    <div v-bind:class="[`post-comment-list${feed._id}`,{ 'hide' : mobileNaviStore.isActive }]" class="message-box" ></div>
    <PostCardFooterButton :id="feed.id"/>
  </div>
</template>

<script>
import {PostContent} from "@/class/implement/PostContent";
import PostCardFooterButton from "@/components/layout/content/component/post-card/PostCardFooterButton";
import {mobileNaviStore} from "@/store";
import TagArea from "@/components/layout/content/component/post-card/TagArea";

export default {
  name: "PostCardFooter",
  data() {
    return {
      mobileNaviStore
    }
  },
  props: {
    feed: PostContent
  },
  components: {
    TagArea,
    PostCardFooterButton,
  }
}
</script>

<style lang="scss">
@import '@/styles';

.post-preview-footer {
  display: flex;
  margin: 0px 15px;
  text-align: center;
  flex-direction: column;


  div[class^="post-comment-list"] {
    border-bottom: 1px $point-light-color solid;
    grid-column: 1 / -1;
    overflow: hidden;
    display: none;
    width: 100%;


    &.message-box {
      flex-direction: column;
      font-size: .92rem;
      margin: 0 auto 1rem;
      max-width: 600px;

      &.hide {
        display: none !important;
      }

      p {
        border-radius: 1.15rem;
        line-height: 1.25;
        max-width: 75%;
        padding: 0.5rem .875rem;
        position: relative;
        word-wrap: break-word;

        &::before,::after {
          bottom: -0.1rem;
          content: "";
          height: 1rem;
          position: absolute;
        }

        &.from-me {
          align-self: flex-end;
          right: 7px;
          background-color: #248bf5;
          color: #fff;

          &::before {
            border-bottom-left-radius: 0.8rem 0.7rem;
            border-right: 1rem solid #248bf5;
            right: -0.35rem;
            transform: translate(0, -0.1rem);
          }

          &::after {
            content: "";
            position: absolute;
            z-index: 1;
            bottom: -2px;
            right: -42px;
            width: 12px;
            height: 20px;
            background: $main-light-color;
            border-bottom-left-radius: 10px;
            -webkit-transform: translate(-30px, -2px);
            transform: translate(-30px, -2px);
          }
        }

        &[class^="from-"] {
          margin: 0.5rem 0;
          width: fit-content;
        }

        &.from-them {
          align-items: flex-start;
          background-color: #e5e5ea;
          color: #000;
          text-align: left;
          left: 7px;

          &:before {
            border-bottom-right-radius: 0.8rem 0.7rem;
            border-left: 1rem solid #e5e5ea;
            left: -0.35rem;
            transform: translate(0, -0.1rem);
          }

          &::after {
            content: "";
            position: absolute;
            z-index: 3;
            bottom: -2px;
            left: 4px;
            width: 26px;
            height: 20px;
            background: white;
            border-bottom-right-radius: 10px;
            -webkit-transform: translate(-30px, -2px);
            transform: translate(-30px, -2px);
          }
        }


      }
      .no-comment {
        width: 80%;
        padding: 10px 5px;
        margin: 10px auto;
        background-color: $point-light-color;
        border-radius: 15px;
      }
    }
  }

}

@include tablet() {

}

@include mobile() {

}


.dark .post-preview-footer {
  .post-tag-area {
    border-color: $linear-dark-color;

    span {
      background-color: #2c3e50;

      &:active, :hover {
        background-color: #d3d1d1;
        color: black;
      }
    }
  }

  div[class^="post-comment-list"] {
    border-color: $linear-dark-color;

    p.from-me {

      &:after {
        background-color: $main-dark-color;

      }
    }

    .no-comment {
      background-color: $point-dark-color;
    }
  }
}
</style>
