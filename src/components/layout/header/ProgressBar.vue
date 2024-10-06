<template>
  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" :style="{ width: `${0}%` }"></div>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  isComplete: boolean
}>();
</script>
<style lang="scss" scoped>
</style>
