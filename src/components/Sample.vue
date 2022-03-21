<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 70vh" class="shadow-2 rounded-borders">

          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />



      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="280"
        :breakpoint="500"
        class="bg-grey-3"
      >
          <div class="q-pa-sm column q-my-auto flex-center">
            <div v-for="n in 10" :key="n">Drawer {{ n }} / 50</div>
          </div>
      </q-drawer>

      <q-page-container>
        <q-page padding>

          Content

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawerRight: ref(false)
    }
  }
}



export function getAllUsers (context, data) {

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/admin/users',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response.data.doc);
      if(response.status === 201 || response.status === 200){
          context.commit('getAllUsers', {users: response.data.doc})
          resolve();
      }else{
          Notify.create({
              message: "Error fetching departments.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
        Notify.create({
            message: 'Error fetching departments.',
            color: 'red'
        })
    })
  })

}



export function createUser (context, data) {

  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/admin/users/create',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      },
      data: {
        username: data.username,
        password: data.password,
        role: data.role,
        department: data.department
      }
    })
    .then(response => {
      context.commit('createUser', {username, password, role, department})
      resolve()
       Notify.create({
          message: 'Success.',
          caption: 'User Created Successfully.',
          color: 'blue'
      })
    })
    .catch(err => {
      reject()
        Notify.create({
            message: 'Error creating User.',
            color: 'red'
        })
    })
  })

}




</script>



