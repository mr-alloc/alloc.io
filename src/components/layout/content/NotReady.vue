<template>
  <div class="not-ready-wrapper">
    <div class="not-ready-icon">
<!--      <font-awesome-icon icon="helmet-safety" />-->
    </div>
    <div class="not-ready-title">
      <span>준비중 입니다.</span>
    </div>
    <div class="not-ready-message">
      <span>👷🏻‍ 더 나은 정보를 위해 준비중이에요. 👷🏻‍</span>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {

    }
  }
}

</script>

<style lang="scss">
@import "@styles";

.not-ready-wrapper {
  width: 60%;
  margin: 20% auto;
  border: 1.29px solid #e0dfdc;
  background-color: $main-light-color;
  border-radius: 15px;
  text-align: center;

  .not-ready-icon {
    font-size: 140px;
    color: #cbcb59;
  }

  .not-ready-title {
    font-size: 40px;
    padding: 20px 0px;
  }
  .not-ready-message {
    padding: 20px 0px;
  }
}

@include mobile {

  .not-ready-wrapper {

    width: 90%;
  }
}
</style>
