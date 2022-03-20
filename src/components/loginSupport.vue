<template>
  <div style="height:100vh" class="bg-primary q-pt-xl">

      <Watermark />

    <p class="text-italic text-center q-px-md text-bold text-secondary text-h4 q-mx-auto">Having a Problem?</p>

     <div class="q-pa-md q-mt-xl q-mx-auto bg-white " style="max-width: 60%; z-index:1; border: 1px solid #1C2E3D; border-radius: 5px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-lg q-py-lg"

      >

        <q-input filled  v-model="title"  label="What problem do you have? *"  :rules="[ val => val && val.length > 0 || 'Please type something']" class="bg-white q-pa-none" />

        <q-input
          label="Explain further... *"
          v-model="text"
          filled
          type="textarea"
          class="bg-white q-py-none"
          :rules="[ val => val && val.length > 0 || 'Please type the problem you\'re facing']"
        />

        <div>
          <q-btn label="Submit" type="submit" style="width:20%" color="negative"/>
          <q-btn label="Cancel" type="reset"  color="positive" style="width:20%" class="q-ml-sm" flat/>
        </div>
      </q-form>

    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import Watermark from 'components/Watermark.vue'

export default {
  name: 'Support',
   components:{
    Watermark
  },
  data () {
    return {
      title : "",
      // dept : "",
      text : "",
      // departments: []
    }
  },
  methods: {
      onSubmit () {
        console.log(this.title);
        console.log(this.text);
        if(this.title !== "" && this.text !== "" ){
          this.$q.loading.show();
          this.$store.dispatch('defencestore/sendSupportMessage', {
            title: this.title,
            text: this.comments
          })
          .then(()=> {
            this.$q.loading.hide();
            this.onReset()
          })
        }else{
          // this.$q.loading.hide();
          Notify.create({
            message: "You must fill the form completely before submitting",
            color: "red"
          })
        }
      },
      onReset () {
        this.title = ""
        // this.dept = ""
        this.text = ""
      },
      // fetchDepartments(){
      //   this.$store.dispatch('defencestore/getAllUserDepartments')
      //   .then(() => {
      //     this.departments = this.$store.getters['defencestore/getDepartments']
      //   });
      // }
  },
  mounted(){
    // this.fetchDepartments();
  }
}
</script>



<style scoped>

</style>
