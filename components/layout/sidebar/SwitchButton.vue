<template>
      <div class="classic-switch" :class="{ active: data.isTurnOn }" v-on:mouseup="method.reflect">
        <span class="switch-ball"></span>
      </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  switch: Function,
  default: Boolean
})

const data = {
  isTurnOn: props.default
}
const method = {
  reflect() {
    data.isTurnOn = props.switch && props.switch()
  }
}
</script>

<style lang="scss">
@import '@/styles';

.classic-switch {
  flex-shrink: 0;
  width: 40px;
  height: 23px;
  background-color: $point-light-color;
  border-radius: 15px;
  padding: 3px;

  .switch-ball {
    width: 23px;
    height: 100%;
    background-color: $main-light-color;
    display: inline-block;
    border-radius: 15px;
    box-shadow: 2px 4px 6px rgba(0,0,0,0.1);

  }

  &:active {

    .switch-ball {
      width: 30px;
    }


  }


  &.active {
    background-color: #4ED164;

    .switch-ball {
      margin-left: 17px;
    }

    &:active {

      .switch-ball {
        margin-left: 10px;
      }
    }
  }
}

@include tablet {

}

@include mobile {

  .switch-board {
    .light-switch-panel {

      .light-switch-title {

      }

      .light-switch {
        -webkit-user-select: none;

      }
    }
  }
}

</style>
