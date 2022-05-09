<template>
    <div class="q-pa-md bg-primary" style="height:80vh">
          <div class="bg-primary text-white q-pt-lg">
               <q-scroll-area style="height: 72vh;">
                 <div class="text-subtitle2 text-secondary">
                 <!-- Incomings -->
                  <EmptyList :itemList="conversations" message="No message to display" />
                  <q-item
                      class="message-item bg-white row q-pa-sm q-ma-sm light-border shadow-1"
                      v-ripple
                      clickable
                      :to="convo.group == true ? `/messages/${convo._id}/${convo.recipients}` : `/messages/${convo._id}/${convo.alias}` "
                      v-for="convo in conversations"
                      :key="convo._id"
                    >
                      <div class="column justify-center">
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/avatar.png" />
                        </q-avatar>
                      </div>
                      <div class="column justify-center q-mx-md">
                        <div class="name">{{convo.alias}}</div>
                        <div class="last-message text-grey-6 text-sm">
                         {{convo.lastMessage}}
                        </div>
                      </div>
                      <q-space />
                      <div class="column justify-center q-mr-lg">
                        <div class="text-sm">{{convo.createdAt.split("T")[1].split(".")[0]}}</div>
                      </div>
                    </q-item>

                </div>
              </q-scroll-area>
            <!-- Add Mail Button  -->
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-fab color="positive" icon="message" direction="up" class="fab">
                <q-fab-action
                  external-label
                  label-position="left"
                  label="Other Departments"
                  color="secondary"
                  @click="otherDepts = true"
                  icon="apartment"
                />
                <q-fab-action
                  external-label
                  label-position="left"
                  label="Your Department"
                  color="secondary"
                  @click="yourDept = true"
                  icon="house"
                />
              </q-fab>
            </q-page-sticky>

            <!-- Your Depts Dialog -->
            <q-dialog v-model="yourDept">
              <q-card style="width: 50vw">
                <q-card-section>
                  <q-input
                    filled
                    bottom-slots
                    v-model="text"
                    label="Search User In Your Dept"
                  >
                    <template v-slot:append>
                      <q-icon name="search" @click="text = ''" class="cursor-pointer" />
                    </template>
                  </q-input>
                </q-card-section>

                <q-separator />

                <q-scroll-area style="height: 50vh" class="scroll" v-if="groupMode !== true">
                  <q-item class="message-item row q-pa-sm" v-for="user in usersInDepartment" :key="user._id" >
                    <div class="column justify-center">
                      <q-avatar>
                        <img :src="`http://192.168.130.132:3000/api/${user.avatar}`" />
                      </q-avatar>
                    </div>
                    <div class="column justify-center q-mx-md">
                      <div class="name">{{ user.username }}</div>
                    </div>
                    <q-space />
                    <div class="column justify-center">
                      <q-btn
                        :to="`/messages/${user.convoId?user.convoId:'new'}/${user.username}`"
                        flat
                        round
                        color="secondary"
                        icon="chat"
                      />
                    </div>
                  </q-item>
                </q-scroll-area>

                <q-scroll-area style="height: 50vh" class="scroll" v-if="groupMode == true">
                  <div v-for="user in usersInDepartment" :key="user._id">
                    <q-checkbox v-model="selection" :val="user" color="teal"  >
                      <q-item class="message-item row q-pa-sm"  >
                      <div class="column justify-center">
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/avatar.png" />
                        </q-avatar>
                      </div>
                      <div class="column justify-center q-mx-md">
                        <div class="name">{{ user.username }}</div>
                      </div>
                    </q-item>
                    </q-checkbox>
                  </div>
                </q-scroll-area>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat :label="groupMode == true ? 'Back': 'Create Group'"  color="primary"  class="bg-secondary" :icon="groupMode !== true ? 'message' : 'chevron_left'" @click="groupMode = !groupMode" />
                  <q-btn flat v-if="groupMode !== true" label="Close" color="primary" class="bg-secondary" v-close-popup />
                  <q-btn flat v-if="groupMode == true" label="Create" color="primary" class="bg-secondary" @click="alert = true" />
                </q-card-actions>
              </q-card>

              <!-- Group Name Dialog -->
              <q-dialog v-model="alert">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Please Enter a Group Name</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input v-model="groupName" outlined  />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Create" @click="createGroupConvo()" color="primary" class="bg-secondary" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-dialog>




            <!-- Other Depts Dialog -->
            <q-dialog v-model="otherDepts">
              <q-card style="width: 50vw">
                <q-card-section style="" class="" v-for="department in departments" :key="department._id">
                  <q-expansion-item expand-separator :label="department.abbr">
                    <q-card>
                      <q-item class="message-item row q-pa-sm" v-for="userss in department.users" :key="userss._id">
                        <div class="column justify-center">
                          <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png" />
                          </q-avatar>
                        </div>
                        <div class="column justify-center q-mx-md">
                          <div class="name">{{ userss.username }}</div>
                        </div>
                        <q-space />
                        <div class="column justify-center">
                          <q-btn
                            :to="`/messages/${userss.username}`"
                            flat
                            round
                            color="secondary"
                            icon="chat"
                          />
                        </div>
                      </q-item>
                    </q-card>
                  </q-expansion-item>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" class="bg-secondary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>



  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
