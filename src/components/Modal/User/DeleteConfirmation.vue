<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import useUserStore from '@/stores/useUserStore.ts'
import { deleteUser, fetchUsers } from '@/api/users.ts'
import { toast } from 'vue3-toastify'

const emit = defineEmits(['toggleModal'])

const props = defineProps({
  userIndex: {
    type: Number,
    required: true,
  },
})

const userStore = useUserStore()

const user = userStore.users[props.userIndex]

const deleteHandler = async () => {
  try {
    await deleteUser(user.id)
    const newUsers = await fetchUsers()
    if (newUsers.status === 200) {
      userStore.setUsers(newUsers.data)
      toast.success('User deleted successfully')
    }
    emit('toggleModal')
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>

<template>
  <div class="mb-5">
    <h1 class="text-lg">
      Are you sure you want to delete
      <span class="font-semibold text-red-500">{{ user.name }}</span> ?
    </h1>
    <span class="text-xs text-gray-500">ps: you won't be able to revert this.</span>
  </div>
  <footer class="flex justify-between">
    <PrimaryButton class="!py-2 !px-3 !h-9 bg-red-500 text-sm" @click="deleteHandler()"
      >Confirm
    </PrimaryButton>
    <PrimaryButton @click="$emit('toggleModal')" class="!py-2 !px-3 !h-9 text-sm bg-gray-800"
      >Close
    </PrimaryButton>
  </footer>
</template>
