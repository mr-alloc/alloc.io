<template>
    <div class="relative py-0 sm:py-16 max-w-md z-30" id="main-content-body">
      <div class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-8">
        <ClientOnly fallback-tag="span" fallback="Loading Posts...">
          <div class="rounded-none sm:rounded-xl divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 relative group flex flex-col overflow-hidden group h-fit"
               v-for="(feed, index) in appCache.feeds" v-bind:key="index">
            <PostCard :feed="feed" />
          </div>
        </ClientOnly>
      </div>
    </div>
</template>

<script lang="ts" setup>
import {callPostFeed} from "@/utils/PostUtil";
import appCache from '@/store/appCache'
import PostCard from '@/components/layout/content/post-card/PostCard.vue'
import {onMounted} from "vue";

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
