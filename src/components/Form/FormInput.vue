<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
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

const emit =defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="mb-5">
    <label class="capitalize block mb-2 text-sm font-medium text-gray-900">{{ props.name }}</label>
    <input
      :name="props.name"
      :type="props.type"
      :id="props.id"
      v-model="value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 invalid:border-red-500 invalid:ring-red-500 block p-2.5 w-full outline-0"
      :class="[props.class, { 'border-red-500': props.error }]"
      :required="props.required"
      :placeholder="props.placeholder"
    />

    <p v-if="props.error" class="text-red-600 text-sm mb-4">
      {{ props.error }}
    </p>
  </div>
</template>
