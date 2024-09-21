\<template>
  <div class="post-preview-header">
    <div class="profile-image">
      <img :src="props.header?.profileImage ?? '/blogging/profile/default.jpeg'" alt="Profile Image" />
    </div>
    <div class="author-info">
      <div class="">
        <a :href="`https://github.com/${appCache.blogInfo.fullName}`" target="_blank">
          <span class="inline-block font-bold text-emerald-500 dark:text-emerald-50">{{ appCache.blogInfo.fullName }}</span>
        </a>
      </div>
      <div class="font-small-medium">{{ props.header.currentPosition }}, {{ props.header.currentCompany }}</div>
      <div class="font-small-medium flex justify-start items-center">
        <span class="px-1.5">
          <FontAwesomeIcon class="clock-icon" :icon="['fa', 'clock']"/>
        </span>
        <span class="inline-block">
          {{ calPostDate(props.header.date.toString()) }}
        </span>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import appCache from "@/store/appCache";
import {calPostDate} from "@/utils/settingUtils";
import Header from "@/classes/implement/Header";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps<{
  header: Header,
}>();
</script>

<style lang="scss" scoped>
@import '@styles/index';

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
    padding: 0 10px;
    width: 80%;

    img {
      width: 15px;
      height: 15px;
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
