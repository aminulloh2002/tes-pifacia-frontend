<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts'

const emit = defineEmits(['toggleCollapse', 'toggleMobileMenu'])

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
  showMobileMenu: {
    type: Boolean,
    default: false,
  },
})

const toggleCollapse = () => {
  emit('toggleCollapse')
}

const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const auth = useAuthStore()
</script>

<template>
  <aside
    :class="[
      'bg-white shadow-md transition-all duration-300',
      props.isMobile
        ? props.showMobileMenu
          ? 'fixed z-50 w-64 h-full'
          : 'hidden'
        : props.collapsed
          ? 'w-20'
          : 'w-64',
    ]"
  >
    <div
      :class="[
        'p-5 flex items-center border-b border-b-gray-200',
        props.collapsed ? 'justify-center' : 'justify-between',
      ]"
    >
      <span class="font-bold text-lg" v-if="!props.collapsed">HCM</span>
      <button @click="toggleCollapse" class="md:block hidden cursor-pointer">
        <i :class="props.collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"></i>
      </button>
      <button @click="toggleMobileMenu" class="md:hidden">✖</button>
    </div>
    <nav class="p-4 space-y-2 ">
      <router-link
        active-class="text-blue-500 font-semibold"
        to="/home/dashboard"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-home text-xl"></i>
        <span v-show="!props.collapsed">Home</span>
      </router-link>

      <router-link
        active-class="text-blue-500 font-semibold"
        v-if="auth.isAdministrator"
        to="/home/user"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-user text-xl"></i>
        <span v-show="!props.collapsed">User</span>
      </router-link>

      <router-link
        active-class="text-blue-500 font-semibold"
        to="/home/role"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-lock text-xl"></i>
        <span v-show="!props.collapsed">Role Management</span>
      </router-link>

      <div class="border-t border-gray-200 my-2"></div>

      <router-link
        active-class="text-blue-500 font-semibold"
        to="/home/departments"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-building text-xl"></i>
        <span v-show="!props.collapsed">Department</span>
      </router-link>
      <router-link
        active-class="text-blue-500 font-semibold"
        to="/home/employees"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-users text-xl"></i>
        <span v-show="!props.collapsed">Employee</span>
      </router-link>
      <router-link
        active-class="text-blue-500 font-semibold"
        to="/home/salaries"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500"
      >
        <i class="pi pi-money-bill text-xl"></i>
        <span v-show="!props.collapsed">Salary</span>
      </router-link>
    </nav>
  </aside>
</template>
