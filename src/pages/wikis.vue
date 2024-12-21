<template>
  <UContainer>
    <MainPage
        :ui="{
      right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'
    }">


      <MainPageHeader title="위키">
      </MainPageHeader>


      <MainPageBody class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
        <ul class="flex flex-wrap">
          <li class="inline-block" v-for="wiki in allWikis">
            <NuxtLink :class="ui.button.wrapper" :to="wiki.path">
              <span :class="ui.button.name">{{ wiki.header.summary }}</span>
            </NuxtLink>
          </li>
        </ul>
      </MainPageBody>
    </MainPage>
  </UContainer>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";
import MainPageBody from "@/components/layout/content/MainPageBody.vue";
import MainPage from "@/components/layout/content/MainPage.vue";
import MainPageHeader from "@/components/layout/content/MainPageHeader.vue";
import {usePostContentStore} from "@/store/post-content-store";
import DocumentType from "@/classes/constant/document-type";

const route = useRoute();

const titleTemplate = computed(() => {
  return 'WIKI · Alloc'
});

const appConfig = useAppConfig();
const allWikis = computed(() => {
  const postContentStore = usePostContentStore();
  return postContentStore.values(DocumentType.WIKI).filter(wiki => wiki.isPublic);
})
const ui = {
  button: {
    wrapper: 'border-0',
    name: 'bg-emerald-500 hover:bg-emerald-700 text-emerald-50 text-sm px-2 py-0.5 rounded-md font-normal no-underline duration-300'
  }
}
useSeoMeta({
  titleTemplate,
  ogTitle: 'dev is wiki',
  ogDescription: '나만의 위키',
  ogUrl: appConfig.domain + route.path
});
</script>
