<template>
  <q-page class="bg-secondary text-white q-pt-md" style="height:100vh">

<!-- Profile part  -->
    <div class=" column items-center">

       <!-- Profile Image  -->
      <div class=" row">
        <q-space/>
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
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

      <!-- Edit Profile Dialog  -->
      <q-dialog v-model="editFormShow" persistent>
        <q-card style=" width:30%; height:70vh;">
            <q-card-section class="row items-center q-pb-none">
              <!-- <div class="text-h6">Close icon</div> -->
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="items-center">
                <div class="column q-mt-md">
                    <div class="bg-white col q-px-md column justify-between q-pb-md" style="  ;border-radius:0 0 4px 4px">
                        <div class = "q-mx-sm">
                            <!-- <q-separator/> -->
                            <label for="">Edit Name</label>
                            <q-input v-model="name" outlined style="width:100%; margin: 2% 0 3%"  label="Edit Name:" />

                            <label for="">Edit Rank</label>
                            <q-input v-model="rank" outlined style="width:100%; margin: 2% 0 3%"  label="Edit Rank:" />

                            <div class="row q-my-md">
                              <q-space/>
                              <q-btn label="Save" color="secondary" />
                            </div>

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
                                    <q-input v-model="password" outlined style="margin: 4% 0" label="New Password:" />
                                    <q-input v-model="password" outlined style="margin: 4% 0" label="Enter Password Again:" />

                                     <div class="row q-my-md">
                                      <q-space/>
                                      <q-btn label="Save" color="secondary" />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
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
                <q-item clickable class="q-mb-md q-px-xl" active-class="bg-primary text-secondary" to="/task" style="border-radius: 15px" v-ripple >
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
                style="border-radius: 15px"
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
                style="border-radius: 15px"
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
                style="border-radius: 15px"
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
                  style="border-radius: 15px"
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
import { defineComponent } from 'vue'

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
      password: "",
      username:""

    }
  },
  methods: {
    logout(){
      // console.log("LOGOUT")
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userDept");
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");

      this.$store.commit('logout')
      this.$router.replace('/');
    },
    getProfile(){
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getProfile')
      .then(()=>{
        let req = this.$store.getters['defencestore/getProfile'];
        console.log(req.loggedUser)
        this.username = req.loggedUser.name;
        this.$q.loading.hide();
      })
    },
  },
  mounted(){
    this.getProfile();
  }
})
</script>

<style scoped>

</style>
