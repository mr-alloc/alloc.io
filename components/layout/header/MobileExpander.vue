<template>
  <div class="mobile-controller" :class="[{ active: mobileNaviStore.isActive }, { close: (mobileNaviStore.isActive || tabletNaviStore.isActive) }]">
    <div class="control-panel">
        <span class="control-button" v-on:click="methods.openAppropriateMenu()">
          <font-awesome-icon class="button-text" :icon="['fas', 'plus']"/>
        </span>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {mobileNaviStore, tabletNaviStore} from "~/store";

const data = {
  mobileNaviStore
}

const methods = {

  openAppropriateMenu() {
    const mainWrapper = document.getElementById('__nuxt')!
    const width = mainWrapper.clientWidth
    /* tablet */
    if (768 <= width && width <= 1023) {
      tabletNaviStore.isActive = !tabletNaviStore.isActive
    }
    /* mobile */
    else if (width < 768) {
      mobileNaviStore.isActive = !mobileNaviStore.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles';

.mobile-controller {
  display: none;
  z-index: 1000;
  position: fixed;
  bottom: 20px;
  width: 100%;
  flex-direction: row-reverse;

  &.close {
    .control-button {
      transform: rotate(135deg);
    }
  }

  .control-panel {
    height: 60px;
    width: 60px;
    background-color: #ae70ce;
    margin-right: 20px;
    border-radius: 40px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    display: table;

    .control-button {
      display: table-cell;
      vertical-align: middle;
      text-align: center;

      .button-text {
        font-size: 2.32rem;
        color: white;
      }
    }
  }
}

@include tablet {

  .mobile-controller {
    display: flex;
  }
}

@include mobile {


  .mobile-controller {
    display: flex;

    .control-panel {
      display: table;
    }

    &.active {
      .control-panel {
        background-color: #86569d;
      }
    }

  }
}
</style>
