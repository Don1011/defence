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
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          spinner-color="white"
          style="height: 110px; width: 110px; border-radius:100%;"
          img-class="my-custom-image"
          class="rounded-borders "
          @mouseenter="edit = true"
          @mouseleave="edit =false"

        >
          <div class="absolute-bottom" v-show="edit" style="padding: 0; height: 30px" >
            <q-btn no-caps icon="add" @click="editFormShow=true"  unelevated label="Edit" style="width:100%;" size="0.7rem"/>
          </div>
        </q-img>
        <q-space/>
      </div>

      <q-dialog v-model="editFormShow" persistent>
        <q-card>
            <q-card-section class="items-center">
                <div class="column q-mt-md">
                    <div class="bg-white col q-px-md column justify-between q-pb-md" style="height:300px;border-radius:0 0 4px 4px">
                        <div class = "q-mx-sm">
                            <q-file
                              v-model="selectedFile"
                              label="Select New Profile Picture"
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

                            <q-input v-model="name" label="Edit Name:" />
                            <q-input v-model="rank" label="Edit Rank:" />
                            <q-expansion-item
                              expand-separator
                              icon="lock"
                              label="Edit password"
                              class="q-mt-md rounded-borders"
                            >
                              <q-card>
                                <q-card-section>
                                  <div class = "q-my-sm">
                                    <q-input v-model="password" label="New Password:" />
                                    <q-input v-model="password" label="Enter Password Again:" />
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cancel" color="red"  v-close-popup />
            <q-btn label="Save" color="negative"  />
            </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="flex  items-center q-mx-auto q-my-md">
        <p class="q-my-auto q-mr-md text-weight-medium">User Name</p>
        <q-icon name="notifications" size="1.3rem"/>
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
                <q-item clickable class="q-mb-md q-px-xl" active-class="bg-primary text-secondary" to="/request" style="border-radius: 25px" v-ripple >
                    <q-item-section avatar>
                        <q-icon name="home" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Request</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Products'"
                @click="link = 'Products'"
                style="border-radius: 25px"
                to="/mail"
                >

                    <q-item-section avatar>
                        <q-icon name="storefront" size="1.5rem"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Mail</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Settings'"
                @click="link = 'Settings'"
                style="border-radius: 25px"
                to="/logs"
                >

                    <q-item-section avatar>
                        <q-icon name="view_list" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Logs</q-item-label>
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  data(){
    return{
      edit: false,
      editFormShow: false,

      selectedFile: null,
      name: "",
      rank: "",
      password: ""

    }
  },
  methods: {
    logout(){
      // console.log("LOGOUT")
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userDept");
      localStorage.removeItem("userToken");

      this.$store.commit('logout')
      this.$router.replace('/');
    }
  }
})
</script>

<style scoped>

</style>
