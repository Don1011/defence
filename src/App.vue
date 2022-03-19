<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  mounted(){
    // let $store = useStore();
    // Using the getters to get state values
    // console.log($store.getters['defencestore/getNames'])

    // Using the dispatch to dispatch actions
    // $store.dispatch('defencestore/triggerAddName', "Aaron");

    // Using the commit to trigger mutations
    // $store.commit('defencestore/addName', "Moses");

    // console.log($store);
    // console.log($store.state.defencestore.names);
  }
})
</script>
