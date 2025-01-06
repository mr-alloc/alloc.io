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
import {usePagePrepareStore} from "@/store/prepare-post-store";
import {useNuxtApp} from "nuxt/app";
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import {useScrollspy} from "@/store/scroll-spy";

const route = useRoute();
const nuxtApp = useNuxtApp();
const photoViewStatusStore = usePhotoViewStatusStore();
const postContentStore = usePostContentStore();
const prepareStore = usePagePrepareStore();
const scrollspy = useScrollspy();
const content = postContentStore.get(route.path);

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const categories = computed(() => content.header.categories ?? []);

nuxtApp.hook('page:finish', () => {
  if (prepareStore.isPrepare) {
    console.log('page:finish');
    document.querySelectorAll('.rendered-markdown-wrapper img').forEach((imgTag, index) => {
      imgTag.addEventListener('click', (e) => {
        photoViewStatusStore.open(index +1)
      });
    });
    console.log('scrollspy:', scrollspy);
    scrollspy.updateHeadings([
      ...document.querySelectorAll('h2'),
      ...document.querySelectorAll('h3')
    ]);
    prepareStore.done();
  }

});
prepareStore.prepare();
</script>
