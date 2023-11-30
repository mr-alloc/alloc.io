<template>
  <div class="search-result-wrapper">
    <div class="search-card-layer" v-bind:key="index" v-for="(post, index) in searchInputStore.result_list">
      <a :href="`/docs/${post.file_path}`" v-on:click="mobileNaviStore.isActive = false">
        <div class="search-card-date">
          <span>{{ calPostDate(post.create_time) }}</span>
        </div>
        <div class="search-card-title">
          <span>{{ post.file_title }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { searchInputStore, mobileNaviStore } from "@/store";
import { calPostDate } from "@/components/utils/settingUtils";

export default {
  data() {
    return {
      searchInputStore,
      mobileNaviStore,
      calPostDate

    }
  },
  methods: {

  } ,
  components: {

  }
}
</script>

<style lang="scss">
@import '@/styles';

.search-result-wrapper {
  width: 60%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
  overflow-y: scroll;

  .search-card-layer {
    background-color: $main-light-color;
    border-radius: 15px;
    margin: 20px 10px 0px;
    min-height: 60px;
    padding:5px 20px;
    display: inline-block;

    .search-card-title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .search-card-date {
      font-size: .72rem;
    }

    &:hover {
      background-color: $point-light-color;
    }
  }

  //&::-webkit-scrollbar-thumb {
  //  border-radius: 10px;
  //  background-clip: padding-box;
  //  border: 2px solid transparent;
  //}
  //&::-webkit-scrollbar-track {
  //  background-color: transparent;
  //  border-radius: 10px;
  //}
}

@include mobile {
  .search-result-wrapper {
    display: block;
    width: 100%;

    .search-card-layer {

      .search-card-title {
        font-size: 1.12rem;
      }
    }
  }
}
</style>
