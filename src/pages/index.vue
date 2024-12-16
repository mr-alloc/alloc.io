<template>
    <div class="relative py-0 sm:py-16 max-w-md z-30" id="main-content-body">
      <div class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-8">
        <ClientOnly :fallback="PostContentLoader">
          <PostCard :feed="feed" v-for="(feed, index) in appCache.feeds" v-bind:key="index" />
        </ClientOnly>
      </div>
    </div>
</template>

<script lang="ts" setup>
import {callPostFeed} from "@/utils/PostUtil";
import appCache from '@/store/appCache'
import PostCard from '@/components/layout/content/post-card/PostCard.vue'
import {onMounted} from "vue";
import PostContentLoader from "@/components/layout/content/post-card/PostContentLoader.vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - DEVIS 블로그` : 'DEVIS 블로그';
  }
});
onMounted(() => {
  //포스트 호출
  callPostFeed();
});
</script>
