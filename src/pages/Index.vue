<template>
  <q-page class="bg-primary"  :onload="$router.currentRoute.value.path == '/' ">
    <!-- <Login /> -->
    <!-- <Request /> -->


  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Login from 'components/Login.vue'
import Task from 'src/components/Task.vue'

export default defineComponent({
  name: 'PageIndex',
  components:{
    Login,
    Task
  },

})
</script>

