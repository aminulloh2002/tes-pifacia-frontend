<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type {  Salary } from '@/types/types.ts'
import { useRoute } from 'vue-router'
import EmployeeAudit from '@/components/Dashboard/Employees/EmployeeAudit.vue'
import { fetchSalaryDetails } from '@/api/salaries.ts'
import SalaryAudit from '@/components/Dashboard/Salaries/SalaryAudit.vue'

const salary = ref<Salary>({
  id: '',
  salary: '',
  employee_id: '',
  employee_name: '',
  is_paid: 0,
  notes: [],
  payment_date: '',
})

const route = useRoute()

onMounted(async () => {
  const res = await fetchSalaryDetails(route.params.id as string)
  if (res.status === 200) {
    salary.value = res.data.data
  }
})
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-2xl font-bold">Salary Details</h2>
      </div>

      <div class="space-y-4 text-gray-800">
        <div>
          <span class="font-semibold">Name: </span>
          <span>{{ salary.employee_name }}</span>
        </div>
        <div>
          <span class="font-semibold">Salary: </span>
          <span>Rp {{ salary.salary }}</span>
        </div>

        <div>
          <span class="font-semibold">Is Paid: </span>
          <span :class="salary.is_paid ? 'text-green-600' : 'text-red-600'">
            {{ salary.is_paid ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div>
          <span class="font-semibold">Payment Date: </span>
          <span>{{ salary.payment_date }}</span>
        </div>

        <div>
          <span class="font-semibold">Notes:</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li v-for="(note, index) in salary.notes" :key="index">
              {{ note }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <SalaryAudit />
  </main>
</template>

<style scoped></style>
