<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'

const collapsed = ref(false)
const showMobileMenu = ref(false)
const isMobile = ref(false)

// Watch screen size
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})


const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <DashboardSidebar
      :collapsed="collapsed"
      :show-mobile-menu="showMobileMenu"
      :is-mobile="isMobile"
      @toggle-mobile-menu="toggleMobileMenu"
      @toggle-collapse="toggleCollapse"
    />

    <div class="flex-1 flex flex-col">
      <DashboardHeader @toggle-mobile-menu="toggleMobileMenu" />

      <router-view />
    </div>
  </div>
</template>
