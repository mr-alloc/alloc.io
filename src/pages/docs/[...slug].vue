<template>
  <MainPage
      :ui="{
      right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'
    }">
    <MainPageHeader :title="content.header.title">
      <template #headline>
        <Breadcrumb :breadcrumbs="content.header.breadcrumbs" />
      </template>
    </MainPageHeader>

    <MainPageBody class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
      <PostContentDecorator :metadata="content" />
    </MainPageBody>

    <template v-if="content.header.rootHeadLine" #right>
      <ContentToc :headline="content.header.rootHeadLine" :title="title" no-wrapper>
        <template #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': content.header.rootHeadLine }">
            <UDivider v-if="content.header.rootHeadLine" type="dashed" />
            <SocialLinks />
          </div>
        </template>
      </ContentToc>
    </template>

  </MainPage>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";
import PostContentDecorator from "@/components/layout/content/PostContentDecorator.vue";
import MainPage from "@/components/layout/content/MainPage.vue";
import MainPageHeader from "@/components/layout/content/MainPageHeader.vue";
import Breadcrumb from "@/components/layout/content/Breadcrumb.vue";
import MainPageBody from "@/components/layout/content/MainPageBody.vue";
import ContentToc from "@/components/layout/content/ContentToc.vue";
import SocialLinks from "@/components/layout/content/SocialLinks.vue";
import {usePostContentStore} from "@/store/post-content-store";
import {usePagePrepareStore} from "@/store/prepare-post-store";
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import {useScrollspy} from "@/store/scroll-spy";

const route = useRoute();
const postContentStore = usePostContentStore();
const nuxtApp = useNuxtApp();
const prepareStore = usePagePrepareStore();
const photoViewStatusStore = usePhotoViewStatusStore();
const scrollspy = useScrollspy();
const content = postContentStore.get(route.path)!;

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const titleTemplate = computed(() => {
  return '%s · Alloc Blog'
});

const appConfig = useAppConfig();
const title = content.header.title;
const description = content.description;
useSeoMeta({
  titleTemplate,
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: content.header.thumbnail,
  ogUrl: appConfig.domain + route.path,
  ogSiteName: '$ alloc(*io);',
});

nuxtApp.hook('page:finish', () => {
  if (prepareStore.isPrepare) {
    document.querySelectorAll('.rendered-markdown-wrapper img').forEach((imgTag, index) => {
      imgTag.addEventListener('click', (e) => {
        photoViewStatusStore.open(index +1)
      });
    });

    scrollspy.updateHeadings(content.header.rootHeadLine, [
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
      scrollspy.updateHeadings(content.header.rootHeadLine, [
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('h3')
      ]);
    }, 100)
  });
});
</script>
