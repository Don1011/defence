<template>
  <div class="column">
    <div class="row">
      <q-btn
        @click="this.$router.back()"
        class="q-ma-md"
        flat
        round
        color="primary"
        icon="chevron_left"
      />
      <div class="column text-bold justify-center">John Doe</div>
    </div>
    <q-scroll-area class="messages message-scroll-area">
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-start">
        <div class="message-item-r q-pa-md q-ma-md bg-primary text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
      <div class="row justify-end">
        <div class="message-item-s q-pa-md q-ma-md bg-accent text-light col-9">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          aperiam excepturi unde officiis atque necessitatibus aliquid maxime
          obcaecati facilis fugit, quod laboriosam error deserunt culpa ipsa sed
          et iste inventore.
        </div>
      </div>
    </q-scroll-area>
    <div class="q-my-md q-mx-lg">
      <q-input filled bottom-slots v-model="text" label="Send Message">
        <template v-slot:append>
          <q-icon name="send" @click="text = ''" class="cursor-pointer" />
        </template>
        <template v-slot:after>
          <q-icon
            name="description"
            @click="text = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConversationPage",
};
</script>
<style>
.message-item-r {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}
.message-item-s {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
}
.message-scroll-area {
  height: 80vh;
}
</style>
