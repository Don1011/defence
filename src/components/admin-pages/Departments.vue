<template>
    <div class="q-pa-md bg-primary" style="height:80vh">
      <div class="q-gutter-y-md" style="width: 100%">
        <q-card>
          <q-expansion-item
            dense
            dense-toggle
            expand-separator
            icon="add"
            label="Add Department"
            class = "accordion-label"
          >
            <q-card>
              <q-card-section>
                <div class="column">
                  <div class="bg-white col q-px-md column justify-between q-pb-md" style="height:300px;border-radius:0 0 4px 4px">
                    <div class = "q-mx-xl">
                      <q-input v-model="deptName" label="Department Name:" class="text-capitalize" />
                      <q-input  v-model="abbr" placeholder="Department Abbreviation:" @keyup="this.abbr = this.abbr.toUpperCase();"/>
                      <!-- <q-input label="Department:" /> -->
                    </div>

                    <div class="row justify-center q-mt-xl " style="height:40px">
                      <div style="width:20%" class="row">
                        <q-btn label="Add" @click="onSubmit" style="width: 50%;" color="negative"/>
                      </div>
                    </div>
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-card>
        <q-card flat class="bg-primary" >
           <!-- Water Marked Image  -->
          <Watermark />
          <q-scroll-area style="height: 65vh;">
            <div class="text-subtitle2 text-secondary">
              <!-- Incomings -->
              <q-list separator v-for="department in departments" :key="department._id"  class="q-mb-sm">
                <DeptItem :department="department" />
              </q-list>
            </div>
          </q-scroll-area>
        </q-card>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import DeptItem from './presentational/DeptItem.vue';
import Watermark from '../Watermark.vue';



export default {
  components: {
    DeptItem,
    Watermark
  },
  setup () {
    return {

      deptName: ref(''),
      abbr: ref(''),

      departments: []

    }
  },
  methods: {

    onReset () {
      this.deptName = ""
      this.abbr = ""
    },

    fetchDepartments(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getAllDepartmentsAdmin')
      .then(() => {
        this.$q.loading.hide();
        this.departments = this.$store.getters['defencestore/rawDepartments']
        // console.log(departments);
      })
      .catch(err => {
        this.$q.loading.hide();
      })
    },

    onSubmit () {
      if(this.deptName !== "" && this.abbr !== "" ){
        this.$q.loading.show();
        this.$store.dispatch('defencestore/createDepartment', {
          name: this.deptName,
          abbr: this.abbr,
        })
        .then(()=> {
          this.fetchDepartments();
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
  },
  mounted(){
    this.fetchDepartments();
  }
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
  .clear{
  clear: both;
}


.slide-toggle{
  display: none;
}

/* .slidemenu{
  font-family: arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  overflow: hidden;
} */

.slidemenu label{
  width: 25%;
  text-align: center;
  display: block;
  float: left;
  color: #333;
  opacity: 0.2;

}

.slidemenu label:hover{
  cursor: pointer;
  color: #666;
}

/* .slidemenu label span{
  display: block;
  padding: 10px;
} */
/*
.slidemenu label .icon{
  font-size: 20px;
  border: solid 2px #333;
  text-align: center;
  height: 50px;
  width: 50px;
  display: block;
  margin: 0 auto;
  line-height: 50px;
  border-radius: 50%;
} */

/*Bar Style*/

.slider{
  width: 100%;
  height: 5px;
  display: block;
  background: #ccc;
  margin-top: 10px;
  border-radius: 5px;
}

.slider .bar{
  width: 50%;
  height: 5px;
  background: #333;
  border-radius: 5px;
}

/*Animations*/
.slidemenu label, .slider .bar {
  transition: all 500ms ease-in-out;
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
}

/*Toggle*/

.slidemenu .slide-toggle:checked + label{
  opacity: 1;
}



.slidemenu #slide-item-1:checked ~ .slider .bar{ margin-left: 0; }
.slidemenu #slide-item-2:checked ~ .slider .bar{ margin-left: 50%; }
/* .slidemenu #slide-item-3:checked ~ .slider .bar{ margin-left: 50%; }
.slidemenu #slide-item-4:checked ~ .slider .bar{ margin-left: 75%; } */

.accordion-label{
  padding: 12px
}

</style>
