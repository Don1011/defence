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
                        <div class="last-message text-grey-6 text-sm">
                         {{item.title}}
                        </div>
                      </div>
                      <q-space />
                      <div class="column justify-center q-mr-lg">
                        <div class="text-sm">{{item.createdAt.split("T")[1].split(".")[0]}}</div>
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

                <q-scroll-area style="height: 50vh" class="scroll">
                  <q-item class="message-item row q-pa-sm" v-for="user in usersInDepartment" :key="user._id" >
                    <div class="column justify-center">
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                      </q-avatar>
                    </div>
                    <div class="column justify-center q-mx-md">
                      <div class="name">{{ user }}</div>
                    </div>
                    <q-space />
                    <div class="column justify-center">
                      <q-btn
                        :to="`/messages/${user}`"
                        flat
                        round
                        color="secondary"
                        icon="chat"
                      />
                    </div>
                  </q-item>
                </q-scroll-area>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" class="bg-secondary" v-close-popup />
                </q-card-actions>
              </q-card>
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

      inbox: [],
      conversations: [],
      departments: [],
      // usersOfDepts:
      usersInDepartment: []
    }
  },
 methods: {
   getConversations(){
     this.$store.dispatch('defencestore/getAllConversation')
     .then((response) =>{
       console.log('It worked bitchhhhhhhh!!!!!')
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
        console.log(this.departments);
      }
    })
    .catch((error) =>{
      console.log(error);
    })
   },
   getAllUsersInDepartment(){
    this.$store.dispatch('defencestore/getUsersInDepartment')
    .then((response) =>{
      this.usersInDepartment = this.$store.getters['defencestore/usersInDept'];
    })
    .catch((error) =>{
      console.log(error);
    })
   }
  },
  mounted(){
    // this.getConversations()
    this.getAllDepartments()
    this.getAllUsersInDepartment()

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
