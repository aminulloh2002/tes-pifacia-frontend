<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Employee } from '@/types/types.ts'
import { useRoute } from 'vue-router'
import { fetchEmployeeDetails } from '@/api/employees.ts'
import EmployeeAudit from '@/components/Dashboard/Employees/EmployeeAudit.vue'

const employee = ref<Employee>({
  id: '',
  employee_code: '',
  full_name: '',
  is_active: false,
  hired_date: '',
  notes: [],
  department_id: '',
  department_name: '',
  document_url: '',
})

const route = useRoute()

onMounted(async () => {
  const res = await fetchEmployeeDetails(route.params.id as string)
  console.log(res.data.data)
  if (res.status === 200) {
    employee.value = res.data.data
  }
})
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-2xl font-bold">Employee Details</h2>
      </div>

      <div class="space-y-4 text-gray-800">
        <div>
          <span class="font-semibold">Name: </span>
          <span>{{ employee.full_name }}</span>
        </div>
        <div>
          <span class="font-semibold">code: </span>
          <span>{{ employee.employee_code }}</span>
        </div>

        <div>
          <span class="font-semibold">Status: </span>
          <span :class="employee.is_active ? 'text-green-600' : 'text-red-600'">
            {{ employee.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div>
          <span class="font-semibold">Hired Date: </span>
          <span>{{ employee.hired_date }}</span>
        </div>

        <div>
          <span class="font-semibold">Department: </span>
          <span>{{ employee.department_name }}</span>
        </div>
        <div>
          <span class="font-semibold">Documents: </span>
          <a
            v-if="employee.document_url"
            :href="employee.document_url"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Download Document</a
          >
        </div>

        <div>
          <span class="font-semibold">Notes:</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li v-for="(note, index) in employee.notes" :key="index">
              {{ note }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <EmployeeAudit />
  </main>
</template>

<style scoped></style>
