<template>
  <div class="loading-bar-aria" :class="{ visible: this.isActive }">
    <svg class="page-loader">
      <circle class="circle1" cx="75" cy="75" r="20" />
      <circle class="circle2" cx="75" cy="75" r="30" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "LoadingBar",
  props: {
    isActive: Boolean
  }
}
</script>

<style lang="scss">
  .loading-bar-aria {
    display: none;

    .page-loader {
      width: 150px;
      height: 150px;

      circle {
        fill: none;
        /* 애니메이션 */
        /* 모서리 모양 */
        stroke-linecap: round;
        stroke-width: 3px;
        transform-origin: 50% 50%;

        &.circle1 {
          stroke: #0a66c2;
          animation: loader 4s infinite ease-in-out;
          stroke-dasharray: 80;
        }

        &.circle2 {
          stroke: #4db46d;
          animation: follower 1s infinite ease-in-out;
          stroke-dasharray: 150;
        }
      }
      @keyframes loader {
        100% {
          transform: rotate(720deg);
        }
      }
      @keyframes follower {
        100% {
          transform: rotate(360deg);
        }
      }
    }

    &.visible {
      display: block;
    }
  }
</style>
