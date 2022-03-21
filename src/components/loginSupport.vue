<template>
  <div style="height:100vh" class="bg-primary q-pt-md">


      <div class="row justify-evenly">
        <!-- <q-btn icon="arrow_back" rounded flat=""/> -->
        <q-space/>
        <q-avatar size="100px" style="background:#D4E1E8">
          <img src="../assets/defense.png">
        </q-avatar>
        <q-space/>
      </div>


    <p class="text-italic text-center q-px-md text-bold text-secondary text-h4 q-mt-md q-mx-auto">Having a Problem?</p>

     <div class="q-pa-md q-mt-md q-mx-auto bg-white " style="max-width: 60%; z-index:1; border: 1px solid #1C2E3D; border-radius: 5px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-lg q-py-lg"

      >



        <q-input filled  v-model="name"  label="Full Name" class="bg-white q-pa-none" />
        <q-input filled  v-model="title"  label="Title"  class="bg-white q-pa-none" />

        <q-input
          label="State Your Problem Here..."
          v-model="text"
          filled
          type="textarea"
          class="bg-white q-py-none"

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

export default {
  name: 'Support',
   components:{
  },
  data () {
    return {
      name: "",
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
        if(this.title !== "" && this.text !== "" && this.name !== "" ){
          this.$q.loading.show();
          this.$store.dispatch('defencestore/loginSupport', {
            name: this.name,
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
        this.name = ""
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
