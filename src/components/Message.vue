<template>
    <q-layout view="hHh Lpr lff" container style="height: 80vh" class="shadow-2 rounded-borders">

      <div class="start">

        <!-- MetaData -->
        <q-drawer
            side="right"
            v-model="drawerRight"
            bordered
            :width="300"
            :breakpoint="500"
            class="bg-grey-3"
            style="height: 80vh;"
          >


              <q-scroll-area style="height: 80vh;">

                <div class=" column q-my-auto flex-center">
                  <q-card style="height: 80vh;width:100% ">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="text-grey"
                      active-color="secondary"
                      indicator-color="secondary"
                      align="justify"
                      indicator
                    >
                      <q-tab name="mails" label="Seen" />
                      <q-tab name="alarms" label="Minutes" />

                      <!-- <q-tab name="movies" label="Movies" /> -->
                    </q-tabs>

                    <q-separator />
                    <!-- Seen section  -->
                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel name="mails" >
                        <q-scroll-area  style="height: 70vh">

                          <!-- <div class="text-h6">Seen</div> -->
                          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. -->

                          <q-card class="row justify-between q-pr-md q-my-xs" v-for="n in 10" :key="n">
                            <q-item>
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                  </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label>Rank</q-item-label>
                                  <q-item-label caption>
                                    Lorem Dude
                                  </q-item-label>
                                </q-item-section>
                              </q-item>

                              <p style="margin: auto 0" class="text-caption"> 00 : 00 : 01 </p>
                          </q-card>
                        </q-scroll-area>
                      </q-tab-panel>
                    <!-- Comments Section  -->
                      <q-tab-panel name="alarms" style="">
                        <q-scroll-area style="height: 70vh">

                            <q-card class="my-card  q-my-sm" v-for="n in 10" :key="n" flat bordered>
                              <q-item class="row justify-between q-pr-md">
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                  </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label>Title</q-item-label>
                                  <q-item-label caption>
                                    Subhead
                                  </q-item-label>
                                </q-item-section>
                                <p style="margin: auto 0" class="text-caption"> 00 : 00 : 01 </p>
                              </q-item>

                              <q-separator />

                              <q-card-section horizontal>
                                <q-card-section>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti impedit commodi nobis, voluptate expedita iure, molestias culpa, voluptatum enim officia quod nesciunt laudantium quos obcaecati pariatur velit. Vel, possimus fugiat?
                                </q-card-section>
                              </q-card-section>
                            </q-card>


                        </q-scroll-area>

                        <!-- Sticky Button  -->
                             <q-page-sticky position="bottom-left"  :offset="[18, 18]">
                                <q-btn
                                style="margin: 0 auto"
                                round
                                size="1.2rem"
                                class=" q-mb-lg cursor-pointer"
                                  icon="add"
                                  color="secondary"
                                  @click="bar = true"
                                />

                              </q-page-sticky>


                          <!-- Dialog for stick Button  -->
                          <q-dialog v-model="bar">
                            <q-card>

                              <q-card-section class="q-pt-none">
                                <p class="text-h5 q-my-sm text-secondary text-bold">Add Comments</p>
                                 <q-input
                                    v-model="text"
                                    filled
                                    type="textarea"
                                    placeholder="Comments..."
                                  />
                              </q-card-section>

                              <q-card-actions align="right">
                                <q-btn  label="Comment" color="secondary" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>

                      </q-tab-panel>


                    </q-tab-panels>
                  </q-card>

                </div>
              </q-scroll-area>
          </q-drawer>

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
                          <q-scroll-area style="height: 40vh; width:20vh ">
                        <q-list v-for="n in 8" :key="n">
                              <q-item clickable v-close-popup @click="onItemClick">
                                <q-item-section>
                                  <q-item-label>Lorem People</q-item-label>
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
                  <div class="text-subtitle1"><span class="text-bold text-grey" >From:</span> <span class="text-h6">{{from}}</span></div>
                  <div class="text-subtitle1"><span class="text-bold text-grey" >To:</span> <span class="text-h6">{{to}}</span></div>

                <!-- heading -->
                  <div class="q-mx-auto text-center text-h5 text-bold text-uppercase q-px-md q-my-xl" style="width:50%; text-decoration:underline">{{title}}</div>

                  <!--Message Body  -->
                  <div class="q-mx-auto text-subtitle1 text-justify q-px-md">
                    {{text}}
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
import VueHtmlToPaper from 'vue-html-to-paper';
import axios from 'axios';
import { Notify }from 'quasar';

export default {
  name: 'Message',
  components:{
    Watermark,
    VueHtmlToPaper
  },
  data () {
    return {
      drawerRight: ref(false),
      tab: ref('mails'),
      bar: ref(false),
      id: window.location.href.split('/')[window.location.href.split('/').length - 1],
      from: "",
      to: "",
      title: "",
      text: ""
    }
  },
  methods: {
    fetchMessage(){
      this.$q.loading.show();
      axios({
            method: "GET",
            url: 'https://edefense.herokuapp.com/api/user/request/'+this.id,
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
            }else{
                Notify.create({
                    message: "Error fetching message.",
                    color: 'red'
                })
            }
            this.$q.loading.hide();
        })
        .catch(err => {
            Notify.create({
                message: "Error fetching message.",
                color: 'red'
            })
            this.$q.loading.hide();
        })

    }
  },
  mounted(){
    this.fetchMessage();
  }

}
</script>

<style scoped>



</style>
