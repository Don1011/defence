<template>
  <div style="height:80vh" class="bg-primary q-pt-lg">

      <!-- <Watermark /> -->

    <p class="text-italic text-center q-px-md text-bold text-secondary text-h4 q-mx-auto">Having a Problem?</p>

     <div class="q-pa-md q-mx-auto bg-white " style="max-width: 70%; z-index:1; border: 1px solid #1C2E3D; border-radius: 5px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-lg q-py-lg"

      >

        <q-input filled  v-model="name"  label="Your Name *"  :rules="[ val => val && val.length > 0 || 'Please type something']" class="bg-white q-pa-none" />

        <q-select
        class="bg-white q-py-none"
        filled
          v-model="single"
          :options="options"
          label="Department"
          lazy-rules
          :rules="[ val => val = val != null || 'Please select your department']"
        />

        <q-input
          label="Description"
          v-model="text"
          filled
          type="textarea"
          class="bg-white q-py-none"
          :rules="[ val => val && val.length > 0 || 'Please type the problem you\'re facing']"
        />

        <div>
          <q-btn label="Submit" type="submit" style="width:20%" color="negative"/>
          <q-btn label="Cancel" type="reset"   color="positive" style="width:20%" class="q-ml-sm" flat/>
        </div>
      </q-form>

    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import Watermark from 'components/Watermark.vue'

export default {
  name: 'Support',
   components:{
    Watermark
  },
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const text = ref(null)
    const single = ref(null)

    return {
      name,
      single,
      text,

      options: [
        'Department A', 'Department B', 'Department C', 'Department D', 'Department E'
      ],

      onSubmit () {
        // if (accept.value !== true) {
        //   $q.notify({
        //     color: 'red-5',
        //     textColor: 'white',
        //     icon: 'warning',
        //     message: 'You need to accept the license and terms first'
        //   })
        // }
        // else {
        //   $q.notify({
        //     color: 'green-4',
        //     textColor: 'white',
        //     icon: 'cloud_done',
        //     message: 'Submitted'
        //   })
        // }
      },

      onReset () {
        name.value = null
        single.value = null
        text.value = null
        // this.single =  ref(null)
        // this.text = ref('')
      }
    }
  }
}
</script>



<style scoped>

</style>
