<template>
  <div :class="ui.wrapper">
    <PostCardHeader :image="header.image" :nickname="header.nickname"
                    :position="header.position" :company="header.company" :date="header.date"/>
    <PostCardBody :header="feed.header" :description="feed.description" :path="feed.path" />
    <PostCardFooter :header="feed.header" />
  </div>
</template>

<script lang="ts" setup>
import { PostMetadata } from "@/classes/implement/PostMetadata";
import PostCardHeader from '@/components/layout/content/post-card/PostCardHeader.vue';
import PostCardBody from '@/components/layout/content/post-card/PostCardBody.vue';
import PostCardFooter from "@/components/layout/content/post-card/PostCardFooter.vue";
import appCache from "@/store/app-cache";

const appConfig = useAppConfig();
const props = defineProps<{
  feed: PostMetadata
}>();
const ui = {
  wrapper: 'sm:rounded-xl divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 relative group flex flex-col overflow-hidden group h-fit'
}
const header = computed(() => {
  return {
    image: props.feed.header.profileImage ?? '/post/profile/default.jpg',
    nickname: appConfig.fullName,
    position: props.feed.header.currentPosition,
    company: props.feed.header.currentCompany,
    date: props.feed.header.date.toString()
  }
});
</script>
