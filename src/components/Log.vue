<template>
    <q-item clickable class="row text-center q-mb-sm bg-white" style="border-radius: 4px" @click="this.$router.push(`/log-message/${log._id}`)">
      <div class="row col-9">
        <q-item-section  >Request from {{log.from.abbr}} to {{log.to.abbr}}</q-item-section>
        <q-item-section>{{log.title}} </q-item-section>
        <q-item-section>{{log.createdAt.split("T")[0]}}, {{log.createdAt.split("T")[1].split(".")[0]}}</q-item-section>
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
  props: ['log'],
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
