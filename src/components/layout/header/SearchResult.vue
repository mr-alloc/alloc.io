<template>
  <div class="search-result-row">
    <div class="category-icon-area">
      <span class="category-icon">
        <img :src="`/icon/${props.row.icon}.png`" alt="Category Image"/>
      </span>
    </div>
    <div class="detected-content-area">
      <ul class="detected-list">
        <li class="each-detected-content my-1"
            :class="[`${result.status}`, { select: result.isSelected}]"
            v-for="result in props.row.results"
            :key="result.content.path"
            v-on:click="goTo(result.content.path)">
          <div class="result-string">
            <span class="text-gray-600 dark:text-gray-50">{{ result.content.header.title }}</span>
          </div>
          <div class="result-breadcrumb">
            <ul class="flex">
              <li class="flex items-center" v-for="(crumb, index) in result.content.header.breadcrumbs">
                <span>{{ crumb }}</span>
                <span class="iconify i-ph:caret-right flex-shrink-0 rtl:rotate-180 w-4 h-4"
                      v-if="index < result.content.header.breadcrumbs.length -1"
                      aria-hidden="true" role="presentation"></span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PostSearchGroup} from "@/classes/implement/PostSearchGroup";
import {useRouter} from "vue-router";
import {useSearchStatusStore} from "@/store/SearchStatusStore";

const router = useRouter()
const searchStatus = useSearchStatusStore()
const props = defineProps<{
  row: PostSearchGroup
}>();

const goTo = (path: string) => {
  router.push(path)
  searchStatus.cancelSearch()
}

</script>

<style lang="scss" scoped>
@import '@styles/index';

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
        }
        //준비 (출현 연출)
        &.ready {
          //animation-name: ready;
          //animation-duration: .8s;
        }
        //유지 - 기존 결과
        &.carry-on {

        }
        //삭제대상 (제거 연출)
        &.finalize {
          //opacity: 0;
          //height: 0;
          //animation-name: finalize;
          //animation-duration: .8s;
        }
        //실제 제거
        &.disappear {
          //opacity: 0;
        }
      }
    }
  }
}

@keyframes ready {
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: unset;
  }
}

@keyframes finalize {
  from {
    opacity: 1;
    height: unset;
  }
  to {
    opacity: 0;
    height: 0;
  }
}
</style>
