<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/Form/FormInput.vue'
import { computed, ref, watch } from 'vue'
import DynamicInput from '@/components/DynamicInput.vue'
import SelectInput from '@/components/Form/SelectInput.vue'
import { addDepartment, fetchDepartments, updateDepartment } from '@/api/departments.ts'
import type { DepartmentPayload } from '@/types/types.ts'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import useDepartmentStore from '@/stores/useDepartmentStore.ts'

const emit = defineEmits(['toggleModal'])
const error = ref<Record<string, string[]>>({})
const props = defineProps({
  departmentIndex: {
    type: Number,
    required: true,
  },
})
const departmentStore = useDepartmentStore()

const departmentPaylaod = ref<DepartmentPayload>({
  name: '',
  established_at: '',
  notes: [''],
  is_active: 1,
})

const currentDept = computed(() => departmentStore.departments[props.departmentIndex])
watch(
  currentDept,
  (newDept) => {
    console.log(newDept)
    if (newDept) {
      departmentPaylaod.value = {
        name: newDept.name,
        established_at: newDept.established_at,
        notes: newDept.notes,
        is_active: newDept.is_active ? 1 : 0,
      }
    }
  },
  { immediate: true },
)

const status = ref([
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 },
])

const isLoading = ref<boolean>(false)

const saveHandler = async () => {
  isLoading.value = true
  try {
    await updateDepartment(currentDept.value.id, departmentPaylaod.value)

    const departments = await fetchDepartments()

    departmentStore.setDepartments(departments.data)

    toast.success('Department updated successfully')
    emit('toggleModal')
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.errors) {
      error.value = err.response.data.errors
    } else {
      error.value.name = ['something went wrong']
    }
  }
  isLoading.value = false
}

const handleCreateOption = (value: number) => {
  departmentPaylaod.value.is_active = value
}
</script>

<template>
  <div>
    <FormInput
      name="name"
      type="text"
      placeholder="John Doe"
      v-model="departmentPaylaod.name"
      :error="error?.name?.length ? error?.name[0] : ''"
    />
    <div class="mb-5">
      <label class="capitalize block mb-2 text-sm font-medium text-gray-900">Status</label>
      <SelectInput
        :options="status"
        v-model="departmentPaylaod.is_active"
        @create-option="handleCreateOption"
      />
      <p v-if="error?.is_active?.length" class="text-red-600 text-sm mb-4">
        {{ error?.is_active[0] }}
      </p>
    </div>
    <FormInput
      name="Estabilished At"
      type="datetime-local"
      v-model="departmentPaylaod.established_at"
      :error="error?.established_at?.length ? error?.established_at[0] : ''"
    />
    <DynamicInput
      name="Notes"
      type="text"
      placeholder="this is a note"
      v-model="departmentPaylaod.notes"
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
