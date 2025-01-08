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
const prepareStore = usePagePrepareStore();
prepareStore.prepare();
</script>
