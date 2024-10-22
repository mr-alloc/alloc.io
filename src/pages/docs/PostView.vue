<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <Head>
      <Meta property="og:title" v-bind:content="content?.header.title" />
      <Meta property="og:description" v-bind:content="content?.description" />
      <Meta property="og:image" v-bind:content="content?.header.thumbnail" />
      <Meta property="og:url" v-bind:content="appCache.blogInfo.domain + route.fullPath" />
      <Meta name="description" :content="content?.description"/>
      <Title>{{ content?.header.summary }}</Title>
    </Head>
    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
      <div class="lg:col-span-2">
        <PostCategories :groups="content?.header.categories ?? []" :path="content?.path" />
      </div>
      <div class="lg:col-span-8 " id="post-sub-container">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
          <div class="lg:col-span-8" ref="postRoot">
            <div class="relative border-b border-gray-200 dark:border-gray-800 py-8">
              <div class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5">
                <nav aria-label="Breadcrumb" class="relative min-w-0">
                  <ol class="flex items-center gap-x-1.5">
                    <li class="flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm leading-6 min-w-0"
                        v-for="(snippet, index) in content?.header.breadcrumbs.slice(0, content?.header.breadcrumbs.length)">
                      <a class="flex items-center gap-x-1.5 group cursor-pointer font-semibold min-w-0"
                         :class="index === content?.header.breadcrumbs.length -1
                         ? ['text-primary-500', 'dark:text-primary-400']
                         : ['hover:text-gray-700', 'dark:hover:text-gray-200']"
                      >
                        <span class="block truncate">{{ snippet }}</span>
                      </a>
                      <span class="iconify i-ph:caret-right flex-shrink-0 rtl:rotate-180 w-4 h-4"
                            v-if="index !== content?.header.breadcrumbs.length -1"
                            aria-hidden="true" role="presentation"></span>
                    </li>
                  </ol>
                </nav>
              </div>
              <div class="flex flex-col lg:flex-row items-start gap-6">
                <div class="flex-1">
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {{ content?.header.title }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60 prose prose-primary dark:prose-invert max-w-none" id="document-content">
              <div class="post-content" ref="postContentDiv">
                <PostContentDecorator :metadata="content" />
              </div>
            </div>
          </div>
          <div class="lg:col-span-2 order-first lg:order-last sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10">
            <nav>
              <div class="py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3">
                <button class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group" tabindex="-1">
                  <span class="font-semibold text-sm/6 truncate">Table of Contents</span>
                  <span class="iconify i-ph:caret-down lg:!hidden ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90" aria-hidden="true"></span>
                </button>
                <TableOfContents :headline="content?.header.rootHeadLine" :is-inner="false" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";
import appCache from "@/store/appCache";
import TableOfContents from "@/components/layout/content/TableOfContents.vue";
import {usePostContentStore} from "@/store/PostContentStore";
import PostContentDecorator from "@/components/layout/content/PostContentDecorator.vue";
import {useCategoriesStore} from "@/store/CategoriesStore";
import PostCategories from "@/components/layout/sidebar/PostCategories.vue";

const postContentStore = usePostContentStore();
const route = useRoute();

const categoriesStore = useCategoriesStore();
const content = postContentStore.get(route.path);

onMounted(() => {
  const contents = postContentStore.values()
      .filter(post => post.header.layout === 'post');
  categoriesStore.initialize(contents);
});

</script>
<style lang="scss" scoped>
@import '@styles/index';
</style>
