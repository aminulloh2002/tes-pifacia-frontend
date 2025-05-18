<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { fetchUsers } from '@/api/users.ts'
import useUserStore from '@/stores/useUserStore.ts'
import { storeToRefs } from 'pinia'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import AddUserForm from '@/components/Modal/User/AddUserForm.vue'
import DeleteConfirmation from '@/components/Modal/User/DeleteConfirmation.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import UpdateUserForm from '@/components/Modal/User/UpdateUserForm.vue'

const auth = useAuthStore()
const usersStore = useUserStore()
const { users } = storeToRefs(usersStore)
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUserIndex = ref(-1)

onMounted(async () => {
  try {
    const response = await fetchUsers()
    if (response.status === 200) {
      usersStore.setUsers(response.data)
      console.log(response.data)
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
      const res = await fetchUsers(newVal)
      if (res.status === 200) {
        usersStore.setUsers(res.data)
      }
    } else {
      const res = await fetchUsers()
      if (res.status === 200) {
        usersStore.setUsers(res.data)
      }
    }
  }, 300) // 300ms debounce delay
})

const openDeleteModal = (index: number) => {
  selectedUserIndex.value = index
  showDeleteModal.value = true
}

const openEditModal = (index: number) => {
  selectedUserIndex.value = index
  showEditModal.value = true
}

const fetchData = async (page: number) => {
  try {
    const response = await fetchUsers(search.value, page)
    if (response.status === 200) {
      usersStore.setUsers(response.data)
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
          >Add User
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
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5" class="text-center py-4 text-gray-500" v-if="users.length === 0">
                No users found
              </td>
            </tr>
            <tr
              v-for="(user, index) in users"
              class="bg-white border-b border-gray-200"
              :key="user.id"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ index + 1 }}
              </th>
              <td class="px-6 py-4">{{ user.name }}</td>
              <td class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4 capitalize">{{ user.role }}</td>
              <td class="px-6 py-4 text-right">
                <a
                  href="#"
                  @click="openEditModal(index)"
                  class="mx-2 font-medium text-blue-600 hover:underline"
                  >Edit</a
                >

                <a
                  v-if="auth.user.id !== user.id"
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
        :total-items="usersStore.total"
        :items-per-page="usersStore.per_page"
        :current-page="usersStore.current_page"
        @page-changed="fetchData"
        class="mt-6"
      />

      <ModalComponent
        v-model="showAddModal"
        title="Create User"
        @close="() => (showAddModal = false)"
      >
        <AddUserForm @toggle-modal="showAddModal = false" />
      </ModalComponent>
      <ModalComponent
        v-model="showEditModal"
        title="Edit User"
        @close="() => (showEditModal = false)"
      >
        <UpdateUserForm @toggle-modal="showEditModal = false" :userIndex="selectedUserIndex" />
      </ModalComponent>

      <ModalComponent
        v-model="showDeleteModal"
        title="Warning"
        @close="() => (showDeleteModal = false)"
      >
        <DeleteConfirmation
          :userIndex="selectedUserIndex"
          @toggle-modal="showDeleteModal = false"
        />
      </ModalComponent>
    </div>
  </main>
</template>

<style scoped></style>
