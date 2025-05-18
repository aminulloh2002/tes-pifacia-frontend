<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { fetchAllRoles } from '@/api/roles.ts'
import useRoleStore from '@/stores/useRoleStore.ts'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import AddRoleForm from '@/components/Modal/Role/AddRoleForm.vue'
import UpdateRoleForm from '@/components/Modal/Role/UpdateRoleForm.vue'
import DeleteRoleConfirmation from '@/components/Modal/Role/DeleteRoleConfirmation.vue'

const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedRoleIndex = ref(-1)

onMounted(async () => {
  try {
    const response = await fetchAllRoles()
    if (response.status === 200) {
      roleStore.setRoles(response.data)
    }
  } catch (error) {
    console.log(error)
  }
})

let timeout: number
watch(search, (newVal) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    if (newVal) {
      const res = await fetchAllRoles(newVal)
      if (res.status === 200) {
        roleStore.setRoles(res.data)
      }
    } else {
      const res = await fetchAllRoles()
      if (res.status === 200) {
        roleStore.setRoles(res.data)
      }
    }
  }, 300) // 300ms debounce delay
})

const openDeleteModal = (index: number) => {
  selectedRoleIndex.value = index
  showDeleteModal.value = true
}

const openEditModal = (index: number) => {
  selectedRoleIndex.value = index
  showEditModal.value = true
}
</script>

<template>
  <main class="max-w-screen">
    <div class="m-5 p-5 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex justify-between items-center mb-5">
        <PrimaryButton class="text-sm !h-8 !px-2 !py-1" @click="showAddModal = true"
          >Add Role
        </PrimaryButton>

        <input
          v-model="search"
          class="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-0"
          placeholder="Search.."
        />
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Permissions</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5" class="text-center py-4 text-gray-500" v-if="roles.length === 0">
                No roles found
              </td>
            </tr>
            <tr
              v-for="(role, index) in roles"
              class="bg-white border-b border-gray-200"
              :key="role.id"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ index + 1 }}
              </th>
              <td class="px-6 py-4 uppercase">{{ role.name }}</td>
              <td class="px-6 py-4">
                <ul class="list-disc list-inside">
                  <li v-for="permission in role.permissions" :key="permission.id">
                    {{ permission.name }}
                  </li>
                </ul>
              </td>
              <td class="px-6 py-4 text-right">
                <a
                  v-if="role.name !== 'administrator'"
                  href="#"
                  @click="openEditModal(index)"
                  class="mx-2 font-medium text-blue-600 hover:underline"
                  >Edit</a
                >

                <a
                  v-if="role.name !== 'administrator'"
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

      <ModalComponent v-model="showAddModal" title="Add Role" @close="() => (showAddModal = false)">
        <AddRoleForm @toggle-modal="showAddModal = false" />
      </ModalComponent>
      <ModalComponent
        v-model="showEditModal"
        title="Edit Role"
        @close="() => (showEditModal = false)"
      >
        <UpdateRoleForm @toggle-modal="showEditModal = false" :roleIndex="selectedRoleIndex" />
      </ModalComponent>

      <ModalComponent
        v-model="showDeleteModal"
        title="Warning"
        @close="() => (showDeleteModal = false)"
      >
        <DeleteRoleConfirmation
          :roleIndex="selectedRoleIndex"
          @toggle-modal="showDeleteModal = false"
        />
      </ModalComponent>
    </div>
  </main>
</template>

<style scoped></style>
