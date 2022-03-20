<template>
<q-page class="row main">

<!-- Defense Logo and App Name  -->
   <div class="logo col-5 column flex-center" style="border-radius: 0 25px 25px 0; box-shadow: -5px 0px 10px 6px">
     <p class="text-white text-h3 text-bold" >TASK SHARE</p>
    <div>
       <q-avatar size="200px" style="background:#D4E1E8">
        <img src="../../assets/defense.png">
      </q-avatar>
    </div>
  </div>

<!-- Authentication Form  -->
  <div class="col-7 column q-my-auto q-px-xl login">
   <p class="text-center text-h4 text-bold text-secondary">Admin Login</p>

   <div class="q-px-xl">
     <q-input rounded outlined elevated v-model="username" placeholder="Username" class="q-mb-xl q-mt-md q-mx-auto" standout="bg-white" color="secondary" style="width:60%">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="person" size="1.8rem"/>
          </q-avatar>
        </template>
      </q-input>
      <q-input rounded outlined v-model="password" placeholder="Password" v-on:keyup.enter="adminLogin" type = "password" class="q-mb-xl q-mx-auto" standout="bg-white" color="secondary" style="width:60%;">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="lock" size="1.8rem"/>
          </q-avatar>
        </template>
      </q-input>
   </div>

<!-- Sign in Button  -->
   <q-btn @click="adminLogin" unelevated rounded color="secondary" v-on:keyup.enter="adminLogin" label="Login"  class="q-mx-auto q-mb-md"  style="width: 30%;"/>

  </div>

</q-page>
</template>

<script>
import { Notify } from 'quasar';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
let $store = useStore();
let $route = useRoute();

export default {
  name: 'login',
  data(){
    return{
      username: "",
      password: ""
    }
  },
  methods: {
    adminLogin(){
      // this.$router.push('/admin/users');
      if(this.username !== "" && this.password !== ""){
        this.$store.dispatch('defencestore/adminLogin', {username: this.username, password: this.password})
        .then(()=>{
          // if(res.status === 200 || res.status === 201){
            Notify.create({
              message: 'Login Success.',
              caption: 'Admin successfully authenticated.',
              color: 'blue'
            })
            this.$router.replace('/admin/users')
        })
      }else{
        Notify.create({
          message: 'Login Failure.',
          caption: 'Complete filling the form before submitting.',
          color: 'red'
        })
      }
    }
  }
}
</script>

<style scoped>
  .logo{
    background: #1C2E3D;
  }

  .main{
    background: #DDE7ED;
  }
</style>
