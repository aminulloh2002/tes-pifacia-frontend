<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { fetchSalaries } from '@/api/salaries.ts'
import useSalaryStore from '@/stores/useSalaryStore.ts'
import DeleteSalaryConfirmation from '@/components/Modal/Salary/DeleteSalaryConfirmation.vue'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import AddSalaryForm from '@/components/Modal/Salary/AddSalaryForm.vue'
import UpdateSalaryForm from '@/components/Modal/Salary/UpdateSalaryForm.vue'

const SalaryStore = useSalaryStore()
const { salaries } = storeToRefs(SalaryStore)
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedSalaryIndex = ref(-1)
const orderBy = ref<string>('created_at')
const asc = ref<boolean>(true)

onMounted(async () => {
  try {
    const response = await fetchSalaries()
    if (response.status === 200) {
      SalaryStore.setSalaries(response.data)
    }
  } catch (error) {
    console.log(error)
  }
})

let timeout: number

watch([orderBy, asc], ([newOrder, newAsc]) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    const res = await fetchSalaries(search.value, 1, newOrder, newAsc)
    if (res.status === 200) {
      SalaryStore.setSalaries(res.data)
    }
  }, 300)
})

watch(search, (newVal) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (newVal) {
      const res = await fetchSalaries(newVal)
      if (res.status === 200) {
        SalaryStore.setSalaries(res.data)
      }
    } else {
      const res = await fetchSalaries()
      if (res.status === 200) {
        SalaryStore.setSalaries(res.data)
      }
    }
  }, 300)
})

const openDeleteModal = (index: number) => {
  selectedSalaryIndex.value = index
  showDeleteModal.value = true
}

const openEditModal = (index: number) => {
  selectedSalaryIndex.value = index
  showEditModal.value = true
}

const fetchData = async (page: number) => {
  try {
    const response = await fetchSalaries(search.value, page, orderBy.value, asc.value)
    if (response.status === 200) {
      SalaryStore.setSalaries(response.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const setOrder = (order: string) => {
  if (orderBy.value === order) {
    asc.value = !asc.value
  } else {
    orderBy.value = order
    asc.value = true
  }
}
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex justify-between items-center mb-5">
        <PrimaryButton class="text-sm !h-8 !px-2 !py-1" @click="showAddModal = true"
          >Add Salary
        </PrimaryButton>

        <input
          v-model="search"
          class="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-0"
          placeholder="Search.."
        />
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">
                <span
                  @click="setOrder('employees.full_name')"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Name</span>
                  <i
                    v-if="orderBy === 'employees.full_name'"
                    :class="[
                      'pi',
                      orderBy === 'employees.full_name' && asc
                        ? 'pi-sort-amount-up'
                        : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span @click="setOrder('salary')" class="cursor-pointer flex items-center gap-1">
                  <span>Salary</span>
                  <i
                    v-if="orderBy === 'salary'"
                    :class="[
                      'pi',
                      orderBy === 'salary' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span @click="setOrder('is_paid')" class="cursor-pointer flex items-center gap-1">
                  <span class="text-nowrap">Already Paid</span>
                  <i
                    v-if="orderBy === 'is_paid'"
                    :class="[
                      'pi',
                      orderBy === 'is_paid' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span
                  @click="setOrder('payment_date')"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Payment Date</span>
                  <i
                    v-if="orderBy === 'payment_date'"
                    :class="[
                      'pi',
                      orderBy === 'payment_date' && asc
                        ? 'pi-sort-amount-up'
                        : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>

              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="salaries.length === 0">
              <td colspan="5" class="text-center py-4 text-gray-500">No salary found</td>
            </tr>
            <tr
              v-for="(salary, index) in salaries"
              class="bg-white border-b border-gray-200"
              :key="salary.id"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ (SalaryStore.current_page - 1) * SalaryStore.per_page + index + 1 }}
              </th>
              <td class="px-6 py-4 uppercase">{{ salary.employee_name }}</td>
              <td class="px-6 py-4 uppercase">Rp {{ salary.salary }}</td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span v-if="salary.is_paid" class="text-green-500">Paid</span>
                <span v-else class="text-gray-500">Pending</span>
              </th>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ salary.payment_date }}
              </td>
              <td class="px-6 py-4 text-right text-nowrap">
                <router-link
                  :to="'/home/salaries/' + salary.id"
                  class="mx-2 font-medium text-green-600 hover:underline"
                >
                  Details
                </router-link>
                <a
                  href="#"
                  @click="openEditModal(index)"
                  class="mx-2 font-medium text-blue-600 hover:underline"
                  >Edit</a
                >

                <a
                  href="#"
                  @click="openDeleteModal(index)"
                  class="mx-2 font-medium text-red-600 hover:underline"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <PaginationComponent
        :total-items="SalaryStore.total"
        :items-per-page="SalaryStore.per_page"
        :current-page="SalaryStore.current_page"
        @page-changed="fetchData"
        class="mt-6"
      />

      <ModalComponent
        v-model="showAddModal"
        title="Add Salary"
        @close="() => (showAddModal = false)"
      >
        <AddSalaryForm @toggle-modal="showAddModal = false" />
      </ModalComponent>
      <ModalComponent
        v-model="showEditModal"
        title="Edit Salary"
        @close="() => (showEditModal = false)"
      >
        <UpdateSalaryForm
          @toggle-modal="showEditModal = false"
          :salary-index="selectedSalaryIndex"
        />
      </ModalComponent>

      <ModalComponent
        v-model="showDeleteModal"
        title="Warning"
        @close="() => (showDeleteModal = false)"
      >
        <DeleteSalaryConfirmation
          :salary-index="selectedSalaryIndex"
          @toggle-modal="showDeleteModal = false"
        />
      </ModalComponent>
    </div>
  </main>
</template>

<style scoped></style>
