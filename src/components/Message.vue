<template>
    <q-layout view="hHh Lpr lff" container style="height: 80vh" class="shadow-2 rounded-borders">

      <div class="start">

        <!-- MetaData -->
        <MetaData :toggle="drawerRight" :tab="tab" :metaData="metaData" />

          <q-page-container>
            <q-page padding>

              <!-- Message Content -->
              <div class="q-ml-md ">
              <!-- Mail Title  -->
                <div class="row items-align justify-between ">
                  <q-space/>
                  <div class="row col-3">
                    <q-space/>
                    <q-btn flat round dense @click="print" icon="print" />
                    <div class="">
                      <q-btn-dropdown flat color="secondary" label="" dropdown-icon="reply">
                          <q-scroll-area class="text-center justify-center" style="height: 40vh; width:50vh ">
                        <q-list v-for="user in users" :key="user._id">
                              <q-item clickable v-close-popup @click="onItemClick">
                                <q-item-section>
                                  <q-item-label clickable @click="()=>forwardTo(user._id)" >{{user.username}}</q-item-label>
                                </q-item-section>
                              </q-item>
                        </q-list>
                          </q-scroll-area>
                      </q-btn-dropdown>
                    </div>
                    <q-btn flat @click="drawerRight = true" round v-show="!drawerRight" dense icon="menu" />
                    <q-btn flat @click="drawerRight = false" round v-show="drawerRight" dense icon="close" />
                  </div>
                </div>

                <div id="printMe">

              <!-- Sender's Name  -->
                  <div class="text-subtitle1"><span class="text-bold text-grey" >From:</span> <span >{{from}}</span></div>
                  <div class="text-subtitle1"><span class="text-bold text-grey" >To:</span> <span >{{to}}</span></div>

                <!-- heading -->
                  <div class="q-mx-auto text-center text-h5 text-bold text-uppercase q-px-md q-my-xl" style="width:50%; text-decoration:underline">{{title}}</div>

                  <!--Message Body  -->
                  <div class="q-mx-auto text-subtitle1 text-justify q-px-md">
                    {{text}}
                  </div>

                  <div class="row q-mt-lg" v-for="file in attachments" :key="file">
                    <div class="col-5">
                      <q-banner dense class="bg-grey-3">
                        <template v-slot:avatar>
                          <q-btn flat icon="download" color="blue" @click="()=>downloadFile(file)" />
                        </template>
                        File
                      </q-banner>
                    </div>
                  </div>
                  

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
import MetaData from 'components/MetaData.vue'
import VueHtmlToPaper from 'vue-html-to-paper';
import axios from 'axios';
import { Notify }from 'quasar';

export default {
  name: 'Message',
  components:{
    Watermark,
    VueHtmlToPaper,
    MetaData
  },
  data () {
    return {
      drawerRight: ref(false),
      tab: ref('forwardedTo'),
      bar: ref(false),
      id: window.location.href.split('/')[window.location.href.split('/').length - 1],
      from: "",
      to: "",
      title: "",
      text: "",
      attachments: [],
      metaData: null,
      users: []
    }
  },
  methods: {
    fetchMessage(){
      this.$q.loading.show();
      axios({
            method: "GET",
            url: 'http://192.168.0.102:3000/api/user/request/'+this.id,
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('userToken')
            }
        })
        .then(response => {
          console.log(response)
            if(response.status === 201){
                response = response.data.doc;
                this.from = response.from.name;
                this.to = response.to.name;
                this.title = response.title;
                this.text = response.message.body;
                this.attachments = response.message.attachment;
                this.metaData = response.metaData;
            }else{
                Notify.create({
                    message: "Error fetching message.",
                    color: 'red'
                })
            }
            this.$q.loading.hide();
        })
        .then(()=>this.$q.loading.hide())
        .catch(err => {
            Notify.create({
                message: "Error fetching message.",
                color: 'red'
            })
            this.$q.loading.hide();
        })
    },
     fetchUsersInDept(){
      this.$store.dispatch('defencestore/getUsersInDepartment')
      .then(()=>{
        let req = this.$store.getters['defencestore/usersInDeptForForward'];
        this.users = req;
        console.log(this.users)
      })
    },
    forwardTo(userId){
      this.$q.loading.show();
      let data = {userId, requestId: this.id};
      this.$store.dispatch('defencestore/forwardRequest', data)
      .then(()=>{
        this.fetchMessage();
        this.$q.loading.hide();
      })
      .catch(err=> {
        this.$q.loading.hide();
      })
    },
    downloadFile(url){

    }
  },
  mounted(){
    this.fetchMessage();
    this.fetchUsersInDept();
  }

}
</script>

<style scoped>



</style>
