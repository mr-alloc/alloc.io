<template>
  <div class="profile-image">
    <NuxtLink v-bind:to="'/'"><img :src="userInfoStore.profile_image" /></NuxtLink>
  </div>
</template>

<script>

import {userInfoStore} from "@/store";

export default {
  data () {
    return {
      userInfoStore
    }
  },
  methods: {

  }
}

</script>
