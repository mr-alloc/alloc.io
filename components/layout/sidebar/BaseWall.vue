<template>
  <div class="base-wall"></div>
</template>

<script>
import {explorerHeaderStore} from "@/store";

export default {
  name: "BaseWall",
  data() {
    return {
      explorerHeaderStore
    }
  }
}
</script>

<style lang="scss">
@import '@/styles';
.dark .base-wall {
  background-color: $main-dark-color;
}
.base-wall {
  width: 100%;
  background-color: $settings-light-color;
  z-index: 100;
  position: fixed;
  height: 45px;
  display: none;

}

.fixed {

  .base-wall {
    backdrop-filter: saturate(180%) blur(20px);
    background-color: hsla(0,0%,100%,.65);
    transition: backdrop-filter 0s, background-color 0s;
  }
}

@include tablet {

}

@include mobile {
  .base-wall {
    display: block;
  }
}
</style>