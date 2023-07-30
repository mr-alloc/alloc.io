<template>
  <div class="search-result-row">
    <div class="category-icon-area">
      <span class="category-icon">
        <img :src="`/assets/icon/${props.row.icon}.png`"/>
      </span>
    </div>
    <div class="detected-content-area">
      <ul class="detected-list">
        <li class="each-detected-content"
            :class="[`${result.status}`, { select: result.isSelected}]"
            v-for="result in props.row.results"
            :key="result.content.path"
        >
          <div class="result-string">
            <span>{{ result.content.header.title }}</span>
          </div>
          <div class="result-breadcrumb">
            <ul>
              <li v-for="crumb in result.content.header.breadcrumbs">{{ crumb }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PostSearchGroup} from "~/class/implement/PostSearchGroup";
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
  row: PostSearchGroup
})


</script>

<style lang="scss" scoped>
@import '@/styles';

.search-result-row {
  //margin-top: 3px;
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
    //border-bottom: 1px $linear-color solid;
    padding: 3px 0;

    .detected-list {
      list-style: none;

      .each-detected-content {
        padding: 8px 5px;
        border-radius: 5px;
        transition: 0.4s;
        margin: 3px 5px;
        cursor: pointer;

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
          //border-bottom: 1px $linear-color solid;
        }

        &:hover {
          background-color: rgb(0,0,0,0.2);
        }

        &.select {
          background-color: rgb(0,0,0,0.2);
        }
        //최로 로드(연출상 비활성화)
        &.appear {
          //opacity: 0;
          //position: fixed;
        }
        //준비 (출현 연출)
        &.ready {

        }
        //유지 - 기존 결과
        &.carry-on {

        }
        //삭제대상 (제거 연출)
        &.finalize {

        }
        //실제 제거
        &.disappear {

        }
      }
    }
  }
}
</style>
