<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'

import { ref } from 'vue'
import type { LoginPayload } from '@/types/types.ts'
import { fetchLogin } from '@/api/auth.ts'
import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore.ts'

const payload = ref<LoginPayload>({
  email: '',
  password: '',
})

const error = ref<Record<string, string[]>>({})
const isLoading = ref<boolean>(false)

const auth = useAuthStore()

const handleLogin = async () => {
  isLoading.value = true
  error.value = {}

  try {
    const response = await fetchLogin(payload.value)
    auth.authenticate(response.data)
    await router.push({ name: 'home.dashboard' })
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
  <form @submit.prevent="handleLogin">
    <FormInput
      name="email"
      type="email"
      id="email"
      v-model="payload.email"
      :error="error?.email?.length ? error?.email[0] : ''"
    />
    <FormInput
      name="password"
      type="password"
      id="password"
      v-model="payload.password"
      :error="error?.password?.length ? error?.password[0] : ''"
    />

    <PrimaryButton type="submit" :disabled="isLoading" class="my-3 lg:my-5">Submit</PrimaryButton>
  </form>
</template>
