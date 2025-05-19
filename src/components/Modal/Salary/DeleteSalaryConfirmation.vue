<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import { toast } from 'vue3-toastify'
import useSalaryStore from '@/stores/useSalaryStore.ts'
import { deleteSalary, fetchSalaries } from '@/api/salaries.ts'

const emit = defineEmits(['toggleModal'])

const props = defineProps({
  salaryIndex: {
    type: Number,
    required: true,
  },
})

const salaryStore = useSalaryStore()

const salary = salaryStore.salaries[props.salaryIndex]

const deleteHandler = async () => {
  try {
    await deleteSalary(salary.id)
    const newSalary = await fetchSalaries()
    if (newSalary.status === 200) {
      salaryStore.setSalaries(newSalary.data)
      toast.success('Salary deleted successfully')
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
      <span class="font-semibold text-red-500">{{ salary.employee_name }}</span> ?
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
