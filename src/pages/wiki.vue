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
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import {usePagePrepareStore} from "@/store/prepare-post-store";
import {useScrollspy} from "@/store/scroll-spy";


const route = useRoute();
const nuxtApp = useNuxtApp();
const postContentStore = usePostContentStore();
const photoViewStatusStore = usePhotoViewStatusStore();
const prepareStore = usePagePrepareStore();
const scrollspy = useScrollspy();
const paths = route.path.split('/');
const content = postContentStore.getWiki(paths[paths.length -1]);

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


onMounted(() => {

  useRouter().afterEach(() => {
    console.log('after each')
    setTimeout(() => {
      console.log('after each timeout')
      scrollspy.reinitializeObserver();
      scrollspy.updateHeadings([
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('h3')
      ]);
    }, 100)
  });
});
</script>
