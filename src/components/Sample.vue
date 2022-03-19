<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 70vh" class="shadow-2 rounded-borders">

          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />



      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="280"
        :breakpoint="500"
        class="bg-grey-3"
      >
          <div class="q-pa-sm column q-my-auto flex-center">
            <div v-for="n in 10" :key="n">Drawer {{ n }} / 50</div>
          </div>
      </q-drawer>

      <q-page-container>
        <q-page padding>

          Content

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawerRight: ref(false)
    }
  }
}

</script>



