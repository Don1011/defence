<template>
    <q-layout view="hHh Lpr lff" container style="height: 80vh" class="shadow-2 rounded-borders">

      <div class="start">

        <q-drawer
            side="right"
            v-model="drawerRight"
            bordered
            :width="300"
            :breakpoint="500"
            class="bg-grey-3"
          >

              <q-scroll-area style="height: 80vh;">
                <div class="q-px-sm q-pt-xl column q-my-auto flex-center">
                  <q-card>
                    <q-tabs
                      v-model="tab"
                      dense
                      class="text-grey"
                      active-color="primary"
                      indicator-color="primary"
                      align="justify"
                      narrow-indicator
                    >
                      <q-tab name="mails" label="Mails" />
                      <q-tab name="alarms" label="Alarms" />
                      <q-tab name="movies" label="Movies" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel name="mails">
                        <div class="text-h6">Seen</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </q-tab-panel>

                      <q-tab-panel name="alarms">
                        <div class="text-h6">Comments</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>

                </div>

              </q-scroll-area>
          </q-drawer>

          <q-page-container>
            <q-page padding>

              <!-- Message Content -->
              <div class="q-mx-md ">

              <!-- Mail Title  -->
                <div class="row items-align justify-between ">
                  <!-- <div class="text-h5 text-bold text-capitalize">Lorem title</div> -->
                  <q-space/>
                  <div class="row col-3">
                    <!-- <span class="q-my-auto">Date/Month/2022</span>
                    <span class="q-my-auto">00 : 21 : 31</span> -->
                    <q-space/>
                    <q-btn flat @click="drawerRight = true" round v-show="!drawerRight" dense icon="menu" />
                    <q-btn flat @click="drawerRight = false" round v-show="drawerRight" dense icon="close" />
                  </div>
                </div>

            <!-- Sender's Name  -->
                <div class="text-subtitle1">
                  <span class="text-bold text-grey" >From:</span> 
                  <span class="text-h6">{{from}}</span>
                  <span class="text-bold text-grey" >To:</span> 
                  <span class="text-h6">{{to}}</span>
                </div>

              <!-- heading -->
                <div class="q-mx-auto text-center text-h5 text-bold text-uppercase q-px-md q-my-xl" style="width:50%; text-decoration:underline">{{title}}</div>

                <!--Message Body  -->
                <div class="q-mx-auto text-subtitle1 text-justify q-px-md">
                  {{text}}
                </div>

              </div>

            </q-page>
          </q-page-container>
    </div>
  </q-layout>


</template>

<script>
import { ref } from 'vue'
import Watermark from 'components/Watermark.vue'
import axios from 'axios';
import env from '../../env.js';
import { Notify } from 'quasar';

export default {
  name: 'Message',
  components:{
    Watermark
  },
  data () {
    return {
      drawerRight: ref(false),
      tab: ref('mails'),
      id: window.location.href.split('/')[window.location.href.split('/').length - 1],
      from: "",
      to: "",
      title: "",
      text: ""
    }
  },
  methods: {
    fetchMessage(){
      axios({
            method: "GET",
            url: 'http://172.20.10.3:3000/api/user/request/'+this.id,
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('userToken')
            }
        })
        .then(response => {
            if(response.status === 201){
                
                console.log(response.data.doc);
                response = response.data.doc;
                this.from = response.from.name;
                this.to = response.to.name;
                this.title = response.title;
                this.text = response.message.body;
            }else{
                Notify.create({
                    message: "Error fetching message.",
                    color: 'red'
                })
            }
        })
        .catch(err => {
            Notify.create({
                message: "Error fetching message.",
                color: 'red'
            })
        })
    }
  },
  mounted(){
    this.fetchMessage()
  }
}
</script>

<style scoped>



</style>
