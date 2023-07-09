<template>
    <div class="main-body" id="main-content-body">
      <div class="main-container">
        <client-only>
          <div class="post-card-wrapper" v-for="(feed, index) in data.feeds" v-bind:key="index">
            <PostCard :feed="feed" />
          </div>
        </client-only>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { postListStore, postCallStore, fileListStore, mobileNaviStore } from "@/store";
import {calPostDate, setPageTitle} from "@/utils/settingUtils";
import { callPostFeed } from "@/utils/postUtil";
import { feeds } from '@/store/site'
import PostCard from '@/components/layout/content/component/post-card/PostCard.vue'
import { onMounted } from "vue";

callPostFeed()
const data = {
  feeds: feeds,
  postListStore,
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

onMounted(() => {
  const wrapper = document.getElementById('main-content-wrapper')!
  setPageTitle('')

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
  margin: 0px 50px 20px;


  .main-container {
    width: 100%;

    .post-card-wrapper {
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
