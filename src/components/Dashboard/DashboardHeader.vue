<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import router from '@/router'

const emit = defineEmits(['toggleMobileMenu'])

const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <button @click="toggleMobileMenu" class="md:hidden block">
        <i class="pi pi-bars"></i>
      </button>
    </div>
    <PrimaryButton class="!h-9 !px-2 text-sm" @click="logout">Logout</PrimaryButton>
  </header>
</template>

<style scoped></style>
