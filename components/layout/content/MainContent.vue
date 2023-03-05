<template>
  <div class="main-content-view" id="main-content-wrapper">
    <NuxtPage class="current-content" :page-key="route.fullPath" />
    <MainFooter />
    <div class="background" :class="{ active : data.mobileNaviStore.isActive}" v-on:click="data.mobileNaviStore.isActive = false">
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainFooter from "@/components/layout/content/MainFooter.vue";
import { mobileNaviStore } from "@/store";
import { useRoute } from "#app";
import {definePageMeta} from "#imports";
const route = useRoute()

const components = {
  MainFooter
}

const data = {
  mobileNaviStore,
  route
}
</script>

<style lang="scss">
@import "@/styles";

.dark .main-content-view {

  border-top-color: $linear-dark-color;
}
.main-content-view {
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - $pc-header-interval);


  .background {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    transition: height 0s, background-color .6s;

    &.active {
      z-index: 1;
      background: rgb(0 0 0 / 40%);
      height: 100%;

    }
  }

  .fade-out {
    padding-left: 90px;
    opacity: 0.34;
  }

  .current-content {
    min-height: 100vh;
  }
}

@include tablet {

}

@include  mobile {

  .main-content-view {
    border-top: none;
    height: 100%;
  }
}
</style>
