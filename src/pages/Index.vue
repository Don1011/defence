<template>
  <q-page class="bg-primary" :onload="$router.currentRoute.value.path == '/' ">
    <!-- <Login /> -->
    <!-- <Request /> -->

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Login from 'components/Login.vue'
import Request from 'components/Request.vue'

export default defineComponent({
  name: 'PageIndex',
  components:{
    Login,
    Request
  },

})
</script>

