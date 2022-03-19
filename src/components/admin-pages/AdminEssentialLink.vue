<template>
  <q-page class="bg-secondary text-white q-pt-md" style="height:100vh">

<!-- Profile part  -->
    <div class=" column itmes-center">

      <q-avatar class="bg-primary q-mx-auto" size="5rem">
        <q-icon size="3.5rem" color="secondary" name="person"/>
      </q-avatar>

      <div class="flex  items-center q-mx-auto q-my-md">
        <p class="q-my-auto q-mr-md text-weight-thin">DDC REGISTRY</p>
        <q-icon name="notifications" size="1.3rem"/>
      </div>

    </div>

<!-- Dashboard Text  -->
    <div class="flex items-center q-mt-xl q-mx-auto flex flex-center">
        <q-icon name="dashboard" size="1.5rem" class="q-mr-md"/>
        <p class="q-my-auto text-h6">ADMIN DASHBOARD</p>
    </div>

<!-- Navigation Buttons/Links  -->
    <div class="flex flex-center q-my-xl">
        <q-list class="q-my-lg">
                <q-item clickable class="q-mb-md q-px-xl"
                active-class="bg-primary text-secondary"
                v-ripple
                :active="link === 'Users'"
                @click="link = 'Users'"
                style="border-radius: 25px"
                to="/admin/users"
                >

                    <q-item-section avatar>
                        <q-icon name="man" size="1.5rem"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Users</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl" active-class="bg-primary text-secondary" to="/admin/departments" style="border-radius: 25px" v-ripple >
                    <q-item-section avatar>
                        <q-icon name="home" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Deparments</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable class="q-mb-md q-px-xl" active-class="bg-primary text-secondary" to="/admin/messages" style="border-radius: 25px" v-ripple >
                    <q-item-section avatar>
                        <q-icon name="message" size="1.5rem" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-left text-subtitle1">Messages</q-item-label>
                    </q-item-section>
                </q-item>

        </q-list>

    </div>


     <div class="q-py-none row  q-mt-xl" >
              <q-space/>
              <q-item clickable class=""
                active-class="my-menu-link"
                v-ripple
                :active="link === 'Logout'"
                @click="link = 'Logout'" style="width:70%" >

                <q-item-section avatar>
                    <q-icon name="logout" size="2rem" />
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-h6 text-center">Logout</q-item-label>
                </q-item-section>
                </q-item>
                <q-space/>
            </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',

})
</script>

<style scoped>

</style>
