<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { fetchRoles } from '@/api/roles.ts'
import SelectInput from '@/components/Form/SelectInput.vue'
import { updateUser } from '@/api/users.ts'
import type { UserPayload } from '@/types/types.ts'
import axios from 'axios'
import useUserStore from '@/stores/useUserStore.ts'
import { toast } from 'vue3-toastify'

const props = defineProps({
  userIndex: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['toggleModal'])

const error = ref<Record<string, string[]>>({})

const userPayload = ref<UserPayload>({
  name: '',
  email: '',
  password: '',
  role: '',
})

const userStore = useUserStore()
const currentUser = computed(() => userStore.users[props.userIndex])

watch(
  currentUser,
  (newUser) => {
    if (newUser) {
      userPayload.value = {
        name: newUser.name,
        email: newUser.email,
        password: '',
        role: newUser.role,
      }
    }
  },
  { immediate: true },
)

const roles = ref<{ label: string; value: string }[]>([])
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const res = await fetchRoles()
  for (const role of res.data) {
    roles.value.push({
      label: role,
      value: role,
    })
  }
})

const saveHandler = async () => {
  isLoading.value = true
  try {
    await updateUser(currentUser.value.id, userPayload.value)

    toast.success('User updated successfully')
    emit('toggleModal')
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.errors) {
      error.value = err.response.data.errors
    } else {
      error.value.password = ['Email or password is incorrect']
    }
  }
  isLoading.value = false
}
</script>

<template>
  <div>
    <FormInput
      name="name"
      type="text"
      placeholder="John Doe"
      v-model="userPayload.name"
      :error="error?.name?.length ? error?.name[0] : ''"
    />
    <FormInput
      name="email"
      type="email"
      placeholder="johndoe@mail.com"
      v-model="userPayload.email"
      :error="error?.email?.length ? error?.email[0] : ''"
    />
    <FormInput
      name="password"
      type="password"
      placeholder="Leave blank to keep the same password"
      v-model="userPayload.password"
      :error="error?.password?.length ? error?.password[0] : ''"
    />
    <SelectInput
      v-model="userPayload.role"
      :options="roles"
      name="Role"
      :error="error?.role?.length ? error?.role[0] : ''"
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
