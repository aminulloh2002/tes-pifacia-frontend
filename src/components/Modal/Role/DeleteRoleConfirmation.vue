<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import { toast } from 'vue3-toastify'
import useRoleStore from '@/stores/useRoleStore.ts'
import { deleteRole, fetchAllRoles } from '@/api/roles.ts'

const emit = defineEmits(['toggleModal'])

const props = defineProps({
  roleIndex: {
    type: Number,
    required: true,
  },
})

const roleStore = useRoleStore()

const role = roleStore.roles[props.roleIndex]

const deleteHandler = async () => {
  try {
    await deleteRole(role.id)
    const newRoles = await fetchAllRoles()
    if (newRoles.status === 200) {
      roleStore.setRoles(newRoles.data)
      toast.success('Role deleted successfully')
    }
    emit('toggleModal')
  } catch (error) {
    console.error('Error deleting role:', error)
  }
}
</script>

<template>
  <div class="mb-5">
    <h1 class="text-lg">
      Are you sure you want to delete
      <span class="font-semibold text-red-500">{{ role.name }}</span> ?
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
