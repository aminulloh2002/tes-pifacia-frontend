<script setup lang="ts">
import LoginForm from '@/components/Form/LoginForm.vue'
</script>

<template>
  <main class="w-full h-screen flex flex-col items-center justify-center">
    <div
      class="border-1 border-gray-300 rounded-lg p-5 md:p-10 bg-gray-100 w-[75%] md:w-[50%] xl:w-[25%]"
    >
      <p class="mb-5 text-lg font-medium text-center">Login</p>
      <LoginForm/>
    </div>
  </main>
</template>
