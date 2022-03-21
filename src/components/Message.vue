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
                    <q-btn v-show="!(status==='Completed')" flat dense @click="confirmCompleted=true" color="blue" label="Complete" icon="check" />
                    <q-btn v-show="(status==='Completed')" flat dense disabled color="green" label="Completed" icon="check" />
                    <q-dialog v-model="confirmCompleted" persistent>
                      <q-card>
                        <q-card-section class="row items-center">
                          <q-avatar icon="check" color="green" text-color="white" />
                          <span class="q-ml-sm">Are you sure this request has been completed?</span>
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn flat label="Cancel" color="red" v-close-popup />
                          <q-btn @click="completed" flat label="Completed" color="green" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                    <q-space/>
                    <q-space/>
                    <q-btn flat round dense @click="print" icon="print" />
                    <div v-show="!(status==='Completed')" class="">
                      <q-btn-dropdown round flat color="secondary" label="" dropdown-icon="reply">
                          <q-scroll-area class="text-center justify-center" style="height: 40vh; width:50vh ">
                            <q-list v-for="user in users" :key="user._id">
                                  <q-item clickable v-close-popup @click="onItemClick">
                                    <q-item-section>
                                      <q-item-label clickable @click="forwardTo(user._id)" >{{user.username}}</q-item-label>
                                    </q-item-section>
                                  </q-item>
                            </q-list>
                          </q-scroll-area>
                      </q-btn-dropdown>
                    </div>
                    <q-btn v-show="!drawerRight" flat @click="drawerRight = true" round dense icon="menu" />
                    <q-btn v-show="drawerRight" flat @click="drawerRight = false" round dense icon="close" />
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
      status: "",
      metaData: null,
      users: [],
      confirmCompleted: false
    }
  },
  methods: {
    fetchMessage(){
      this.$q.loading.show();
      axios({
            method: "GET",
            url: 'http://192.168.0.103:3000/api/user/request/'+this.id,
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
                this.status = response.metaData.status;
                this.attachments = response.message.attachment;
                this.metaData = response.metaData;

                let idList = [];
                response.metaData.seen.forEach(item => {
                  idList.push(item.by);
                })

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
      console.log("downloaded")
    },
    print(){
      console.log('print')
    },
    completed(){
      this.$q.loading.show();
      let data = {requestId: this.id, status: "Completed"};
      this.$store.dispatch('defencestore/setCompleted', data)
      .then(()=>{
        this.fetchMessage();
        this.$q.loading.hide();
      })
      .catch(err=> {
        this.$q.loading.hide();
      })
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
