<template>
  <div class="q-pa-md bg-primary" style="height:80vh;">
    <div class="q-gutter-y-md" style="width: 100%;">
      <q-card>
        <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="add"
          label="Add User"
          class = "accordion-label q-py-md"

        >
          <q-card>
            <q-card-section>
              <div class="column">
                <div class="bg-white col q-px-md column justify-between q-pb-md" style="height:300px;border-radius:0 0 4px 4px">
                  <div class = "q-mx-xl">
                    <q-input label="Username:" v-model="username" />
                    <q-input label="Password:" v-model="password"/>
                    <q-select  v-model="role" :options="roles" use-input input-debounce="0" label="Role"  >
                      <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                    </q-select>
                    <q-select  v-model="department" :options="departments" use-input input-debounce="0" label="Department"  >
                      <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                    </q-select>
                  </div>

                  <div class="row justify-center q-mt-xl " style="height:40px">
                    <div style="width:20%" class="row">
                      <q-btn label="Create User" @click="onSubmit" style="width: 100%;" color="negative"/>
                    </div>
                  </div>
                </div>
              </div>

            </q-card-section>
          </q-card>
        </q-expansion-item>

      </q-card>
      <q-card flat class="bg-primary" >
        <q-scroll-area style="height: 65vh;">
          <div class="text-subtitle2 text-secondary">
            <q-list separator v-for="user in users" :key="user._id" class="q-mb-sm">
              <UserItem :user="user" />
            </q-list>
          </div>
        </q-scroll-area>
      </q-card>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import UserItem from './presentational/UserItem.vue';




export default {
  components: {
    UserItem
  },
  setup () {
    return {
      username: ref(''),
      password: ref(''),
      role: ref(''),
      roles: ['Registry', 'Cheif Clerk', 'PA', 'Director', 'Cheif', 'Admin'],
      department: ref(''),
      departments: [],
      users: [],

      label: ref('mails'),

      // Filter Function




    }
  },
 methods: {
    selectFile(){
      this.$refs.selectImageFile.$el.click();
    },
    fileSelected(el){
      el=el.split('\\');
      el=el[el.length-1];
      this.selectedFile = el;
    },
    unSelectFile(){
      this.selectedFile = null;
    },
     onSubmit () {
        console.log(this.title);
        console.log(this.text);
        if(this.username !== "" && this.password !== "" && this.role !== "" && this.department !== "" ){
          this.$q.loading.show();
          this.$store.dispatch('defencestore/createUser', {
            username: this.username,
            password: this.password,
            role: this.role,
            department: this.department
          })
          .then(()=> {
            this.$q.loading.hide();
            this.onReset()
          })
        }else{
          // this.$q.loading.hide();
          Notify.create({
            message: "You must fill the form completely before submitting",
            color: "red"
          })
        }
      },
      onReset () {
        this.username = ""
        this.password = ""
        this.roles = []
        this.departments = []
      },

      fetchDepartments(){
      this.$store.dispatch('defencestore/getAllDepartmentsAdmin')
      .then(() => {
        this.departments = this.$store.getters['defencestore/getAllDepartmentsAdmin']
        // console.log(departments);
      });
    },

    fetchUsers(){
        console.log('req');
      this.$q.loading.show();
      this.$store.dispatch('defencestore/getAllUsersAdmin')
      .then(()=>{
        let req = this.$store.getters['defencestore/getAllUsersAdmin'];
        console.log(req);
        this.users = req;
        this.$q.loading.hide();
      })
    }

  },
  mounted(){
    this.fetchDepartments();
    this.fetchUsers()
  }
}
</script>

<style scoped>


</style>
