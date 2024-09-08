<template>
  <div class="main-footer">
    <div class="footer-text">
      <span>© 2022 <a :href="`https://github.com/${appCache.blogInfo.fullName}`">{{ appCache.blogInfo.username }}.</a> All rights reserved.</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import appCache from "@/store/appCache";
</script>

<style lang="scss">
@import "@styles/index";

.main-footer {
  width: 100%;
  height: 40px;
  padding-top: 20px;

  .footer-text {
    margin: 0 auto;
    width: 80%;
    text-align: center;

    span {
      color: #2c3e50;

      a {
        text-decoration: underline;
      }
    }
  }
}


@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;

  }
}

@include mobile {

}

@include tablet {

}
</style>
