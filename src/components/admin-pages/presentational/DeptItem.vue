<template>

      <q-item clickable class="row text-center  bg-white" style="border-radius: 4px">
        <div class="row col-9">
          <q-item-section  >{{department.name}} </q-item-section>
          <q-item-section>{{department.abbr}} </q-item-section>
        </div>
        <q-item-section>
          <div class="row justify-evenly">
            <q-btn @click="editDialog = true" label="Edit" class="bg-negative text-white text-subtitle2" style="width: 40%;"/>
            <q-btn @click="deleteDialog = true" label="Delete" class="bg-red text-white text-subtitle2" style="width: 40%; height:30px"/>
          </div>
        </q-item-section>

        <!-- Delete Dialog -->
        <q-dialog v-model="deleteDialog" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="delete" color="red" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to delete?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Cancel" color="secondary" v-close-popup />
                <q-btn flat label="Yes" color="red" v-close-popup @click="deleteDept" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Edit Dialog -->
        <q-dialog v-model="editDialog" persistent>
            <q-card>
                <q-card-section class="items-center">
                    <div class="column q-mt-md">
                        <div class="bg-white col q-px-md column justify-between q-pb-md" style="height:300px;border-radius:0 0 4px 4px">
                            <div class = "q-mx-sm">
                                <q-input label="Department Name:" />
                                <q-input label="ABBR:" />
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red" v-close-popup />
                <q-btn label="Save" color="negative"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-item>

</template>

<script>
import { ref } from 'vue'

export default {
    setup () {
        const editDialog = ref(false)
        const deleteDialog = ref(false)
        return {
            editDialog, deleteDialog
        }
    },
    props: ['department', 'deleteDept'],
    methods: {

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
