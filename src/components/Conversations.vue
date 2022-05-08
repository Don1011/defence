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
      <div class="column text-bold justify-center">{{ username }}</div>
    </div>
    <q-scroll-area class="messages message-scroll-area">
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
    </q-scroll-area>
    <div class="q-my-sm q-mx-lg">
      <!-- Sending of Text  -->
      <q-input v-if="sendFile !== true" filled bottom-slots v-model="text" placeholder="Send Message">
        <template v-slot:append>
          <q-icon  name="send" @click="sendConversation(), text = '' " class="cursor-pointer" />
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
            @click="sendConversation(), sendFile = false"
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
      sendFile: ref(false)

    }
  },
  methods: {
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
        })
        .catch((error) =>{
          console.log(error);
        })
      } else{
        console.log("You can't send empty messages");
      }
    }
  },
  mounted() {
    this.username = location.href.split('messages/')[1]
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
