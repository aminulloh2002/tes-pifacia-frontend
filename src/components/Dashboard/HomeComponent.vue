<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts'

const auth = useAuthStore()
const username = auth.user?.name
</script>

<template>
  <main class="flex-1 p-6">
    <h1 class="text-xl mb-5 font-semibold">Welcome, {{ username }}</h1>
  </main>
</template>

<style scoped></style>
