<template>
  <div class="relative">
    <ClientOnly>
      <HomeHeroBackground />
    </ClientOnly>

    <div class="relative py-0 sm:py-16 max-w-md z-30 mx-auto" id="main-content-body">
      <div class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-8">
        <PostCard :feed="feed as PostMetadata" v-for="(feed, index) in appCache.feeds" v-bind:key="index" />
        <PostContentLoader v-if="appCache.feeds.length === 0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {callPostFeed} from "@/utils/PostUtil";
import appCache from '@/store/appCache'
import PostCard from '@/components/layout/content/post-card/PostCard.vue'
import {onMounted} from "vue";
import PostContentLoader from "@/components/layout/content/post-card/PostContentLoader.vue";
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import HomeHeroBackground from "@/components/layout/content/HomeHeroBackground.vue";


definePageMeta({
  heroBackground: 'z-10'
})


useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Alloc Blog` : 'Alloc Blog';
  }
});
onMounted(() => {
  //포스트 호출
  callPostFeed();
});
</script>
