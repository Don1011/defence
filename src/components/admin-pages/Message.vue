<template>

  <div class="start" style="height:78vh">

  <!-- Water Marked Image  -->
    <div class="watermark">
      <img src="../../assets/defense.png" alt="">
    </div>

<!-- Message Content -->
    <div class="q-mx-lg q-mt-md">

    <!-- Mail Title  -->
      <div class="row items-align justify-between ">
        <!-- <div class="text-h5 text-bold text-capitalize">Lorem title</div> -->
        <q-space/>
        <div class="row justify-evenly col-3">
          <span class="q-my-auto">Date/Month/2022</span>
          <span class="q-my-auto">00 : 21 : 31</span>
        </div>
      </div>

   <!-- Sender's Name  -->
      <div class="text-subtitle1"><span class="text-bold text-grey" >From:</span> <span class="text-h6">Lorem Dude</span></div>

    <!-- heading -->
      <div class="q-mx-auto text-center text-h5 text-bold text-uppercase q-px-md q-my-xl" style="width:50%; text-decoration:underline">Lorem Heading and Ipsuim</div>

      <!--Message Body  -->
      <div class="q-mx-auto text-subtitle1 text-justify q-px-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat nemo quidem nam velit minima quod neque culpa, ad dolorum saepe maiores accusamus harum facilis reprehenderit earum vel. Excepturi, aperiam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat nemo quidem nam velit minima quod neque culpa, ad dolorum saepe maiores accusamus harum facilis reprehenderit earum vel. Excepturi, aperiam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat nemo quidem nam velit minima quod neque culpa, ad dolorum saepe maiores accusamus harum facilis reprehenderit earum vel. Excepturi, aperiam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat nemo quidem nam velit minima quod neque culpa, ad dolorum saepe maiores accusamus harum facilis reprehenderit earum vel. Excepturi, aperiam?
        <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat nemo quidem nam velit minima quod neque culpa, ad dolorum saepe maiores accusamus harum facilis reprehenderit earum vel. Excepturi, aperiam? -->
      </div>


    </div>

  </div>
</template>

<script>

export default {

}
</script>

<style scoped>


  .watermark {
   position:absolute;
   top:50%;
   left:50%;
   transform: translate(-25%, -25%);
   opacity:0.1;
   z-index:-99;
   color:white;
   user-select: none;
}
</style>
