<template>

  <div class="start" style="height:78vh">

  <!-- Water Marked Image  -->
    <div class="watermark">
      <img src="../../assets/defense.png" alt="">
    </div>

  <!-- Message Content -->
    <div class="q-mx-lg q-mt-md">

    <!-- Mail Title  -->
      <div class="row items-align justify-between ">
        <!-- <div class="text-h5 text-bold text-capitalize">Lorem title</div> -->
        <q-space/>
        <div class="row justify-evenly col-3">
          <span class="q-my-auto">{{this.date}}</span>
          <!-- <span class="q-my-auto">00 : 21 : 31</span> -->
        </div>
      </div>

   <!-- Sender's Name  -->
      <div class="text-subtitle1"><span class="text-bold text-grey" >{{this.fromOrTo}}:</span> <span class="text-h6">{{this.fromOrToValue}}</span></div>

    <!-- heading -->
      <div class="q-mx-auto text-center text-h5 text-bold text-uppercase q-px-md q-my-xl" style="width:50%; text-decoration:underline">{{this.title}}</div>

      <!--Message Body  -->
      <div class="q-mx-auto text-subtitle1 text-justify q-px-md">
        {{this.body}}
      </div>


      <div class="row q-mt-lg" v-for="file in files" :key="file">
        <div class="col-5" style="width:18%">
          <q-banner dense class="bg-grey-5">
            <template v-slot:avatar>
              <q-btn flat icon="download" color="blue" @click="downloadFile(file)" />
            </template>
            File
          </q-banner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../../env.js';


export default {
  name: "SingleMessagePage",
  data(){
    return {
      fromOrTo: '',
      fromOrToValue: '',
      date: '',
      title: '',
      body: '',
      files: []
    }
  },
  methods: {
    getMail(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/fetchAdminSingleMail', {id: this.$route.params.id})
      .then(()=> {
        this.$q.loading.hide();
        let mailData = this.$store.getters['defencestore/getAdminSingleMail'];
        if (mailData.from.role === 'Admin') {
          this.fromOrTo = 'To';
          this.fromOrToValue = mailData.to.username;
        }else{
          this.fromOrTo = 'From';
          this.fromOrToValue = mailData.from.username;
        }
        this.date = `${mailData.updatedAt.split("T")[0]}, ${mailData.updatedAt.split("T")[1].split(".")[0]}`;
        this.title = mailData.title;
        this.body = mailData.message.body;
        this.files = mailData.message.attachment;

      })
      .catch(err=> {
        this.$q.loading.hide();
      })
    },
    downloadFile(url){
      let fileUrl = `${env.backend}/${url}`;
      // console.log(url);
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
  },
  mounted(){
    this.getMail()
  }
}
</script>

<style scoped>
  .watermark {
   position:absolute;
   top:50%;
   left:50%;
   transform: translate(-25%, -25%);
   opacity:0.1;
   z-index:-99;
   color:white;
   user-select: none;
}
</style>
