<template>
  <MainPage
      :ui="{
      right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'
    }">
    <MainPageHeader :title="title">
      <template #headline>
        <Breadcrumb :breadcrumbs="['위키']" />
      </template>
    </MainPageHeader>

    <MainPageBody class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
      <PostContentDecorator :metadata="content" />
    </MainPageBody>

    <template v-if="content.header.rootHeadLine" #right>
      <ContentToc :headline="content.header.rootHeadLine" :title="title" no-wrapper>

      </ContentToc>
    </template>
  </MainPage>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";
import {usePostContentStore} from "@/store/post-content-store";
import PostContentDecorator from "@/components/layout/content/PostContentDecorator.vue";
import {useCategoriesStore} from "@/store/category-store";
import DocumentType from "@/classes/constant/document-type";
import MainPageBody from "@/components/layout/content/MainPageBody.vue";
import MainPage from "@/components/layout/content/MainPage.vue";
import MainPageHeader from "@/components/layout/content/MainPageHeader.vue";
import ContentToc from "@/components/layout/content/ContentToc.vue";
import Breadcrumb from "@/components/layout/content/Breadcrumb.vue";
import {useNuxtApp} from "nuxt/app";

const route = useRoute();
const postContentStore = usePostContentStore();
const categoriesStore = useCategoriesStore();
const paths = route.path.split('/');
const content = postContentStore.getWiki(paths[paths.length -1])!;

if (!content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

onMounted(() => {
  categoriesStore.initialize(postContentStore.values(DocumentType.POST));
});

const titleTemplate = computed(() => {
  return '%s · Alloc Blog'
});

const appConfig = useAppConfig();
const nuxtApp = useNuxtApp();
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
</script>
