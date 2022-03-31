<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header v-if="$router.currentRoute.value.path !== '/' && $router.currentRoute.value.path !== '/admin' " class="q-pr-xl" >
      <q-toolbar class="flex justify-evenly items-center q-my-auto" style="height:20vh">

    <!-- Timer Display  -->
      <div class="container text-h6 text-primary q-py-sm bg-secondary" style="width:150px; border-radius:4px">
        <div class="row justify-evenly">
          <div class="hours">{{ hours }}</div>
          <div class="divider">:</div>
          <div class="minutes">{{ minutes }}</div>
          <div class="divider">:</div>
          <div class="seconds">{{ seconds }}</div>
        </div>
      </div>

        <q-space/>

<!-- Search Bar  -->
        <div  style=" width:400px;" v-if="$router.currentRoute.value.path !== '/support' ">
          <q-input rounded standout="bg-accent" v-model="text" placeholder="Search"  dense="dense" >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <q-space/>

<!-- Defense Logo -->
        <div class="column flex-center">
          <p class="q-mb-xs text-secondary text-bold">TASK SHARE</p>
           <q-avatar size="4rem" class="">
            <img src="../assets/defense.png" alt="">
          </q-avatar>
        </div>


      </q-toolbar>
    </q-header>
    <!-- ESSENTIAL LINK FOR NORMAL USER -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="overflow-y:hidden"
      v-if="!(this.$router.currentRoute.value.path.split('/').includes('admin')) && this.$router.currentRoute.value.path !== '/' "
    >
      <q-list>
        <EssentialLink  />
      </q-list>
    </q-drawer>

    <!-- ESSENTIAL LINK FOR ADMIN -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="overflow-y:hidden"
      v-if="(this.$router.currentRoute.value.path.split('/').includes('admin')) && this.$router.currentRoute.value.path !== '/admin' ">
      <q-list>
        <AdminEssentialLink  />
      </q-list>
    </q-drawer>

    <q-page-container>
        <!-- <Watermark v-if="this.$router.currentRoute.value.path !== '/' && this.$router.currentRoute.value.path !== '/admin'" class="q-mx-auto" /> -->
      <router-view >  </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import AdminEssentialLink from 'components/admin-pages/AdminEssentialLink.vue'
import Watermark from 'components/Watermark.vue'


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink, AdminEssentialLink, Watermark
  },

  data () {
    const leftDrawerOpen = ref(false)

    return {
      adminLogged: this.$router.currentRoute.value.path.split('/').includes('admin'),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      hours: 0,
      minutes: 0,
      seconds: 0,
      text:""
    }
  },
  mounted() {
    setInterval(() => this.setTime(), 1000);
    // console.log(this.$router.currentRoute.value.path);
  },
  methods: {
    setTime() {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
      minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
      seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    }
  }

})
</script>

<style scoped>
.LCD > div {
  font-family: "alarm clock";
  font-size: x-large;
}
</style>
