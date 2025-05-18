<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { fetchEmployees } from '@/api/employees.ts'
import useEmployeeStore from '@/stores/useEmployeeStore.ts'
import DeleteEmployeeConfirmation from '@/components/Modal/Employee/DeleteEmployeeConfirmation.vue'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import AddEmployeeForm from '@/components/Modal/Employee/AddEmployeeForm.vue'
import UpdateEmployeeForm from '@/components/Modal/Employee/UpdateEmployeeForm.vue'

const EmployeesStore = useEmployeeStore()
const { employees } = storeToRefs(EmployeesStore)
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedEmployeeIndex = ref(-1)
const orderBy = ref<string>('full_name')
const asc = ref<boolean>(true)

onMounted(async () => {
  try {
    const response = await fetchEmployees()
    if (response.status === 200) {
      EmployeesStore.setEmployees(response.data)
    }
  } catch (error) {
    console.log(error)
  }
})

let timeout: number


watch([orderBy, asc], ([newOrder,newAsc]) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    const res = await fetchEmployees(search.value, 1, newOrder, newAsc)
    if (res.status === 200) {
      EmployeesStore.setEmployees(res.data)
    }
  }, 300)
});

watch(search, (newVal) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (newVal) {
      const res = await fetchEmployees(newVal)
      if (res.status === 200) {
        EmployeesStore.setEmployees(res.data)
      }
    } else {
      const res = await fetchEmployees()
      if (res.status === 200) {
        EmployeesStore.setEmployees(res.data)
      }
    }
  }, 300)
})

const openDeleteModal = (index: number) => {
  selectedEmployeeIndex.value = index
  showDeleteModal.value = true
}

const openEditModal = (index: number) => {
  selectedEmployeeIndex.value = index
  showEditModal.value = true
}

const fetchData = async (page: number) => {
  try {
    const response = await fetchEmployees(search.value, page, orderBy.value, asc.value)
    if (response.status === 200) {
      EmployeesStore.setEmployees(response.data)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex justify-between items-center mb-5">
        <PrimaryButton class="text-sm !h-8 !px-2 !py-1" @click="showAddModal = true"
          >Add Employee
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
<!--                sort -->
                <span
                  @click="orderBy = 'full_name'; asc = !asc"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Name</span>
                  <i
                    v-if="orderBy === 'full_name'"
                    :class="[
                      'pi',
                      orderBy === 'full_name' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span
                  @click="orderBy = 'is_active'; asc = !asc"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Status</span>
                  <i
                    v-if="orderBy === 'is_active'"
                    :class="[
                      'pi',
                      orderBy === 'is_active' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span
                  @click="orderBy = 'hired_date'; asc = !asc"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Hired Date</span>
                  <i
                    v-if="orderBy === 'hired_date'"
                    :class="[
                      'pi',
                      orderBy === 'hired_date' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
                    ]"
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span
                  @click="orderBy = 'department_name'; asc = !asc"
                  class="cursor-pointer flex items-center gap-1"
                >
                  <span>Department</span>
                  <i
                    v-if="orderBy === 'department_name'"
                    :class="[
                      'pi',
                      orderBy === 'department_name' && asc ? 'pi-sort-amount-up' : 'pi-sort-amount-down',
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
            <tr>
              <td
                colspan="5"
                class="text-center py-4 text-gray-500"
                v-if="employees.length === 0"
              >
                No roles found
              </td>
            </tr>
            <tr
              v-for="(employee, index) in employees"
              class="bg-white border-b border-gray-200"
              :key="employee.id"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ (EmployeesStore.current_page - 1) * EmployeesStore.per_page + index + 1 }}
              </th>
              <td class="px-6 py-4 uppercase">{{ employee.full_name }}</td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span v-if="employee.is_active" class="text-green-500">Active</span>
                <span v-else class="text-gray-500">Inactive</span>
              </th>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ employee.hired_date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap uppercase">
                {{ employee.department_name }}
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="mx-2 font-medium text-green-600 hover:underline">Details</a>
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
        :total-items="EmployeesStore.total"
        :items-per-page="EmployeesStore.per_page"
        :current-page="EmployeesStore.current_page"
        @page-changed="fetchData"
        class="mt-6"
      />

            <ModalComponent v-model="showAddModal" title="Add Employee" @close="() => (showAddModal = false)">
              <AddEmployeeForm @toggle-modal="showAddModal = false" />
            </ModalComponent>
            <ModalComponent
              v-model="showEditModal"
              title="Edit Employee"
              @close="() => (showEditModal = false)"
            >
              <UpdateEmployeeForm @toggle-modal="showEditModal = false" :employee-index="selectedEmployeeIndex" />
            </ModalComponent>

            <ModalComponent
              v-model="showDeleteModal"
              title="Warning"
              @close="() => (showDeleteModal = false)"
            >
              <DeleteEmployeeConfirmation
                :employee-index="selectedEmployeeIndex"
                @toggle-modal="showDeleteModal = false"
              />
            </ModalComponent>
    </div>
  </main>
</template>

<style scoped></style>
