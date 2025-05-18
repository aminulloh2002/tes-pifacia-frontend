
<script setup lang="ts">
import { type PropType, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  name: String,
  type: {
    type: String as PropType<'text' | 'password' | 'email' | 'number' | 'datetime-local' | 'date'>,
  },
  id: String,
  class: String,
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const localFields = ref([...props.modelValue])

// Watch for external changes and update local copy
watch(
  () => props.modelValue,
  (newValue) => {
    localFields.value = [...newValue]
  },
  { deep: true },
)

let timeout: ReturnType<typeof setTimeout> | null = null

watch(
  localFields,
  (newValue) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      emit('update:modelValue', [...newValue])
    }, 200) // emit after 200ms idle time
  },
  { deep: true },
)

const addField = () => {
  localFields.value.push('')
}

const removeField = (index: number) => {
  localFields.value.splice(index, 1)
}
</script>

<template>
  <div class="my-5">
    <label class="capitalize block mb-2 text-sm font-medium text-gray-900">{{ props.name }}</label>
    <div v-for="(field, index) in localFields" :key="index" class="my-2 flex items-center">
      <input
        v-model="localFields[index]"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 invalid:border-red-500 invalid:ring-red-500 block p-2.5 w-full outline-0"
        :class="[props.class, { 'border-red-500': props.error }]"
        :placeholder="'Input ' + (index + 1)"
      />
      <button @click="removeField(index)" class="ml-2 text-red-500"> <i class="pi pi-trash"></i> </button>
    </div>

    <button @click="addField" class="my-b bg-blue-500 text-white px-4 py-1 rounded">
      Add Field
    </button>
  </div>
</template>
