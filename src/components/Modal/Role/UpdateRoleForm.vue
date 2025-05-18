<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'
import { computed, onMounted, ref, watch } from 'vue'
import type { rolesPayload } from '@/types/types.ts'
import { fetchPermissions } from '@/api/permissions.ts'
import VueSelect from 'vue3-select-component'
import { addRole, fetchAllRoles, updateRole } from '@/api/roles.ts'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import useRoleStore from '@/stores/useRoleStore.ts'

const emit = defineEmits(['toggleModal'])
const error = ref<Record<string, string[]>>({})

const roleStore = useRoleStore()

const props = defineProps({
  roleIndex: {
    type: Number,
    required: true,
  },
})

const rolePayload = ref<rolesPayload>({
  name: '',
  permissions: [],
})

const permissions = ref<{ label: string; value: string }[]>([])
const isLoading = ref<boolean>(false)

const currentRole = computed(() => roleStore.roles[props.roleIndex])

watch(
  currentRole,
  (newRole) => {
    const names = currentRole?.value?.permissions?.map(p => p.name) ?? []
    if (newRole) {
      rolePayload.value = {
        name: newRole.name,
        permissions: names,
      }
    }
  },
  { immediate: true },
)

onMounted(async () => {
  const res = await fetchPermissions()
  for (const permission of res.data) {
    permissions.value.push({
      label: permission,
      value: permission,
    })
  }
  console.log(permissions.value[0])
})


const saveHandler = async () => {
  isLoading.value = true
  try {
    await updateRole(currentRole.value.id, rolePayload.value)
    const roles = await fetchAllRoles()

    roleStore.setRoles(roles.data)
    toast.success('Role updated successfully')
    emit('toggleModal')
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.errors) {
      error.value = err.response.data.errors
    } else {
      error.value.name = ['something is wrong']
    }
  }
  isLoading.value = false
}

const handleCreateOption = (value: string) => {
  permissions.value.push({ label: value, value })
  rolePayload?.value?.permissions?.push(value)
}
</script>

<template>
  <div>
    <FormInput
      name="name"
      type="text"
      placeholder="John Doe"
      v-model="rolePayload.name"
      :error="error?.name?.length ? error?.name[0] : ''"
    />
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Positions</label>
      <VueSelect
        v-model="rolePayload.permissions"
        :is-multi="true"
        :is-taggable="true"
        :options="permissions"
        @option-created="(value: string) => handleCreateOption(value)"
      />
      <p v-if="error?.permissions?.length" class="text-red-600 text-sm mb-4">
        {{ error?.permissions[0] }}
      </p>
    </div>

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
