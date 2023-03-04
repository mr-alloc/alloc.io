<template>
  <div class="global-router-wrapper">
    <ResourceNavigator class="global-navigator" />
    <MainContent />
  </div>
</template>

<script lang="ts" setup>
import ResourceNavigator from "@/components/layout/sidebar/ResourceNavigator.vue";
import MainContent from "@/components/layout/content/MainContent.vue";

const components = {
  MainContent,
  ResourceNavigator
}

</script>

<style lang="scss">
@import '@/styles';
.global-router-wrapper {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100vh;
}

</style>
