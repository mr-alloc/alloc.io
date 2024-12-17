<template>
  <nav aria-label="Breadcrumb" class="relative min-w-0">
    <ol class="flex items-center gap-x-1.5">
      <li class="flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm leading-6 min-w-0"
          v-for="(snippet, index) in breadcrumbs">
        <a class="flex items-center gap-x-1.5 group cursor-pointer font-semibold min-w-0"
           :class="index === breadcrumbs.length -1
                         ? ['text-primary-500', 'dark:text-primary-400']
                         : ['hover:text-gray-700', 'dark:hover:text-gray-200']"
        >
          <span class="block truncate">{{ snippet }}</span>
        </a>
        <span class="iconify i-ph:caret-right flex-shrink-0 rtl:rotate-180 w-4 h-4"
              v-if="index !== breadcrumbs.length -1"
              aria-hidden="true" role="presentation"></span>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">

const props = defineProps<{
  breadcrumbs: string[]
}>();
</script>