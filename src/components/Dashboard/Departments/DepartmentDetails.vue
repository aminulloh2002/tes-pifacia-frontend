<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Department } from '@/types/types.ts'
import { fetchDepartmentDetails } from '@/api/departments.ts'
import { useRoute } from 'vue-router'
import DepartmentAudit from '@/components/Dashboard/Departments/DepartmentAudit.vue'

const department = ref<Department>({
  id: '',
  name: '',
  is_active: false,
  established_at: '',
  notes: [],
})

const route = useRoute()

onMounted(async () => {
  const res = await fetchDepartmentDetails(route.params.id as string)
  if (res.status === 200) {
    department.value = res.data.data
  }
})
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6">Department Details</h2>

      <div class="space-y-4 text-gray-800">
        <div>
          <span class="font-semibold">Name: </span>
          <span>{{ department.name }}</span>
        </div>

        <div>
          <span class="font-semibold">Status: </span>
          <span :class="department.is_active ? 'text-green-600' : 'text-red-600'">
            {{ department.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div>
          <span class="font-semibold">Established At: </span>
          <span>{{ department.established_at }}</span>
        </div>

        <div>
          <span class="font-semibold">Notes:</span>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li v-for="(note, index) in department.notes" :key="index">
              {{ note }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <DepartmentAudit />
  </main>
</template>

<style scoped></style>
