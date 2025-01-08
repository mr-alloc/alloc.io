<template>
  <UContainer>
    <MainPage class="z-30">
      <template #left>
        <PostCategories :path="route.path" />
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

nuxtApp.hook('page:finish', () => {
  if (prepareStore.isPrepare) {
    document.querySelectorAll('.rendered-markdown-wrapper img').forEach((imgTag, index) => {
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

onMounted(() => {

  useRouter().afterEach(() => {
    setTimeout(() => {
      scrollspy.reinitializeObserver();
      scrollspy.updateHeadings([
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('h3')
      ]);
    }, 100)
  });
});
prepareStore.prepare();
</script>
