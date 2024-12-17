<script setup lang="ts">

const ui = {
  wrapper: 'min-h-[calc(100vh-var(--header-height))]'
}
</script>

<template>
  <main :class="ui.wrapper">
    <slot />
  </main>
</template>
