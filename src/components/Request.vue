<template>
    <div class="q-pa-md bg-primary" style="height:80vh">

      <!-- Water Marked Image  -->
        <!-- <Watermark /> -->


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
              <q-tab name="incomings"  @click="selected = 1"  :ripple="false"  class="q-mx-auto q-px-none q-py-md" style="width:100%; " > <p  :class="{highlight:selected == 1}" style="border-radius: 15px" class="hello q-px-xl q-py-sm q-my-auto " >Incoming Request</p> </q-tab>
            </div>

            <div class="col-6">
              <q-tab name="outgoings" @click="selected = 2"  :ripple="false" class="q-mx-auto q-px-none q-py-md " style="width:100%; " > <p  :class="{highlight:selected == 2}" style="border-radius: 15px" class="  q-px-xl q-py-sm q-my-auto " >Outgoing Request</p> </q-tab>
            </div>
          </q-tabs>

          <q-tab-panels v-model="label" animated class="bg-primary text-white q-pt-lg">
            <q-tab-panel name="incomings" >
               <q-scroll-area style="height: 59vh;">
                 <div class="text-subtitle2 text-secondary">
                <!-- Incomings -->
                  <q-list separator v-for="incomingRequest in incomingRequests" :key="incomingRequest._id" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" style="border-radius: 4px">
                      <div class="row col-9" @click="this.$router.push(`/request-message/${incomingRequest._id}`)">
                        <q-item-section  >Request from {{incomingRequest.from.abbr}}</q-item-section>
                        <q-item-section>{{incomingRequest.title}} </q-item-section>
                        <q-item-section>{{incomingRequest.createdAt.split("T")[0]}}, {{incomingRequest.createdAt.split("T")[1].split(".")[0]}}</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> {{incomingRequest.metaData.status}}</span>
                          <!-- <q-btn label="Comments" class="bg-negative text-white text-subtitle2" style="width: 40%;"/> -->
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
              </div>
              </q-scroll-area>
            </q-tab-panel>

            <q-tab-panel name="outgoings" style="z-index: 5">
              <q-scroll-area style="height: 59vh;">
                <div class="text-subtitle2 text-secondary">
                  <!-- Outgoings -->
                  <q-list separator v-for="outgoingRequest in outgoingRequests" :key="outgoingRequest._id" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" style="border-radius: 4px">
                      <div class="row col-9" @click="this.$router.push(`/request-message/${outgoingRequest._id}`)">
                        <q-item-section  >Request to {{outgoingRequest.to.abbr}}</q-item-section>
                        <q-item-section>{{outgoingRequest.title}} </q-item-section>
                        <q-item-section>{{outgoingRequest.createdAt.split("T")[0]}}, {{outgoingRequest.createdAt.split("T")[1].split(".")[0]}}</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> {{outgoingRequest.metaData.status}}</span>
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

<!-- Add Mail Button  -->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
        round
        size="1.3rem"
        class="q-mr-md q-mb-lg"
          icon="add"
          color="positive"
          @click="bar = true"
        />

      </q-page-sticky>

    <!-- Dialog for Request  -->
     <q-dialog v-model="bar" persistent>
          <q-card style="width: 1200px; max-width: 90vw;margin-left: 20%">
            <q-bar class="bg-secondary text-white" style="height:60px">
              <p class="text-h6 q-my-auto">New Request</p>

              <q-space />

              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
                <div class="column">
                  <div class="bg-white col q-px-md column justify-between q-pb-md" style="height:300px;border-radius:0 0 4px 4px">
                    <!-- <div class="row q-mx-auto" style="width:100%" > -->
                      <!-- <div class="bg-white " style="width: 260px;border-radius:10px"> -->
                          <q-select  v-model="to" :options="departments" use-input input-debounce="0" label="Select Department To"  >
                            <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    No results
                                  </q-item-section>
                                </q-item>
                              </template>
                          </q-select>
                        <!-- </div> -->
                      <!-- </div> -->
                    <q-input v-model="title" label="Title:" />
                    <q-input v-model="comments" type="textarea" placeholder="Add Comments" />
                    <!-- <q-file  @change="fileSelected" ref="selectImageFile" type = "file"  /> -->
                    <q-file
                      v-model="selectedFile"
                      label="Attach File"
                      square
                      flat
                      use-chips
                      clearable
                      accept=".csv,.txt,.xls,.xlsx,.doc,.docx,.pdf,.dbf,.zip,.rar,.7z,.jpg,.png,.gif"
                      max-files="1"
                      max-file-size="5120000"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>

                    <div class="row justify-between q-mt-xl " style="height:40px">
                      <div style="width:20%" class="row">
                        <q-btn @click="submitRequest" label="send" style="width: 50%;" color="negative"/>
                      </div>
                      <!--
                      <div style="width:13%" class="row justify-evenly">
                        <q-btn round color="secondary" icon="attach_file" @click="selectFile" />
                      </div>
                      -->
                    </div>
                  </div>
                </div>

            </q-card-section>
          </q-card>
        </q-dialog>

  </div>
</template>

<script>
import { ref } from 'vue'
// import Watermark from 'components/Watermark.vue'

export default {
  components:{
    // Watermark
  },
  setup () {
    return {
      label: ref('incomings'),
      bar: ref(false),
      model1: ref(null),
      selected: 1,

      to: ref(""),
      title: ref(""),
      comments: ref(""),
      selectedFile: ref(null),

      departments: [],
      incomingRequests: [],
      outgoingRequests: [],

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
    submitRequest(){
      let ref = `NA/2022/${Math.floor(Math.random() * 1000)}/${Math.floor(Math.random() * 4000.93)}`;
      if(this.to !== "" && this.title !== "" && this.comments !== ""){
        this.$store.dispatch('defencestore/sendRequest', {
          to: this.to,
          title: this.title,
          text: this.comments,
          files: this.selectedFile,
          reference: ref
        })
        .then(()=>{
          window.location.reload();
        })
      }else{
        Notify.create({
          message: 'You can\'t leave the "to", "title" or "Comments" fields empty.',
          color: 'red'
        })
      }
    },
    fetchDepartments(){
      this.$store.dispatch('defencestore/getDepartments')
      .then(() => {
        this.departments = this.$store.getters['defencestore/getDepartments']
      });
    },
    fetchRequests(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getRequests')
      .then(()=>{
        let req = this.$store.getters['defencestore/getRequests'];
        this.incomingRequests = req.incoming;
        this.outgoingRequests = req.outgoing;
        this.$q.loading.hide();
      })
      .catch(err=>this.$q.loading.hide())
    }
  },
  mounted(){
    this.fetchDepartments();
    this.fetchRequests();
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
