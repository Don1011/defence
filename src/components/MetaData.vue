<template>
        <q-drawer
            side="right"
            v-model="toggle"
            bordered
            :width="300"
            :breakpoint="500"
            class="bg-grey-3"
            style="height: 80vh;"
        >


              <q-scroll-area style="height: 80vh;">

                <div class=" column q-my-auto flex-center">
                  <q-card style="height: 80vh;width:100% ">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="text-grey"
                      active-color="secondary"
                      indicator-color="secondary"
                      align="justify"
                      indicator
                    >
                      <q-tab name="forwardedTo" label="Forwarded To" />
                      <q-tab name="alarms" label="Minutes" />

                      <!-- <q-tab name="movies" label="Movies" /> -->
                    </q-tabs>

                    <q-separator />
                    <!-- Seen section  -->
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="forwardedTo" >
                        <q-scroll-area  style="height: 70vh">

                          <!-- <div class="text-h6">Seen</div> -->
                          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. -->

                          <q-card class="row justify-between q-pr-md q-my-xs" v-for="forwardedToListItem in forwardedTo" :key="forwardedToListItem._id">
                            <q-item>
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                  </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label>{{forwardedToListItem.by.username}}</q-item-label>
                                  <q-item-label caption class="text-red">
                                    {{forwardedToListItem.read ? "seen" : ""}}
                                  </q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label caption>
                                        <span class="q-ml-lg text-caption text-end">{{forwardedToListItem.date.split("T")[0]}} </span>
                                    </q-item-label>
                                    <q-item-label caption>
                                        <span class="q-ml-lg text-caption text-end">{{forwardedToListItem.date.split("T")[1].split(".")[0]}} </span>
                                    </q-item-label>
                                </q-item-section>
                              </q-item>
                          </q-card>
                        </q-scroll-area>
                      </q-tab-panel>

                    <!-- Comments Section  -->
                      <q-tab-panel name="alarms" style="">
                        <q-scroll-area style="height: 70vh">

                            <q-card class="my-card  q-my-sm" v-for="minutesListItem in minutesList" :key="minutesListItem._id" flat bordered>
                              <q-item class="row justify-between q-pr-md">
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                  </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label>{{minutesListItem.by.username}}</q-item-label>
                                  <q-item-label caption>
                                    {{minutesListItem.by.role}}
                                  </q-item-label>
                                </q-item-section>
                                 <q-item-section>
                                    <q-item-label caption>
                                        <span class="q-ml-lg text-caption text-end">{{minutesListItem.date.split("T")[0]}} </span>
                                    </q-item-label>
                                    <q-item-label caption>
                                        <span class="q-ml-lg text-caption text-end">{{minutesListItem.date.split("T")[1].split(".")[0]}} </span>
                                    </q-item-label>
                                </q-item-section>
                              </q-item>

                              <q-separator />

                              <q-card-section horizontal>
                                <q-card-section>
                                  {{minutesListItem.comment}}
                                </q-card-section>
                              </q-card-section>
                            </q-card>


                        </q-scroll-area>

                        <!-- Sticky Button  -->
                             <q-page-sticky position="bottom-left"  :offset="[18, 18]">
                                <q-btn
                                style="margin: 0 auto"
                                round
                                size="1.2rem"
                                class=" q-mb-lg cursor-pointer"
                                  icon="add"
                                  color="secondary"
                                  @click="bar = true"
                                />

                              </q-page-sticky>


                          <!-- Dialog for stick Button  -->
                          <q-dialog v-model="bar">
                            <q-card>

                              <q-card-section class="q-pt-none">
                                <p class="text-h5 q-my-sm text-secondary text-bold">Add Comments</p>
                                 <q-input
                                    v-model="comment"
                                    filled
                                    type="textarea"
                                    placeholder="Comments..."
                                  />
                              </q-card-section>

                              <q-card-actions align="right">
                                <q-btn @click="saveComment" label="Comment" color="secondary" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>

                      </q-tab-panel>


                    </q-tab-panels>
                  </q-card>

                </div>
              </q-scroll-area>
          </q-drawer>

</template>

<script>
import { Notify }from 'quasar';

export default {
    name: 'MetaData',
    props: ['toggle', 'tab', 'metaData', 'forwardedTo', 'request', 'minutesList'],
    data(){
        return{
            comment: "",
            bar: false
        }
    },
    methods: {
        saveComment(){
            if(this.comment !== ""){
                this.$store.dispatch('defencestore/saveComment', {
                    text: this.comment, request: this.request
                })
                .then(()=>{
                    window.location.reload();
                })
                .catch(err=>{
                    Notify.create({
                        message: 'You can\'t leave the "Comments" field empty.',
                        color: 'red'
                    })
                })
            }else{
                Notify.create({
                message: 'You can\'t leave the "Comments" field empty.',
                color: 'red'
                })
            }
        }
    }
}
</script>

<style scoped>



</style>
