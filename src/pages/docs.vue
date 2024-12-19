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
import {useCategoriesStore} from "@/store/category-store";
import DocumentType from "@/classes/constant/document-type";

const route = useRoute();
const postContentStore = usePostContentStore();
const categoriesStore = useCategoriesStore();
categoriesStore.initialize(postContentStore.values(DocumentType.POST));
const content = postContentStore.get(route.fullPath);

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const categories = computed(() => content.header.categories ?? []);
definePageMeta({
  key: () => route.fullPath,
  heroBackground: 'opacity-30 z-20'
});

</script>
