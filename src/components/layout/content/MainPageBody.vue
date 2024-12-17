<template>
  <div :class="[ui.wrapper, props && ui.prose]">
    <slot/>
  </div>
</template>
<script setup lang="ts">

const ui = {
  wrapper: 'mt-8 pb-24',
  prose: 'prose prose-primary dark:prose-invert max-w-none'
}

const props = defineProps({
  prose: {
    type: Boolean,
    default: false
  }
});
</script>