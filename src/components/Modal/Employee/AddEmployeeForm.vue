<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'
import { onMounted, ref } from 'vue'
import DynamicInput from '@/components/DynamicInput.vue'
import SelectInput from '@/components/Form/SelectInput.vue'
import { fetchDepartments } from '@/api/departments.ts'
import type { EmployeePayload } from '@/types/types.ts'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import { addEmployee, fetchEmployees } from '@/api/employees.ts'
import useEmployeeStore from '@/stores/useEmployeeStore.ts'

const emit = defineEmits(['toggleModal'])
const error = ref<Record<string, string[]>>({})
const employeeStore = useEmployeeStore()
const employeePayload = ref<EmployeePayload>({
  document: null,
  employee_code: '',
  full_name: '',
  hired_date: '',
  notes: [''],
  is_active: 1,
  department_id: '',
})

const status = ref([
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 },
])

const department = ref<{ label: string; value: string }[]>([])

onMounted(async () => {
  const res = await fetchDepartments()
  for (const dep of res.data.data) {
    department.value.push({
      label: dep.name,
      value: dep.id,
    })
  }
})

const isLoading = ref<boolean>(false)

const saveHandler = async () => {
  isLoading.value = true

  const formData = new FormData()

  formData.append('document', employeePayload.value.document)
  formData.append('employee_code', employeePayload.value.employee_code)
  formData.append('full_name', employeePayload.value.full_name)
  formData.append('hired_date', employeePayload.value.hired_date)
  formData.append('is_active', employeePayload.value.is_active.toString())
  formData.append('department_id', employeePayload.value.department_id)

  employeePayload.value.notes.forEach(note => {
    formData.append('notes[]', note)
  })

  try {
    await addEmployee(formData)

    const employees = await fetchEmployees()

    employeeStore.setEmployees(employees.data)

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


const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  employeePayload.value.document = target?.files?.[0];
};

const handleCreateOption = (value: number) => {
  employeePayload.value.is_active = value
}
</script>

<template>
  <div>
    <FormInput
      name="name"
      type="text"
      placeholder="John Doe"
      v-model="employeePayload.full_name"
      :error="error?.full_name?.length ? error?.full_name[0] : ''"
    />
    <FormInput
      name="Employee Code"
      type="text"
      placeholder="1234"
      v-model="employeePayload.employee_code"
      :error="error?.employee_code?.length ? error?.name[0] : ''"
    />
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Document</label>
      <input
        type="file"
        :class="[{ 'border-red-500': error?.document?.[0] }]"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 invalid:border-red-500 invalid:ring-red-500 block p-2.5 w-full outline-0"
        @change="handleFileChange($event)"
      />
      <p v-if="error?.document?.length" class="text-red-600 text-sm mb-4">
        {{ error?.document?.[0] }}
      </p>
    </div>
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Department</label>
      <SelectInput
        :options="department"
        v-model="employeePayload.department_id"
        @create-option="handleCreateOption"
      />
      <p v-if="error?.department_id?.length" class="text-red-600 text-sm mb-4">
        {{ error?.department_id[0] }}
      </p>
    </div>
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Status</label>
      <SelectInput
        :options="status"
        v-model="employeePayload.is_active"
        @create-option="handleCreateOption"
      />
      <p v-if="error?.is_active?.length" class="text-red-600 text-sm mb-4">
        {{ error?.is_active[0] }}
      </p>
    </div>
    <FormInput
      name="Hired Date"
      type="datetime-local"
      v-model="employeePayload.hired_date"
      :error="error?.hired_date?.length ? error?.hired_date[0] : ''"
    />
    <DynamicInput
      name="Notes"
      type="text"
      placeholder="this is a note"
      v-model="employeePayload.notes"
    />

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
