<template>
  <div class="q-pa-md bg-primary" style="height:80vh">
    <div class="q-gutter-y-md" style="width: 100%">
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
                    <q-input label="Username:" />
                    <q-input label="Password:" />
                    <q-input label="Role:" />
                    <q-input label="Department:" />
                  </div>

                  <div class="row justify-center q-mt-xl " style="height:40px">
                    <div style="width:20%" class="row">
                      <q-btn label="Create User" style="width: 100%;" color="negative"/>
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
            <q-list separator v-for="n in 15" :key="n" class="q-mb-sm">
              <UserItem />
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

const stringOptions = [
  'Department A', 'Department B', 'Department C', 'Department D', 'Department E', 'Department F'
]


export default {
  components: {
    UserItem
  },
  setup () {
    const options = ref(stringOptions)
    return {
      username: ref(''),
      password: ref(''),
      role: ref(''),
      department: ref(''),

      options,
      label: ref('mails'),

      // Filter Function
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
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
    }
  }
}
</script>

<style scoped>


</style>
