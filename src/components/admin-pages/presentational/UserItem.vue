<template>

    <q-item clickable class="row text-center bg-white" style="border-radius: 4px">
        <div class="row col-9">
            <q-item-section  >{{user.username}} </q-item-section>
            <q-item-section>{{user.role}} </q-item-section>
            <q-item-section>{{user.department.abbr}}</q-item-section>
        </div>
        <q-item-section>
            <div class="row justify-evenly">
                <q-btn @click="editDialog = true" label="Edit" class="bg-negative text-white text-subtitle2" style="width: 40%;height: 30px"/>
                <q-btn @click="deleteDialog = true" label="Delete" class="bg-red text-white text-subtitle2" style="width: 40%; height:30px"/>
            </div>
        </q-item-section>

        <!-- Delete Dialog -->
        <q-dialog v-model="deleteDialog" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="delete" color="red" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to delete?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Cancel" color="secondary" v-close-popup />
                <q-btn flat label="Yes" color="red" v-close-popup @click="() => deleteUser(this.user._id)" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Edit Dialog -->
        <q-dialog v-model="editDialog" persistent>
          <q-card style=" width:30%;">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Edit User's Profile</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="items-center">
                <div class="column q-mt-md">
                    <div class="bg-white col q-px-md column justify-between q-pb-md" style="border-radius:0 0 4px 4px">
                        <div class = "q-mx-sm">
                            <!-- <q-separator/> -->
                            <!-- <label for="">Enter New Name</label> -->
                            <q-input v-model="name" outlined style="width:100%; margin: 2% 0 3%"  label="Enter New Name:" />

                            <!-- <label for="">Enter New Name</label> -->
                            <q-input v-model="rank" outlined style="width:100%; margin: 2% 0 3%"  label="Enter New Rank:" />

                            <div class="row q-my-md">
                              <q-space/>
                              <q-btn @click="() => editProfile(user._id)" label="Save" color="secondary" />
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
                                    <q-input type="password" v-model="newPassword" outlined style="margin: 4% 0" label="New Password:" />
                                    <q-input type="password" v-model="confirmNew" outlined style="margin: 4% 0" label="Enter Password Again:" />

                                    <div class="row q-my-md">
                                      <q-space/>
                                      <q-btn @click="() => editPassword(user._id)" label="Save" color="secondary" />
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
    </q-item>

</template>

<script>
import { ref } from 'vue'

export default {
    data () {
      return {
          editDialog:false,
          deleteDialog:false,
          name:'',
          rank:'',
          newPassword:'',
          confirmNew:'',
          changePasswordLoader: false
        }
    },
    props: ['user', 'deleteUser', 'editUser'],
    methods: {
      deleteUser (id) {
        this.$q.loading.show();
        this.$store.dispatch('defencestore/adminDeleteUser', {id})
        .then(() => {
          this.$q.loading.hide();
          this.$router.go();
        })
        .catch(err=>{
          this.$q.loading.hide();
        })
      },
      editProfile (id) {
        this.editProfileLoader = true;
        this.$store.dispatch('defencestore/adminEditUser', {
          id,
          name: this.name,
          rank: this.rank
        })
        .then(() => {
          this.editProfileLoader = false;
          this.$router.go();
        })
        .catch(err=>{
          this.editProfileLoader = false;
        })
      },
      editPassword (id) {
        this.changePasswordLoader=true;
        this.$store.dispatch('defencestore/adminEditUserPassword', {
          id,
          newPassword: this.newPassword,
          confirmNew: this.confirmNew
        })
        .then(() => {
          this.changePasswordLoader = false;
          this.$router.go();
        })
        .catch(err=>{
          this.changePasswordLoader = false;
        })
      }
    },
    mounted(){
      this.name=this.user.name
      this.rank=this.user.rank
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
  .clear{
  clear: both;
}


.slide-toggle{
  display: none;
}

/* .slidemenu{
  font-family: arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  overflow: hidden;
} */

.slidemenu label{
  width: 25%;
  text-align: center;
  display: block;
  float: left;
  color: #333;
  opacity: 0.2;

}

.slidemenu label:hover{
  cursor: pointer;
  color: #666;
}

/* .slidemenu label span{
  display: block;
  padding: 10px;
} */
/*
.slidemenu label .icon{
  font-size: 20px;
  border: solid 2px #333;
  text-align: center;
  height: 50px;
  width: 50px;
  display: block;
  margin: 0 auto;
  line-height: 50px;
  border-radius: 50%;
} */

/*Bar Style*/

.slider{
  width: 100%;
  height: 5px;
  display: block;
  background: #ccc;
  margin-top: 10px;
  border-radius: 5px;
}

.slider .bar{
  width: 50%;
  height: 5px;
  background: #333;
  border-radius: 5px;
}

/*Animations*/
.slidemenu label, .slider .bar {
  transition: all 500ms ease-in-out;
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
}

/*Toggle*/

.slidemenu .slide-toggle:checked + label{
  opacity: 1;
}



.slidemenu #slide-item-1:checked ~ .slider .bar{ margin-left: 0; }
.slidemenu #slide-item-2:checked ~ .slider .bar{ margin-left: 50%; }
/* .slidemenu #slide-item-3:checked ~ .slider .bar{ margin-left: 50%; }
.slidemenu #slide-item-4:checked ~ .slider .bar{ margin-left: 75%; } */

.accordion-label{
  padding: 12px
}

</style>