// import Watermark from 'components/Watermark.vue'
import EmptyList from 'components/EmptyList.vue'


export default {
   components:{
    // Watermark,
    EmptyList
  },
  data () {
    return {
      otherDepts: ref(false),
      yourDept: ref(false),
      bar: ref(false),
      text: ref(''),

      to: ref(""),
      title: ref(""),
      comments: ref(""),
      selectedFile: ref(null),

      conversations: [],
      departments: [],
      // usersOfDepts:
      usersInDepartment: [],
      selection: [],
      alert: ref(false),
      groupMode: ref(false),
      groupName: ref('')
    }
  },
 methods: {
   createGroupConvo(){
    //  console.log(this.selection)
    //  console.log(this.groupName);
     axios({
       method: "POST",
       url: 'http://192.168.130.132:3000/api/user/convo-new-group',
       headers: {
         'Authorization': 'Bearer '+localStorage.getItem('userToken')
       },
       data: {
         alias: this.groupName,
         to: this.selection
       }
     })
     .then((response) =>{
       this.$router.replace(`/messages`)
       window.location.reload()
       this.groupName = ''
       this.selection = []
       this.yourDept = false
       console.log(response.data);
     })
     .catch((error) =>{
       console.log(error);
     })
   },
   getConversations(){
     this.$store.dispatch('defencestore/getAllConversation')
     .then((response) =>{
      this.conversations = this.$store.getters['defencestore/getAllConversations']
      console.log(this.conversations);
      this.getAllUsersInDepartment()
     })
     .catch((error)=>{
       console.log(error);
     })
   },
   getAllDepartments(){
     axios({
      method: "GET",
      url: 'http://192.168.130.132:3000/api/user/all',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then((response)=>{
      if(response.status === 200 || response.status === 201){
        this.departments = response.data.data
      }
    })
    .catch((error) =>{
      console.log(error);
    })
   },
   getAllUsersInDepartment(){
    this.$store.dispatch('defencestore/getUsersInDepartment')
    .then(() =>{
      let usersInDepartment = this.$store.getters['defencestore/usersInDeptForForward'];
      let myId = localStorage.getItem("userId");
      let newUsersInDept=[];
      usersInDepartment.forEach(user => {
        var convoStarted = false;
        this.conversations.forEach(convo => {
          if(!(convo.group) && convo.recipients.includes(myId) && convo.recipients.includes(user._id)) convoStarted = convo._id;
        })
        newUsersInDept.push({...user, convoId: convoStarted});
      })
      // console.log("newUSersInDept", newUsersInDept);
      this.usersInDepartment = newUsersInDept;
    })
    .catch((error) =>{
      console.log(error);
    })
   }
  },
  mounted(){
    this.getConversations()
    this.getAllDepartments()

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
  border-radius: 4px;
  width: 100%;
}
</style>
