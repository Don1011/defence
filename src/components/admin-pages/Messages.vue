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
                  <q-list separator v-for="mail in pendingMails" :key="mail._id" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" :to="`/admin/message/${mail._id}`" style="border-radius: 4px">
                      <div class="row col-10" >
                        <q-item-section  >Mail from {{mail.from.username}}</q-item-section>
                        <q-item-section>{{mail.message.title}} </q-item-section>
                        <q-item-section>{{mail.updatedAt.split("T")[0]}}, {{mail.updatedAt.split("T")[1].split(".")[0]}}</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> Pending</span>
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
                  <q-list separator v-for="mail in solvedMails" :key="mail._id" >
                    <q-item clickable class="row text-center q-mb-sm bg-white" :to="`/admin/message/${mail._id}`" style="border-radius: 4px">
                      <div class="row col-10" >
                        <q-item-section  >Mail to {{mail.to.username}}</q-item-section>
                        <q-item-section>{{mail.message.title}} </q-item-section>
                        <q-item-section>{{mail.updatedAt.split("T")[0]}}, {{mail.updatedAt.split("T")[1].split(".")[0]}}</q-item-section>
                      </div>

                      <q-item-section>
                        <div class="row justify-evenly" style="width">
                          <span class=" text-negative q-my-auto text-subtitle2" style="width: 40%;"> Solved </span>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

    <!-- Add Mail Button  -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="1.3rem"
        class="q-mr-md q-mb-lg cursor-pointer"
        icon="add"
        color="positive"
        @click="bar = true"
      />

    </q-page-sticky>

    <!-- Draft Dialog -->
    <q-dialog v-model="bar" persistent>
      <q-card style="width: 1200px; max-width: 90vw;margin-left: 20%">
        <q-bar class="bg-secondary text-white" style="height:60px">
          <p class="text-h6 q-my-auto">New Draft</p>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
            <div class="column">
              <div class="bg-white col q-px-md column justify-between q-pb-md" style="min-height:300px;border-radius:0 0 4px 4px">
                <q-select  v-model="to" :options="users" use-input input-debounce="0" label="Select User"  >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-input v-model="title" label="Title:" />
                <q-input v-model="comments" type="textarea" placeholder="Message" />
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
                    <q-btn @click="submitMail" label="send" style="width: 50%;" color="negative"/>
                  </div>
                </div>
              </div>
            </div>

        </q-card-section>
      </q-card>
    </q-dialog>

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
      pendingMails: [],
      solvedMails: [],
      options,
      label: ref('mails'),
      bar: ref(false),
      model1: ref(null),
      selected: 1,
      tab: false,


      to: ref(""),
      title: ref(""),
      comments: ref(""),
      selectedFile: ref(null),
      users: []

    }
  },
 methods: {
    selectFile(){
      this.$refs.selectImageFile.$el.click();
    },
    getMails(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/fetchAdminMails')
      .then(()=>{
        this.$q.loading.hide();
        let allMails =this.$store.getters['defencestore/getAdminMails'];
        // console.log(allMails);
        let pending = [];
        let solved = [];

        allMails.forEach(item => {
          if(item.from.role === 'Admin'){
            solved.push(item);
          }else{
            pending.push(item);
          }
        });

        this.pendingMails = pending;
        this.solvedMails = solved;

        console.log(pending);
      })
      .catch(err => {
        this.$q.loading.hide();
      })
    },
    fetchUsersInDept(){
      this.$store.dispatch('defencestore/getAllUsersAdmin')
      .then(()=>{
        let req = this.$store.getters['defencestore/getAllUsersAdmin'];
        let usernames = [];
        req.forEach(item => {
          usernames.push(item.username)
        })
        this.users = usernames;
        // console.log(this.users)
      })
    },
    submitMail(){
      this.$q.loading.show();
      if(this.to !== "" && this.title !== "" && this.comments !== ""){
        this.$store.dispatch('defencestore/sendAdminMail', {
          to: this.to,
          title: this.title,
          text: this.comments,
          files: this.selectedFile
        })
        .then(()=>{
          this.$q.loading.hide();
          window.location.reload();
        })
        .catch(()=>{
          this.$q.loading.hide();
        })
      }else{
        this.$q.loading.hide();
        Notify.create({
          message: 'You can\'t leave the "to", "title" and "Comments" fields empty.',
          color: 'red'
        })
      }
    }
  },
  mounted(){
    this.getMails();
    this.fetchUsersInDept();
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
