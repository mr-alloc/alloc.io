<template>
    <div class="main-body" id="main-content-body">
      <div class="main-container">
        <div class="post-card-wrapper" v-for="(feed, index) in data.feeds" v-bind:key="index">
          <PostCardHeader :feed="feed" />
          <PostCardBody :feed="feed" />
          <PostCardFooter :feed="feed" />
        </div>
        <PostContentLoader />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { postListStore, postCallStore, userInfoStore, fileListStore, mobileNaviStore } from "@/store";
import { calPostDate } from "@/components/utils/settingUtils";
import { callPostFeed } from "@/components/utils/postUtil";
import { feeds } from '@/store/site'
import PostCardHeader from "@/components/layout/content/component/PostCardHeader.vue";
import PostCardBody from "@/components/layout/content/component/post-card/PostCardBody.vue";
import PostCardFooter from "@/components/layout/content/component/post-card/PostCardFooter.vue";
import PostContentLoader from "@/components/layout/content/component/post-card/PostContentLoader.vue";
import {onMounted} from "vue";

callPostFeed()
const data = {
  feeds,
  postListStore,
  userInfoStore,
  fileListStore,
  postCallStore,
  mobileNaviStore,
  calPostDate,
  scroll: {
    current: 0
  },
  content_loader: {
    is_active: postCallStore.is_calling,
    style: {
      width: '60%',
      margin: '20px auto',
      backgroundColor: '#fcfcfc',
      borderRadius: '15px',
      display: 'block'

    }
  }
}
const components = {
  PostCardHeader,
  PostCardBody,
  PostCardFooter,
  PostContentLoader
}

onMounted(() => {
  const wrapper = document.getElementById('main-content-wrapper')!

  const handleForScroll = () => {

    /* 현재 스크롤 위치 */
    const currentScroll = wrapper.scrollTop
    /* 엘리먼트 높이 */
    const winHeight = wrapper.clientHeight
    /* 엘리먼트 스크롤 높이 */
    const docHeight = wrapper.scrollHeight

    const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(3)

    const scrollPer = parseFloat(percent)

    if(( ! postCallStore.is_calling) && scrollPer > 80) {
      postCallStore.is_calling = true
      callPostFeed()
    }

  }
  wrapper.addEventListener('scroll', handleForScroll)

})
</script>

<style lang="scss">
@import "@/styles";

.main-body {
  display: flex;
  max-width: 786px;
  min-height: 800px;
  margin: 0px auto 20px;


  & .main-container {
    width: 100%;

    & .post-card-wrapper {
      width: 70%;
      margin: 10px auto;
      min-height: 600px;
      background-color: $main-light-color;
      border-radius: 15px;
      border: 1.29px solid #e0dfdc;

    }
  }

}

.dark .main-body {

  .main-container {

    .post-card-wrapper {
      background-color: $main-dark-color;
      border-color: $linear-dark-color;
      color: white;

    }
  }
}

@include tablet {
  .main-body {
    margin-bottom: 0px;

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
        border-radius: 0px;
        border-left: 0px;
        border-right: 0px;

        &:first-child {
          margin-top: 0px;
          border-top: 0px;
        }
        &:nth-last-child(2) {
          margin-bottom: 0px;
        }
      }
    }
  }

}

@include mobile {
  .main-body {
    margin-bottom: 0px;

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
        min-height: 400px;
        border-radius: 0px;
        border-left: 0px;
        border-right: 0px;

        &:first-child {
          margin-top: 0px;
        }

        &:nth-last-child(2) {
          margin-bottom: 0px;
        }
      }
    }
  }
}

</style>
