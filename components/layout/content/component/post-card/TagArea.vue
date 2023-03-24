<template>
  <div class="post-tag-area">
    <font-awesome-icon class="tag-icon" :icon="['fa', 'tags']"/>
    <nuxt-link :to="methods.getTagPath(tag)" v-for="tag in props.tags" v-bind:key="tag" >
      <span :class="{ current: data.booked && data.booked == tag}">{{ tag }}</span>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "#app";

const route = useRoute()

const props = defineProps({
  tags: Array
})
const data = {
  booked: route.params.tag_name,
}

const methods = {
  getTagPath(tag: string) {
    return `/tags/${tag}/1`
  }
}
</script>

<style lang="scss">
@import '@/styles';

.post-tag-area {
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  border-bottom: 1px $point-light-color solid;
  flex-grow: 1;
  flex-direction: row;

  .tag-icon {
    color: #b26ab2;
    font-size: 20px;
    margin-right: 7px;
    padding: 2px 1px;
  }
  a {

    span {
      margin: 3px 2px;
      border-radius: 7px;
      background-color: #b7b4b4;
      font-size: .78rem;
      padding: 0px 10px;
      color: white;
      display: inline-block;
      cursor: pointer;


      &:hover,:active {
        background-color: #2855ab;
        transition: 0.1s;
      }

      &.current {
        background-color: firebrick;
      }
    }
  }

}

.dark .post-tag-area {
  border-color: $linear-dark-color;

  span {
    background-color: #2c3e50;

    &:active, :hover {
      background-color: #d3d1d1;
      color: black;
    }
  }
}
</style>
