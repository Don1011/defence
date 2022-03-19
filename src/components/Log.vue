<template>
    <q-item clickable class="row text-center q-mb-sm bg-white" style="border-radius: 4px">
      <div class="row col-9">
        <q-item-section  >Request to DDA</q-item-section>
        <q-item-section>Network is not working and the windows </q-item-section>
        <q-item-section>Oct /13/2021 : 10:30am.</q-item-section>
      </div>
      <q-item-section >
        <div class="row justify-evenly text-subtitle2">
          <p class="text-negative q-my-auto  text-subtitle2" style="width: 31%;"> Completed </p>
            <!-- <div style="width: 39%">Oct /13/2021 <br> 10:30am.</div> -->
          <q-btn label="Comments" no-caps class="bg-negative text-white text-subtitle2" style="width: 30%;"/>
        </div>
      </q-item-section>
    </q-item>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Log',
  setup () {
    return {
      val: ref(false),
      logs: []
    }
  },
  methods: {
    fetchLogs(){
      this.$store.dispatch('defencestore/getLogs')
      .then(()=>{
        let req = this.$store.getters['defencestore/getLogs'];
        // this.logs = req;
      })
    }
  },
  mounted(){
    this.fetchLogs();

  }
}
</script>

<style scoped>

</style>
