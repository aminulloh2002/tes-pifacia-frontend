<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <h1 class="font-semibold text-xl">404 - Not Found</h1>
    <RouterLink to="/">
      <PrimaryButton class="my-5">Home</PrimaryButton>
    </RouterLink>
  </div>
</template>
