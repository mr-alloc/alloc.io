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
import {usePhotoViewStatusStore} from "@/store/PhotoViewStore";
import {useScrollspy} from "@/store/ScrollSpy";
import {useThrottleFn} from "@vueuse/shared";
import {usePagePrepareStore} from "@/store/prepare-post-store";

const route = useRoute();
const nuxtApp = useNuxtApp();
const postContentStore = usePostContentStore();
const photoViewStatusStore = usePhotoViewStatusStore();
const prepareStore = usePagePrepareStore();
const scrollspy = useScrollspy();
const content = postContentStore.get(route.fullPath);

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const categories = computed(() => content.header.categories ?? []);
prepareStore.prepare();

nuxtApp.hook('page:finish', () => {
  if (prepareStore.isPrepare) {
    const imageTags = document.querySelectorAll('.rendered-markdown-wrapper img');
    imageTags.forEach((imgTag, index) => {
      imgTag.addEventListener('click', (e) => {
        photoViewStatusStore.open(index +1)
      });
    });

    scrollspy.updateHeadings([
      ...document.querySelectorAll('h2'),
      ...document.querySelectorAll('h3')
    ]);
    prepareStore.done();
  }

});

</script>
