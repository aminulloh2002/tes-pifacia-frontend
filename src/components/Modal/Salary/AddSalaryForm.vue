<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'
import { onMounted, ref } from 'vue'
import DynamicInput from '@/components/DynamicInput.vue'
import SelectInput from '@/components/Form/SelectInput.vue'
import type { SalaryPayload } from '@/types/types.ts'
import useSalaryStore from '@/stores/useSalaryStore.ts'
import { addSalary, fetchEmployeeSimplified, fetchSalaries } from '@/api/salaries.ts'
import { toast } from 'vue3-toastify'
import axios from 'axios'

const emit = defineEmits(['toggleModal'])
const error = ref<Record<string, string[]>>({})
const salaryStore = useSalaryStore()
const salary = ref<SalaryPayload>({
  employee_id: '',
  salary: 1000000,
  payment_date: '',
  notes: [],
  is_paid: 1,
})

const status = ref([
  { label: 'Paid', value: 1 },
  { label: 'Pending', value: 0 },
])

const employees = ref<{ label: string; value: string }[]>([])

onMounted(async () => {
  const res = await fetchEmployeeSimplified()
  for (const emp of res.data.data) {
    employees.value.push({
      label: emp.full_name,
      value: emp.id,
    })
  }
})

const isLoading = ref<boolean>(false)

const saveHandler = async () => {
  isLoading.value = true
  try {
    await addSalary(salary.value)

    const employees = await fetchSalaries()

    salaryStore.setSalaries(employees.data)

    toast.success('employee added successfully')
    emit('toggleModal')
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.errors) {
      error.value = err.response.data.errors
    } else {
      error.value.full_name = ['something went wrong']
    }
  }
  isLoading.value = false
}

const handleCreateOption = (value: number) => {
  salary.value.is_paid = value
}
</script>

<template>
  <div>
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Employee</label>
      <SelectInput
        :options="employees"
        v-model="salary.employee_id"
        @create-option="handleCreateOption"
      />
      <p v-if="error?.is_active?.length" class="text-red-600 text-sm mb-4">
        {{ error?.employee_id[0] }}
      </p>
    </div>
    <FormInput
      name="salary"
      type="number"
      placeholder="John Doe"
      v-model="salary.salary"
      :error="error?.salary?.length ? error?.salary[0] : ''"
    />

    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Is Paid</label>
      <SelectInput :options="status" v-model="salary.is_paid" @create-option="handleCreateOption" />
      <p v-if="error?.is_active?.length" class="text-red-600 text-sm mb-4">
        {{ error?.is_paid[0] }}
      </p>
    </div>
    <FormInput
      name="Payment Date"
      type="datetime-local"
      v-model="salary.payment_date"
      :error="error?.hired_date?.length ? error?.hired_date[0] : ''"
    />
    <DynamicInput name="Notes" type="text" placeholder="this is a note" v-model="salary.notes" />

    <footer class="flex justify-between">
      <PrimaryButton class="!py-2 !px-3 !h-9 text-sm" @click="saveHandler" :disabled="isLoading"
        >Save
      </PrimaryButton>
      <PrimaryButton @click="$emit('toggleModal')" class="!py-2 !px-3 !h-9 text-sm bg-gray-800"
        >Close
      </PrimaryButton>
    </footer>
  </div>
</template>

<style scoped></style>
