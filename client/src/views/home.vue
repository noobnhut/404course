<template>
  <navbar />
  <router-view/>
</template>

<script>

import navbar from '../components/header/navbar.vue'
import userService from '../plugins/userServices';

export default {
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    this.user = userService.getUserToken()
    if (this.user.role == 'Admin') {
      this.$router.push({ name: 'admin' });
    }
  },
  components: { navbar },
}


</script>