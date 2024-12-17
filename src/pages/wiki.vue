<template>
  <UContainer>
    <MainPage class="z-30">
      <template #left>
        <PostCategories :path="route.path" :groups="categories" />
      </template>

      <NuxtPage />
    </MainPage>
  </UContainer>
</template>
<script setup lang="ts">
import MainPage from "@/components/layout/content/MainPage.vue";
import PostCategories from "@/components/layout/sidebar/PostCategories.vue";
import {usePostContentStore} from "@/store/post-content-store";


definePageMeta({
  heroBackground: 'opacity-30 z-20'
});
const route = useRoute();
const postContentStore = usePostContentStore();
const paths = route.path.split('/');
const content = postContentStore.getWiki(paths[paths.length -1]);

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const categories = computed(() => content.header.categories ?? []);
</script>
