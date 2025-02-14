<template>
  <div class="post-tag-area">
    <!--  Nuxt에서는 연결경로는 모두 prerender항목으로 포함시키므로 client rendering으로 해줘야 SSG처리를 하지 않는다.  -->
    <client-only>
      <FontAwesomeIcon class="tag-icon" :icon="['fa', 'tags']"/>
      <span v-for="tag in props.tags">
        <span :class="{ current: data.booked && data.booked === tag}">{{ tag }}</span>
      </span>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const route = useRoute();

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

.post-tag-area {
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  flex-grow: 1;
  flex-direction: row;

  .tag-icon {
    color: #b26ab2;
    font-size: 20px;
    margin-right: 7px;
    padding: 2px 1px;
  }
  span {

    span {
      margin: 3px 2px;
      border-radius: 3px;
      font-size: .78rem;
      padding: 2px 10px;
      background-color: #2855ab;
      display: inline-block;
      color: #fff;
      user-select: none;


      //&:hover,:active {
      //  transition: 0.1s;
      //  background-color: white;
      //  color: black
      //}

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
