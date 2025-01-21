<script setup lang="ts">
const ui = {
  container: 'border-t border-gray-200 dark:border-gray-800',
  frame: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3 !py-6',
  socialGroup: {
    wrapper: 'lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3',
    item: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center'
  }
}

</script>

<template>
  <div :class="ui.container">
    <div :class="ui.frame">
      <div :class="ui.socialGroup.wrapper">
        <a :class="ui.socialGroup.item"
            aria-label="Alloc on LinkedIn" href="https://www.linkedin.com/in/tae-gu-jeon-431566209" rel="noopener noreferrer" target="_blank">
          <span class="iconify i-simple-icons:linkedin flex-shrink-0 h-5 w-5" aria-hidden="true" style=""></span>
        </a>
        <a :class="ui.socialGroup.item"
            aria-label="Alloc on GitHub" href="https://github.com/mr-alloc" rel="noopener noreferrer" target="_blank">
          <span class="iconify i-simple-icons:github flex-shrink-0 h-5 w-5" aria-hidden="true" style=""></span>
        </a>
      </div>
      <div class="mt-3 lg:mt-0 lg:order-2 flex items-center justify-center"></div>
      <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1">
        <p class="text-gray-500 dark:text-gray-400 text-sm"> Copyright © 2019-2025 Alloc · MIT License</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>