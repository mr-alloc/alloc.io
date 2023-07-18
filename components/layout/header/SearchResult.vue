<template>
  <div class="search-result-row">
    <div class="category-icon-area">
      <span class="category-icon">
        <img :src="`/assets/icon/${props.row.icon}.png`"/>
      </span>
    </div>
    <div class="detected-content-area">
      <ul class="detected-list">
        <li class="each-detected-content" v-for="content in props.row.contents" :key="content.path">
          <div class="result-string">
            <span>{{ content.header.title }}</span>
          </div>
          <div class="result-breadcrumb">
            <ul>
              <li v-for="crumb in content.header.breadcrumbs">{{ crumb }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PostContentGroup} from "~/class/implement/PostContentGroup";

const props = defineProps({
  row: PostContentGroup
})

</script>

<style lang="scss" scoped>
@import '@/styles';

.search-result-row {
  margin-top: 3px;
  display: flex;
  flex-direction: row;

  .category-icon-area {
    display: flex;
    flex-shrink: 0;
    width: 55px;
    justify-content: center;
    padding-top: 7px;

    .category-icon {
      display: inline-block;
      height: 25px;
      border: 0.88px $linear-color solid;
      border-radius: 3px;

      img {
        width: $small-icon-size;
      }
    }
  }

  .detected-content-area {
    flex-grow: 1;
    width: 100%;
    padding: 8px 5px;
    border-bottom: 1px $linear-color solid;

    .detected-list {
      list-style: none;

      .each-detected-content {

        .result-string {
          color: black;

          em {
            font-style: normal;
            background-color: #F3DDFDCC;
            font-weight: bold;
          }
        }

        .result-breadcrumb {
          font-size: 0.71rem;
          color: #818080;

          ul {
            list-style: none;
            li {
              display: inline-block;

              &:not(:last-child):after {
                padding: 0 5px;
                content: '→';
              }
            }
          }
        }

        &:not(:last-child) {
          border-bottom: 1px $linear-color solid;
        }
      }
    }
  }
}
</style>
