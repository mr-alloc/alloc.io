<template>
  <div :class="ui.wrapper">
    <div v-if="headline || $slots.headline" :class="ui.headline">
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-6">
      <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
        <slot name="icon">
          <UIcon :name="(icon as string)" :class="ui.icon.base" />
        </slot>
      </div>

      <div class="flex-1">
        <div :class="ui.container">
          <h1 :class="ui.title">
            <slot name="title">
              {{ title }}
            </slot>
          </h1>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const ui = {
  wrapper: 'relative border-b border-gray-200 dark:border-gray-800 py-8',
  container: 'flex flex-col lg:flex-row lg:items-center lg:justify-between',
  headline: 'mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5',
  title: 'text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight',
  description: 'mt-4 text-lg text-gray-500 dark:text-gray-400',
  icon: {
    wrapper: 'flex',
    base: 'w-10 h-10 flex-shrink-0 text-primary'
  },
  links: 'flex flex-wrap items-center gap-1.5 mt-4 lg:mt-0'
}

const props = defineProps({
  headline: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  icon: {
    type: String,
    default: undefined
  },

});
</script>
<style scoped lang="scss">

</style>