<template>
    <q-list v-show="!(itemList.length>0)" separator >
        <q-item clickable class="row justify-center q-mb-sm bg-white" style="border-radius: 4px">
            {{message}}
        </q-item>
    </q-list>
</template>

<script>
import { ref } from 'vue'
import Watermark from 'components/Watermark.vue'


export default {
    components:{
        Watermark
    },
    props: ['itemList', 'message']
 
}
</script>

<style scoped>

p{
  background: #1C2E3D;
}
.highlight{

  background-color: white !important;
  color: #FE0D0D;


}
</style>
