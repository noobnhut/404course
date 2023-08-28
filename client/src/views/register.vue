<template>
  <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">

      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
          <img src="https://e0.pxfuel.com/wallpapers/575/577/desktop-wallpaper-mobile-on-coding-programming-thumbnail.jpg" alt="" class="w-full h-full object-cover">
        </div>

        <div class="w-full lg:w-1/2 py-16 px-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import '../assets/login.css'
export default {
  data() {
    return {

    }
  },
}
</script>