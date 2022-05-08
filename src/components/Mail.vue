<template>
    <div class="q-pa-md bg-primary" style="height:80vh">
          <div class="bg-primary text-white q-pt-lg">
               <q-scroll-area style="height: 72vh;">
                 <div class="text-subtitle2 text-secondary">
                 <!-- Incomings -->
                  <EmptyList :itemList="inbox" message="No message to display" />
                  <q-item
                      class="message-item bg-white row q-pa-sm q-ma-sm light-border shadow-1"
                      v-ripple
                      clickable
                      to="/messages/id"
                      v-for="item in inbox"
                      :key="item._id"
                    >
                      <div class="column justify-center">
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/avatar.png" />
                        </q-avatar>
                      </div>
                      <div class="column justify-center q-mx-md">
                        <div class="name">{{item.from.username}}</div>
                        <div class="last-message text-black text-sm">
                         {{item.title}}
                        </div>
                      </div>
                      <q-space />
                      <div class="column justify-center q-mr-lg">
                        <div class="text-accent text-sm">{{item.createdAt.split("T")[1].split(".")[0]}}</div>
                      </div>
                    </q-item>


                 <!-- <div  v-for="item in inbox" :key="item._id" >
                  <q-item clickable class="row text-center q-mb-sm bg-white" :to="'/mail-message/'+item._id" style="border-radius: 4px">
                      <div class="col-4">Message from {{item.from.username}}</div>
                      <div class="col-4 text-left">{{item.title}}</div>
                      <div class="col-4">{{item.createdAt.split("T")[0]}}, {{item.createdAt.split("T")[1].split(".")[0]}}</div>
                  </q-item>
                 </div> -->
                </div>
              </q-scroll-area>
          </div>

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
</template>

<script>
import { ref } from 'vue'
import Watermark from 'components/Watermark.vue'
import EmptyList from 'components/EmptyList.vue'


export default {
   components:{
    Watermark, EmptyList
  },
  data () {
    return {
      label: ref('inbox'),
      bar: ref(false),
      model1: ref(null),
      selected: 1,

      to: ref(""),
      title: ref(""),
      comments: ref(""),
      selectedFile: ref(null),

      inbox: [],
      sent: [],

      users: []
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
    submitMail(){
      this.$q.loading.show();
      if(this.to !== "" && this.title !== "" && this.comments !== ""){
        this.$store.dispatch('defencestore/sendMail', {
          to: this.to,
          title: this.title,
          text: this.comments,
          files: this.selectedFile
        })
        .then(()=>{
          window.location.reload();
        this.$q.loading.hide();
        })
      }else{
        this.$q.loading.hide();
        Notify.create({
          message: 'You can\'t leave the "to", "title" and "Comments" fields empty.',
          color: 'red'
        })
      }
    },
    fetchMails(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getMails')
      .then(()=>{
        let req = this.$store.getters['defencestore/getMails'];
        // console.log(req);
        this.inbox = req.inbox;
        this.sent = req.sent;
        this.$q.loading.hide();
        console.log(this.inbox)
        console.log(this.sent)
      })
    },
    fetchUsersInDept(){
      this.$store.dispatch('defencestore/getUsersInDepartment')
      .then(()=>{
        let req = this.$store.getters['defencestore/usersInDept'];
        this.users = req;
        // console.log(this.users)
      })
    }
  },
  mounted(){
    this.fetchMails();
    this.fetchUsersInDept();
    // console.log(this.users)
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
.message-item{
  border-radius: 4px
}
</style>
