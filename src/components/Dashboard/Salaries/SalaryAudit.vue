<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { meta } from '@/types/types.ts'
import { fetchSalaryAudit } from '@/api/salaries.ts'

const audits = ref<
  {
    id: number
    name: string
    action: string
    old: string
    new: string
    date: string
  }[]
>([])

const metas = ref<meta>({
  current_page: 1,
  last_page: 1,
  per_page: 5,
  to: 1,
  total: 1
})

const route = useRoute()

onMounted(async () => {
  const res = await fetchSalaryAudit(route.params.id as string)
  if (res.status === 200) {
    audits.value = res.data.data
    metas.value = res.data.meta
  }else{
    audits.value = []
  }
})

const fetchData = async (page: number) => {
  try {
    const response = await fetchSalaryAudit(route.params.id as string, page)
    if (response.status === 200) {
      audits.value = response.data.data
      metas.value = response.data.meta
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-6">Audits</h2>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">

        <tr>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">
            <span>Name</span>
          </th>
          <th scope="col" class="px-6 py-3">
            <span>Action</span>
          </th>
          <th scope="col" class="px-6 py-3">
            <span>Old</span>
          </th>
          <th scope="col" class="px-6 py-3">
            <span>New</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr  v-if="audits.length === 0">
          <td
            colspan="5"
            class="text-center py-4 text-gray-500"

          >
            No audit found
          </td>
        </tr>
        <tr v-for="audit in audits" class="bg-white border-b border-gray-200" :key="audit.id">
          <td class="px-6 py-4 uppercase text-nowrap">{{ audit.date }}</td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ audit.name }}
          </th>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ audit.action }}
          </th>
          <td class="px-6 py-4">
            <p
              class="whitespace-nowrap"
              v-for="(line, index) in audit.old.split('\n')"
              :key="index"
            >
              {{ line }}
            </p>
          </td>
          <td class="px-6 py-4">
            <p
              class="whitespace-nowrap"
              v-for="(line, index) in audit.new.split('\n')"
              :key="index"
            >
              {{ line }}
            </p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="audits.length">
    <PaginationComponent
      :total-items="metas.total"
      :items-per-page="metas.per_page"
      :current-page="metas.current_page"
      @page-changed="fetchData"
      class="mt-6"
    />
    </div>
  </div>
</template>

<style scoped></style>
