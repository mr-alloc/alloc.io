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
import { postListStore, postCallStore, fileListStore, mobileNaviStore } from "~/store";
import {calPostDate, setPageTitle} from "~/utils/settingUtils";
import { callPostFeed } from "~/utils/postUtil";
import appCache from '~/store/appCache'
import PostCard from '~/components/layout/content/component/post-card/PostCard.vue'
import { onMounted } from "vue";

callPostFeed()
const data = {
  feeds: appCache.feeds,
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
  setPageTitle('')

})
</script>

<style lang="scss">
@import "./styles";

.main-body {
  display: flex;
  max-width: 486px;
  min-height: 800px;
  margin: 30px auto;


  .main-container {
    width: 100%;

    .post-card-wrapper {
      transition: .4s;
      margin: 10px auto;
      background-color: $main-light-color;
      border-radius: 15px;
      border: 1.29px solid #e0dfdc;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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
    max-width: 486px;

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
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
    margin: 0px;
    max-width: unset;

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
        min-height: 300px;
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
