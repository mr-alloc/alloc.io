<template>
  <div class="global-spinner-wrapper" :class="{ on : store.isOn }">
    <div class="spinner-background">
      <div class="spinner-area">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSpinnerStore } from "@/store/SpinnerStore";

const store = useSpinnerStore()
</script>

<style lang="scss">
.global-spinner-wrapper {
  display: none;
  .spinner-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    /* this is what centers your element in the fixed wrapper*/
    display: flex;
    flex-flow: column nowrap;
    justify-content: center; /* aligns on vertical for column */
    align-items: center; /* aligns on horizontal for column */

    /* just for styling to see the limits */
    box-sizing: border-box;

    background: rgba(0, 0, 0, 0.4);

  }

  &.on {
    display: block;
  }
}
</style>
