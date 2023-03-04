<template>
  <div class="post-card-wrapper content-loader" :class="{ active : postCallStore.is_calling }">
    <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" >
      <rect clip-path="url(#content-loader-clip)" x="0" y="0" width="100%" height="100%" style="fill: url('#content-loader-gradient');"></rect>
      <defs>
        <clipPath id="content-loader-clip">
          <circle cx="40" cy="40" r="20"></circle>
          <rect x="75" y="25" rx="4" ry="4" width="200" height="13"></rect>
          <rect x="75" y="45" rx="4" ry="4" width="145" height="8"></rect>
          <rect x="20" y="100" rx="4" ry="4" width="360" height="13"></rect>
          <rect x="20" y="120" rx="4" ry="4" width="360" height="13"></rect>
          <rect x="20" y="140" rx="4" ry="4" width="300" height="13"></rect>
          <rect x="20" y="180" rx="5" ry="5" width="360" height="260"></rect>
        </clipPath>
        <linearGradient id="content-loader-gradient">
          <stop offset="0%" stop-color="#eaeaea" stop-opacity="1">
            <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset="50%" stop-color="#d7d6d6" stop-opacity="1">
            <animate attributeName="offset" values="-2; 1.5 " dur="2s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset="100%" stop-color="#eaeaea" stop-opacity="1">
            <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite"></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import {postCallStore} from "@/store";

const data = {
  postCallStore
}
</script>

<style lang="scss">
@import '@/styles';

.content-loader {
  display: none;

  &.active {
    //== content-loader ==//
    display: block;
  }

  svg {
    border-radius: 15px;
    background-color: $main-light-color;

  }
}

@include tablet() {

}

@include mobile() {

}

.dark .content-loader {
  svg {
    background-color: $main-dark-color;



    #content-loader-gradient{
      stop:not(:nth-child(2)) {
        stop-color: #2c2b2b;
      }

      stop:nth-child(2) {
        stop-color: #484747;
      }
    }
  }
}
</style>

