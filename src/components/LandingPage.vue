<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
</script>

<template>
  <section class="h-full w-full flex items-center justify-center">
    <div
      class="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse,_lightblue_0%,_transparent_80%)]"
    ></div>
    <div class="text-center z-10">
      <h1
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold my-5 lg:mb-10"
      >
        Human Capital Management
      </h1>
      <p class="md:text-lg lg:text-xl xl:text-2xl">Pifacia Technical Test</p>
      <router-link to="/login">
        <PrimaryButton  class="my-5" >Sign In</PrimaryButton>
      </router-link>
    </div>
  </section>
</template>
