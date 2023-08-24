\<template>
  <div class="post-preview-header">
    <div class="profile-image">
      <img :src="`${methods.getProfileOrDefault(props.header.profile_image)}`" />
    </div>
    <div class="author-info">
      <a href="{{`https://github.com/${b}`}}" target="_blank">
        <span class="author-name">
            {{ blogInfo.fullname }}
        </span>
      </a>
      <span class="author-work-at">{{ props.header.current_position }}, {{ props.header.current_company }}</span>
      <span class="posting-date">
              <font-awesome-icon class="clock-icon" :icon="['fa', 'clock']"/>
              {{ calPostDate(props.header.date) }}
            </span>
    </div>
  </div>
</template>


<script lang="ts" setup>

import {blogInfo} from "~/store/site";
import {calPostDate} from "~/utils/settingUtils";
import {Header} from "~/class/implement/Header";

const data = {
  calPostDate
}

const props = defineProps({
  header: Header,
})

const methods = {
  getProfileOrDefault(path: string) {
    const defaultPath = '/assets/blogging/profile/default.jpeg'

    const returnPath = path == undefined
        ? defaultPath
        : path

    return returnPath
  },
  getCompanyLogoPath(company: string) {
    if (company) {
      return `/assets/company/${company.toLowerCase().replace(' ', '')}.png`
    }
  }
}
</script>

<style lang="scss">
@import '@/styles';

.post-preview-header {
  padding: 20px 30px;
  display: flex;

  .profile-image {
    display: inline-block;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .author-info {
    padding: 0px 10px;
    width: 80%;

    img {
      width: 15px;
      height: 15px;
    }
    span {
      display: block;
      color: #6b6b6b;
      line-height: 18px;

      &.author-name {
        display: inline-block;
        color: black;
        font-weight: bold;
        transition: color 0s;

        &:hover {
          color: #2997ff;
          text-decoration: underline;
        }
      }

      &.posting-date {
        font-size: .81rem;
      }
    }
  }
}


@include tablet() {

  .post-preview-header {

    .author-info {

      .author-work-at {
        font-size: .84rem;
      }
    }
  }
}

@include mobile() {

  .post-preview-header {
    padding: 15px 15px;

    .author-info {

      .author-work-at {
        font-size: .84rem;
      }
    }
  }
}

.dark .post-preview-header {

  .author-info {

    .author-name {
      color: #2997ff;
      cursor: pointer;
    }

    .author-work-at {
      color: white;
    }
  }
}
</style>
