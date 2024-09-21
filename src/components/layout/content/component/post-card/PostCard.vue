<template>
  <div class="post-card-frame">
    <PostCardHeader :header="feed.header"/>
    <PostCardBody :header="feed.header" :description="feed.description" :path="feed.path" />
    <PostCardFooter :header="feed.header" />
  </div>
</template>

<script lang="ts" setup>
import { PostMetadata } from "@/classes/implement/PostMetadata";
import PostCardHeader from '@/components/layout/content/component/post-card/PostCardHeader.vue';
import PostCardBody from '@/components/layout/content/component/post-card/PostCardBody.vue';
import PostCardFooter from "@/components/layout/content/component/post-card/PostCardFooter.vue";

const props = defineProps<{
  feed: PostMetadata
}>()
</script>

<style scoped>

</style>
