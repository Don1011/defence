<template>
<div class="bg-primary q-px-xl" style="height:80vh">




  <div class="row justify-between q-py-md" style="width:100%">
    <p class="text-bold text-h5 text-secondary q-my-auto">HISTORY</p>
    <!-- <q-btn color="positive" style="width:100px" label="Delete" no-caps /> -->
  </div>
       <!-- Water Marked Image  -->
        <Watermark />
  <q-scroll-area style="height: 70vh;">
    <div class="text-subtitle2 text-secondary" >
        <EmptyList :itemList="logs" message="No logs to show" />
        <q-list separator v-for="log in logs" :key="log._id" >
          <Log :log="log" />
      </q-list>
    </div>
  </q-scroll-area>
</div>

</template>

<script>
import Log from 'components/Log.vue'
import Watermark from 'components/Watermark.vue'
import EmptyList from 'components/EmptyList.vue'

export default {
  name: 'Logs',
  components:{
    Log,
    Watermark,
    EmptyList
  },
  data(){
    return{
      logs: []
    }
  },
  methods: {
    fetchRequests(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getLogs')
      .then(()=>{
        let req = this.$store.getters['defencestore/getLogs'];
        this.logs = req;
        this.$q.loading.hide();
      })
    }
  },
  mounted(){
    this.fetchRequests();
  }
}
</script>

<style scoped>

</style>
