<template>
  <div class="column main">
    <div class="row">
      <q-btn
        @click="this.$router.back()"
        class="q-ma-md"
        flat
        round
        color="red"
        icon="chevron_left"
      />
      <div v-if="!this.groupId" class="column text-bold justify-center">{{ username }}</div>
      <div v-show="this.groupId" class="column text-bold justify-center" v-for="users in groupUsers" :key="users._id" >{{ users.username + (users === groupUsers[groupUsers.length-1]?". ": ", &nbsp;" )}}</div>
    </div>
    <q-scroll-area class="messages message-scroll-area">
      <!-- <div class="row justify-start" >
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div> -->
      <div  :class="`row ${chat.from === loggedUser ? 'justify-end' : 'justify-start'}`" v-for="chat in conversation" :key="chat._id" >
        <div v-show="chat.message.body" :class="`message-item-${chat.from === loggedUser ? 's bg-accent' : 'r bg-primary'} q-pa-md q-ma-md  text-light col-9`">
          {{ chat.message.body }}
        </div>
        <div class="row q-mt-lg q-mr-lg" v-if="!(chat.message.body)">
          <div class="col-5" style="width:100%" v-for="file in chat.message.attachment" :key="file.id">
            <q-banner dense class="bg-accent">
              <template v-slot:avatar>
                <q-btn flat icon="download" color="blue" @click="downloadFile(file)" />
              </template>
              {{ file }}
            </q-banner>
          </div>
        </div>
      </div>

    </q-scroll-area>

    <div class="q-my-sm q-mx-lg">
      <!-- Sending of Text  -->
      <q-input v-if="sendFile !== true" filled bottom-slots v-model="text" placeholder="Send Message">
        <template v-slot:append>
          <q-icon  name="send" @click="this.groupId ? sendGroupConversation() : sendConversation(), text = '' " class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <q-icon
            name="description"
            @click="sendFile = true"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <!-- sending of file  -->
      <q-file
        v-if="sendFile == true"
        v-model="file"
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
        <template v-slot:after>
          <q-icon
            name="send"
            @click="this.groupId ? sendGroupConversation() : sendConversation(), sendFile = false"
            class="cursor-pointer"
          />
        </template>
      </q-file>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from 'axios';

export default {
  name: "ConversationPage",
  components:{

},
  data(){
    return{
      text: ref(''),
      username: ref(''),
      file: ref(null),
      sendFile: ref(false),
      conversation: [],
      loggedUser: localStorage.getItem("userId"),
      id:'',
      groupId: ref(''),
      groupUsers: []
    }
  },
  methods: {
    downloadFile(url){
      console.log("downloaded");
      let fileUrl = `http://192.168.130.132:3000/api/${url}`;
      console.log(url);
      axios({
          url: fileUrl, //your url
          method: 'GET',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('userToken')
          },
          responseType: 'blob', // important
      }).then((response) => {
          let filetype = url.split('.')[url.split('.').length-1];
          let fileName = url.split('/')[url.split('/').length-1];
          fileName = fileName+"."+filetype;
          const fileDownloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          console.log(response);
          link.href = fileDownloadUrl;
          link.setAttribute('download', fileName); //or any other extension
          // link.setAttribute('download', url.split('.')[url.split('.').length -1]); //or any other extension
          document.body.appendChild(link);
          link.click();
      });
    },
    sendConversation(){
      let formData = new FormData()
      formData.append("to", this.username);
      if(this.file == null){
        formData.append("text", this.text);
        console.log('For text');
      }else {
        formData.append("files", this.file);
        console.log('For files');
      }
      console.log(formData);
      this.conversationRequest(formData)
    },
    conversationRequest(data){
    //  let formData = data
      if(this.text !== '' || this.file !== null ){
        axios({
          method: "POST",
          url: 'http://192.168.130.132:3000/api/user/convo',
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('userToken')
          },
          data
        })
        .then((response) =>{
          console.log(response);
          this.getConvo(this.id)
        })
        .catch((error) =>{
          console.log(error);
        })
      } else{
        console.log("You can't send empty messages");
      }
    },
     sendGroupConversation(){
      let formData = new FormData()
      if(this.file == null){
        formData.append("text", this.text);
        console.log('For text');
      }else {
        formData.append("files", this.file);
        console.log('For files');
      }
      console.log(formData);
      this.groupConversationRequest(formData)
    },
    groupConversationRequest(data){
      if(this.text !== '' || this.file !== null ){
        let id = this.id
        axios({
          method: "POST",
          url: `http://192.168.130.132:3000/api/user/convo-group/${id}`,
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('userToken')
          },
          data
        })
        .then((response) =>{
          console.log(response);
          this.getConvo(this.id)
        })
        .catch((error) =>{
          console.log(error);
        })
      } else{
        console.log("You can't send empty messages");
      }
    },
    getConvo(id){
      axios({
        method: "GET",
        url: `http://192.168.130.132:3000/api/user/convo/${id}`,
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        },
      })
      .then((response) =>{
        if(response.status === 201 || response.status === 200){
          this.conversation = response.data.data.reverse()
          console.log(this.conversation);

        }
      })
      .catch((error) =>{
        console.log(error);
      })
    },
    getGroupUsers(){
      axios({
        method: "POST",
        url: 'http://192.168.130.132:3000/api/user/findmany',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        },
        data: {
          users : this.groupId.split(',')
          }
      })
      .then((response) =>{
        console.log(response.data);
        this.groupUsers = response.data.data
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  },
  mounted() {
    let myRoute = location.href.split('messages/')[1]
    // console.log(myRoute);
    this.id = myRoute.split('/')[0]
    this.username = myRoute.split('/')[1]
    if(this.username.length >= 26 ){
      this.groupId = this.username
      this.getGroupUsers()
      console.log([this.groupId]);
    }else{
      this.username
      console.log(this.username);
    }
    this.getConvo(this.id)
  }
};
</script>
<style>
.message-item-r {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}
.message-item-s {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
}
.message-scroll-area {
  height: 57vh;
}
.main{
  /* height: 60vh;
  width: 100%; */
}
</style>
