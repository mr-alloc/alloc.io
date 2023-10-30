<template>
  <div class="post-tag-area">
    <font-awesome-icon class="tag-icon" :icon="['fa', 'tags']"/>
    <!--  Nuxt에서는 연결경로는 모두 prerender항목으로 포함시키므로 client rendering으로 해줘야 SSG처리를 하지 않는다.  -->
    <client-only>
      <a :href="methods.getTagPath(tag)" v-for="tag in props.tags" v-bind:key="tag" >
        <span :class="{ current: data.booked && data.booked === tag}">{{ tag }}</span>
      </a>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "#app";

const route = useRoute()

const props = defineProps({
  tags: Array
})
const data = {
  booked: route.params.tag,
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
      border-radius: 3px;
      background-color: #b7b4b4;
      font-size: .78rem;
      padding: 2px 10px;
      background-color: #2855ab;
      display: inline-block;
      cursor: pointer;
      color: #fff;


      &:hover,:active {
        transition: 0.1s;
        background-color: white;
        color: black
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
