<template>
<q-page class="row main">

<!-- Defense Logo and App Name  -->
   <div class="logo col-5 column flex-center" style="border-radius: 0 25px 25px 0; box-shadow: -5px 0px 10px 6px">
     <p class="text-white text-h3 text-bold" >TASK SHARE</p>
    <div>
       <q-avatar size="200px" style="background:#D4E1E8">
        <img src="../assets/defense.png">
      </q-avatar>
    </div>

  </div>

<!-- Authentication Form  -->
  <div class="col-7 column q-my-auto q-px-xl login">
   <p class="text-center text-h4 text-bold text-secondary">Login</p>

   <div class="q-px-xl">
     <q-input rounded outlined elevated v-model="username" placeholder="Username" class="q-mb-xl q-mt-md q-mx-auto"  color="black" style="width:60%">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="person" size="1.8rem"/>
          </q-avatar>
        </template>
      </q-input>
      <q-input rounded outlined v-model="password" placeholder="Password" type="password" class="q-mb-xl q-mx-auto"  color="black" style="width:60%;">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="lock" size="1.8rem"/>
          </q-avatar>
        </template>
      </q-input>
   </div>

<!-- Sign in Button  -->
   <q-btn @click="userLogin" unelevated rounded color="secondary" v-on:keyup.enter="userLogin" label="Login"  class="q-mx-auto q-mb-md"  style="width: 30%;"/>

<!-- Forgotten Password link  -->
<!-- <div class="row justify-center"> -->
    <router-link to="/login-support" class="  text-center text-italic text-subtitle1  text-secondary" style="text-decoration: none">Having a problem?</router-link>
    <router-link to="/admin" class="q-mt-md text-center  text-h6 text-secondary text-bold text-uppercase" style="text-decoration: none">Admin</router-link>
<!-- </div> -->

  </div>

</q-page>
</template>

<script>
import { Notify } from 'quasar';

export default {
  name: 'login',
  data(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    userLogin(){
      this.$q.loading.show();
      if(this.username !== "" && this.password !== ""){
        let array = this.username.split('@')
        this.username = `${array[0].toLowerCase()}@${array[1].toUpperCase()}`
        this.$store.dispatch('defencestore/userLogin', {username: this.username, password: this.password})
        .then(()=>{
            Notify.create({
              message: 'Login Success.',
              caption: 'User successfully authenticated.',
              color: 'blue'
            })
            console.log(this.username);
            this.$router.replace('/task')
            this.$q.loading.hide();
        })
        .catch(err => this.$q.loading.hide())
      }else{
        Notify.create({
          message: 'Login Failure.',
          caption: 'Complete filling the form before submitting.',
          color: 'red'
        })
        this.$q.loading.hide();
      }
        // this.$q.loading.hide();
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
