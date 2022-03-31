<template>
    <div class="q-pa-md bg-primary" style="height:80vh">
      <div class="q-gutter-y-md" style="width: 100%">
        <q-card flat class="" >
          <q-tabs
            v-model="label"
            class=" text-secondary bg-primary q-pa-none text-white "
            align="justify"
            indicator-color="positive"
            v-ripple="false"
            style=""
          >
            <div class="col-6">
              <q-tab name="mails"  @click="selected = 1"  :ripple="false"  class="q-mx-auto q-px-none q-py-md" style="width:100%; " > <p  :class="{highlight:selected == 1}" style="border-radius: 15px" class="hello q-px-xl q-py-sm q-my-auto " >Pending Issues</p> </q-tab>
            </div>

            <div class="col-6">
              <q-tab name="alarms" @click="selected = 2"  :ripple="false" class="q-mx-auto q-px-none q-py-md " style="width:100%; " > <p  :class="{highlight:selected == 2}" style="border-radius: 15px" class="  q-px-xl q-py-sm q-my-auto " >Solved Issues</p> </q-tab>
            </div>
          </q-tabs>

          <q-tab-panels v-model="label" animated class="bg-primary text-white q-pt-lg">
            <q-tab-panel name="mails">

                <!-- Water Marked Image  -->
                <Watermark />
              <q-scroll-area style="height: 59vh;">
                <div class="text-subtitle2 text-secondary">
                  <!-- Outgoings -->
                  <q-list separator v-for="n in 7" :key="n" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" @click="this.$router.push('/admin/message')" style="border-radius: 4px">
                      <div class="row col-10" >
                        <q-item-section  >Request to DDA</q-item-section>
                        <q-item-section>Network is not working and the windows </q-item-section>
                        <q-item-section>Oct /13/2021 : 10:30am.</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> Pending</span>
                          <!-- <q-btn label="Comments" class="bg-negative text-white text-subtitle2" style="width: 40%;"/> -->
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-scroll-area>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <q-scroll-area style="height: 59vh;">
                <div class="text-subtitle2 text-secondary">
                  <!-- Outgoings -->
                  <q-list separator v-for="n in 7" :key="n" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" @click="this.$router.push('/message')" style="border-radius: 4px">
                      <div class="row col-10" >
                        <q-item-section  >Request to DDA</q-item-section>
                        <q-item-section>Network is not working and the windows </q-item-section>
                        <q-item-section>Oct /13/2021 : 10:30am.</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> Solved </span>
                          <!-- <q-btn label="Comments" class="bg-negative text-white text-subtitle2" style="width: 40%;"/> -->
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import Watermark from '../Watermark.vue';

const stringOptions = [
  'Department A', 'Department B', 'Department C', 'Department D', 'Department E', 'Department F'
]


export default {
  components:{
    Watermark
  },
  setup () {
    const options = ref(stringOptions)
    return {
      mails: [],
      options,
      label: ref('mails'),
      bar: ref(false),
      model1: ref(null),
      selectedFile: ref(null),
      selected: 1,
      onClick () {
        console.log('Clicked on a fab action')
      },


      // Filter Function
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  },
 methods: {
    selectFile(){
      this.$refs.selectImageFile.$el.click();
    },
    fileSelected(el){
      el=el.split('\\');
      el=el[el.length-1];
      this.selectedFile = el;
    },
    unSelectFile(){
      this.selectedFile = null;
    },
    getMails(){

    }
  },
  mounted(){
    // this.getMails()
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

</style>
