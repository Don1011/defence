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
                      <q-input v-model="deptName" label="Department Name:"  />
                      <q-input  v-model="abbr" label="Department Abbreviation:"/>
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
          <q-scroll-area style="height: 65vh;">
            <div class="text-subtitle2 text-secondary">
              <!-- Incomings -->
              <q-list separator v-for="n in 15" :key="n"  class="q-mb-sm">
                <DeptItem />
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



export default {
  components: {
    DeptItem
  },
  setup () {
    return {

      deptName: ref(''),
      abbr: ref(''),

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
    onSubmit () {
        console.log(this.title);
        console.log(this.text);
        if(this.deptName !== "" && this.abbr !== "" ){
          this.$q.loading.show();
          this.$store.dispatch('defencestore/createDepartment', {
            name: this.deptName,
            abbr: this.abbr,
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
        this.deptName = ""
        this.abbr = ""
      },

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
