<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import { toast } from 'vue3-toastify'
import useDepartmentStore from '@/stores/useDepartmentStore.ts'
import { deleteDepartment, fetchDepartments } from '@/api/departments.ts'

const emit = defineEmits(['toggleModal'])

const props = defineProps({
  roleIndex: {
    type: Number,
    required: true,
  },
})

const departmentStore = useDepartmentStore()

const department = departmentStore.departments[props.roleIndex]

const deleteHandler = async () => {
  try {
    await deleteDepartment(department.id)
    const newDepartments = await fetchDepartments()
    if (newDepartments.status === 200) {
      departmentStore.setDepartments(newDepartments.data)
      toast.success('Department deleted successfully')
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
      <span class="font-semibold text-red-500">{{ department.name }}</span> ?
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
