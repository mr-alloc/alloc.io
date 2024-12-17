<template>
  <div :class="ui.wrapper">
    <div v-if="$slots.left" :class="ui.left">
      <slot name="left" />
    </div>
    
    <div :class="centerClass">
      <slot />
    </div>
    
    <div v-if="$slots.right" :class="ui.right">
      <slot name="right" />
    </div>
  </div>
</template>
<script setup lang="ts">

const ui = {
  wrapper: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-8',
  left: 'lg:col-span-2',
  center: {
    narrow: 'lg:col-span-6',
    base: 'lg:col-span-8',
    full: 'lg:col-span-10'
  },
  right: 'lg:col-span-2 order-first lg:order-last'
}

const slots = useSlots()
const centerClass = computed(() => {
  if (slots.left && slots.right) {
    return ui.center.narrow
  } else if (slots.left || slots.right) {
    return ui.center.base
  }

  return ui.center.full
})
</script>