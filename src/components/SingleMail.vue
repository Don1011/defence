<template>
    <q-layout view="hHh Lpr lff" container style="height: 80vh" class="shadow-2 rounded-borders">

      <div class="start">

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
                  </div>
                </div>

                <div id="printMe">
                  <!-- Sender's Name  -->
                  <div class="text-subtitle1">
                    <span class="text-bold text-grey" >From:</span> 
                    <span class="text-h6 q-ml-md">{{from}}</span>
                  </div>



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
import { Notify } from 'quasar';
import Watermark from 'components/Watermark.vue'
import VueHtmlToPaper from 'vue-html-to-paper';
import axios from 'axios';

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
    fetchMail(){
      this.$q.loading.show();
      axios({
            method: "GET",
            url: 'https://edefense.herokuapp.com/api/user/mail/'+this.id,
            headers: {
              'Authorization': 'Bearer '+localStorage.getItem('userToken')
            }
        })
        .then(response => {
          // console.log(response)
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
    this.fetchMail()
  }

}
</script>
