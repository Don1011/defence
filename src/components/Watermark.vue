<template>
    <div class="watermark">
      <img src="../assets/defense.png" alt="">
    </div>
</template>

<script>
export default {
  name: 'Watermark',
}
</script>

<style scoped>
  .watermark {
   position:absolute;
   top:50%;
   left:50%;
   transform: translate(-50%, -50%);
   opacity:0.1;
   /* z-index:1; */
   color:white;
   user-select: none;
}
</style>
