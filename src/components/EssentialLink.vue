<template>
  <q-page class="bg-secondary text-white q-pt-md" style="height:100vh">

<!-- Profile part  -->
    <div class=" column items-center">

      <!-- <q-avatar class="bg-primary q-mx-auto" size="5rem">
        <q-icon name="person" size="3.5rem" color="secondary"/>
      </q-avatar> -->
       <!-- Profile Image  -->
      <div class=" row">
        <q-space/>
        <q-img
          :src="avi || 'https://cdn.quasar.dev/img/parallax2.jpg'"
          spinner-color="white"
          style="height: 110px; width: 110px; border-radius:100%;"
          img-class="my-custom-image"
          class="rounded-borders "
          @mouseenter="edit = true"
          @mouseleave="edit =false"

        >
          <div class="absolute-bottom" v-show="edit" style="padding: 0; height: 30px" >
            <input type="file" ref="file" style="display: none">
            <q-btn no-caps icon="add"  @click="$refs.file.click()" unelevated label="upload" style="width:100%;" size="0.7rem"/>
          </div>
        </q-img>
        <q-space/>
      </div>

      <q-dialog v-model="editFormShow">
        <q-card style=" width:30%; height:70vh;">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Edit Profile</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="items-center">
                <div class="column q-mt-md">
                    <div class="bg-white col q-px-md column justify-between q-pb-md" style="  ;border-radius:0 0 4px 4px">
                        <div class = "q-mx-sm">
                            <!-- <q-separator/> -->
                            <!-- <label for="">Enter New Name</label> -->
                            <q-input v-model="name" outlined style="width:100%; margin: 2% 0 3%"  label="Enter New Name:" />

                            <!-- <label for="">Enter New Name</label> -->
                            <q-input v-model="rank" outlined style="width:100%; margin: 2% 0 3%"  label="Enter New Rank:" />

                            <div class="row q-my-md">
                              <q-space/>
                              <q-btn @click="editProfile" label="Save" color="secondary" />
                            </div>
                            <q-inner-loading
                              :showing="editProfileLoader"
                            />

                            <q-separator/>

                            <q-expansion-item
                              expand-separator
                              icon="lock"
                              label="Change password"
                              class="q-mt-md rounded-borders"
                            >
                              <q-card>
                                <q-card-section>
                                  <div class = "q-my-sm">
                                    <q-input v-model="oldPassword" outlined style="margin: 4% 0" label="Old Password:" />
                                    <q-input v-model="newPassword" outlined style="margin: 4% 0" label="New Password:" />
                                    <q-input v-model="confirmNew" outlined style="margin: 4% 0" label="Enter Password Again:" />

                                     <div class="row q-my-md">
                                      <q-space/>
                                      <q-btn @click="changePassword" label="Save" color="secondary" />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                              <q-inner-loading
                                :showing="changePasswordLoader"
                              />
                            </q-expansion-item>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
      </q-dialog>

      <div class="flex  items-center q-mx-auto q-my-md">
        <p class="q-my-auto q-mr-md text-weight-medium">{{ username }}</p>
        <q-icon name="settings" size="1.3rem" style="cursor:pointer" @click="editFormShow=true"/>
      </div>

    </div>

<!-- Dashboard Text  -->
    <div class="flex items-center q-mt-md q-mx-auto flex flex-center">
        <q-icon name="dashboard" size="1.5rem" class="q-mr-md"/>
        <p class="q-my-auto text-h6">DASHBOARD</p>
    </div>

<!-- Navigation Buttons/Links  -->
    <div class="flex flex-center q-my-xl">
       <q-list class="q-mb-lg">
                <q-item clickable class="q-mb-md q-px-xl" active-class="bg-primary text-secondary" to="/task" style="border-radius: 25px" v-ripple >
                    <q-item-section avatar>
                        <q-icon name="home" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Tasks</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Products'"
                @click="link = 'Products'"
                style="border-radius: 25px"
                to="/messages"
                >

                    <q-item-section avatar>
                        <q-icon name="storefront" size="1.5rem"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Messages</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Settings'"
                @click="link = 'Settings'"
                style="border-radius: 25px"
                to="/archives"
                >

                    <q-item-section avatar>
                        <q-icon name="view_list" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Archives</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Support'"
                @click="link = 'Support'"
                style="border-radius: 25px"
                to="/support"
                >

                    <q-item-section avatar>
                        <q-icon name="support_agent" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Support</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item
                  clickable class="q-mb-md q-px-xl"
                  active-class="bg-primary text-secondary"
                  v-ripple
                  @click="logout"
                  style="border-radius: 25px"
                >

                  <q-item-section avatar>
                      <q-icon name="logout" size="2rem" />
                  </q-item-section>
                  <q-item-section>
                      <q-item-label class="text-h6 text-center">Logout</q-item-label>
                  </q-item-section>
                </q-item>
            </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'EssentialLink',
  data(){
    return{
      edit: false,
      editFormShow: false,
      link:"",

      selectedFile: null,
      name: "",
      rank: "",
      // password: "",
      username:"",
      avi:false,

      oldPassword: "",
      newPassword: "",
      confirmNew: "",

      editProfileLoader: false,
      changePasswordLoader: false
    }
  },
  methods: {
    logout(){
      // console.log("LOGOUT")
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userDept");
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");

      // this.$store.commit('logout')
      this.$router.replace('/');
    },
    getProfile(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getProfile')
      .then(()=>{
        let req = this.$store.getters['defencestore/getProfile'];
        console.log(req.loggedUser)
        req=req.loggedUser;
        this.username = req.username;
        this.rank = req.rank;
        this.name = req.name;
        this.avi = req.avi;
        this.$q.loading.hide();
      })
      .catch(err => this.$q.loading.hide())
      /* _id: "61bb47b0dfc25d42011b4b63"​​, avatar: ""​​, avi: ""​​, department: Object { _id: "61b40ca89627d34b67535126", name: "Department of Defence information", abbr: "DDI", … }​​, isAdmin: false​​, name: "kate deen"​​, rank: "major"​​, role: "Registry"​​, username: "reg@DDI" */
    },
    editProfile(){
      this.editProfileLoader=true;
      if(this.name !== "" && this.rank !== ""){
        this.$store.dispatch("defencestore/editProfile", { name: this.name, rank: this.rank })
        .then(()=>{ this.editProfileLoader=false })
        .catch(err=>{ this.editProfileLoader=false })
      }else{
        this.editProfileLoader=false;
        Notify.create({
          message: "Can't submit a form with an empty field",
          color: "red"
        })
      }
    },
    changePassword(){
      this.changePasswordLoader=true;
      if(this.oldPassword !== "" && this.newPassword !== "" && this.confirmNew !== ""){
        if(this.newPassword === this.confirmNew){
          if(this.newPassword !== this.oldPassword){
            this.$store.dispatch("defencestore/changePassword", { old: this.oldPassword, new: this.newPassword })
            .then(()=>{ this.changePasswordLoader=false })
            .catch(err=>{ this.changePasswordLoader=false })
          }else{
            Notify.create({
              message: "Old and new passwords are the same. No need to update.",
              color: "red"
            })
          }
        }else{
          Notify.create({
            message: "Passwords don't match",
            color: "red"
          })
        }
      }else{
        this.changePasswordLoader=false;
        Notify.create({
          message: "Can't submit a form with an empty field",
          color: "red"
        })
      }
    }
  },
  mounted(){
    this.getProfile();
  }
})
</script>

<style scoped>

</style>
