<template>
  <div class="tag-page-container">
    <div class="page-title-area">
      <h2 class="page-title">Posting Tag</h2>
      <div class="page-description">
        <p>
          특정 주제와 연관된 문서들을 찾을수 있는 태그 목록들입니다.<br/>
          아래 태그는 문서를 작성하면서, 쉽게 찾을수 있도록 연결 되었습니다.
        </p>
      </div>
    </div>
    <div class="tag-list-wrapper">
      <TagArea :tags="Array.from(appCache.tagMap.store.keys())"/>
    </div>
    <div class="connected-post" v-show="data.bookedTag">
      <div class="current-booked-tag">
        <h2 class="booked-tag-name">{{ data.bookedTag }}</h2>
      </div>
      <div class="card-list-wrapper">
        <a :href="post.path" v-for="(post, index) in data.displayed" :key="index">
          <div class="connected-post-card">
            <div class="post-image">
              <img :src="post.header.thumbnail" />
            </div>
            <div class="post-title">
              <span>{{ post.header.title }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="paginated-area">
        <div class="paging-button-group">
          <nav aria-label="태그 검색 페이지 공간">
            <ul class="page-index">
              <li class="page-item" :class="{ disabled: !data.pagingResult.has_previous_page}">
                <a :href="methods.getPage(data.currentPath, data.pagingResult.previous_page)" class="page-link">이전</a>
              </li>
              <li v-for="index in methods.rangeArray(data.pagingResult.first_page, data.pagingResult.last_page)"
                  :key="index" class="page-item"
                  :class="{ disabled: data.pagingResult.current_page === index}">
                <a :href="methods.getPage(data.currentPath, index)" class="page-link">
                  <span>{{ index }}</span>
                </a>
              </li>
              <li class="page-item" :class="{ disabled: !data.pagingResult.has_next_page}">
                <a :href="methods.getPage(data.currentPath, data.pagingResult.next_page)" class="page-link">다음</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TagArea from "@/components/layout/content/component/post-card/TagArea.vue";
import appCache from "@/store/appCache";
import {useRoute} from "#app";
import Paginator from 'paginator'
import {usePostContentStore} from "@/store/PostContentStore";

const route = useRoute();
const postContentStore = usePostContentStore();

const params = route.params
const path = route.fullPath
const booked = params.tag ? params.tag : ''
const page = params.page ? params.page : 0
const bookedList = appCache.tagMap.store.get(booked)

const decoded = decodeURI(booked)
const isNotUndefined = typeof bookedList !== undefined
const postList = decoded && isNotUndefined
    ? appCache.tagMap.store.get(decoded).map((path) => postContentStore.get(path))
    : []

const paginated = new Paginator(6, 4)
    .build(postList.length, page)

const displayedPosts = postList.slice(paginated.first_result, paginated.last_result +1)

const data = {
  tagMap: appCache.tagMap,
  currentPath: path,
  bookedTag: booked,
  posts: postList,
  pagingResult: paginated,
  displayed: displayedPosts,
  cur_page: 0
}

const components = {
  TagArea
}

const methods = {
  getPage(path, page) {
    const idx = path.lastIndexOf('/') +1
    const num = path.replace(path.substring(idx), page)
    return num === '/-1' || num === '/1' ? '#' : num
  },
  rangeArray(start, end) {
    return [...Array(end - start + 1)]
        .map((ele, i) => i + start)
  }
}
</script>
<style lang="scss">
@import "@styles/index";

$card-width: 200px;

.tag-page-container {
  width: 600px;
  margin: 0 auto;
  min-height: 600px;

  .page-title-area {
    margin-bottom: 20px;

    .page-title {
      color: #3eaf7c;
      margin: 20px 0px;
    }

  }
  .connected-post {
    margin: 20px 0px;

    .current-booked-tag {
      color: #3eaf7c;
    }

    .card-list-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      max-width: calc($card-width * 3);
      margin: 20px auto;

      a {
        display: contents;

        .connected-post-card {
          border-radius: 15px;
          font-size: .84rem;
          width: calc($card-width - 40px);

          .post-image {
            height: 90px;
            border-radius: 15px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .post-title {
            margin: 15px 0px;
          }

          &:hover {
            cursor: pointer;


            .post-title {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .paginated-area {

      .paging-button-group {
        min-width: 100px;
        padding: 20px;

        .page-index {
          list-style: none;
          display: flex;
          border-radius: 15px;
          justify-content: center;
          -webkit-box-pack: center;

          .page-item {

            .page-link {
              text-decoration: none;
              color: #007bff;
              border: 1px solid #dee2e6;
              position: relative;
              display: block;
              padding: 0.5rem 0.75rem;
              margin-left: -1px;

              &:hover {
                color: #0056b3;
                text-decoration: none;
                background-color: white;
                border-color: #dee2e6;
                transition: 0s;
              }

              &.current {
                cursor: default;
                background-color: #3b3939;
              }

            }

            &:first-child {

              .page-link {

                border-top-left-radius: .25rem;
                border-bottom-left-radius: .25rem;
              }
            }

            &:last-child {

              .page-link {
                border-top-right-radius: .25rem;
                border-bottom-right-radius: .25rem;
              }
            }

            &.disabled {

              .page-link {
                color: #6c757d;
                pointer-events: none;
                cursor: auto;
                border-color: #dee2e6;
              }

            }
          }
        }
      }
    }
  }

}

.dark .tag-page-container {

  .page-title-area {

    .page-description {
      color: white;
    }
  }

  .connected-post {
    color: white;

    .card-list-wrapper {

      .connected-post-card {
        border-color: $linear-dark-color;
        color: white;

        .post-image {
          filter: brightness(70%);
        }
      }
    }

    .paginated-area {

      .paging-button-group {

        .page-index {

          .page-item {

            .page-link {
              border-color: $linear-dark-color;

              &:hover {

                background-color: $main-dark-color;
              }
            }
          }
        }
      }
    }
  }

}
@include tablet() {

}

@include mobile() {

}




</style>
