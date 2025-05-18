<script setup lang="ts">
import VueSelect from 'vue3-select-component'
import { computed, type PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: false,
  },
  name: String,
  options: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
  class: String,
  error: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="mb-5">
    <label class="capitalize block mb-2 text-sm font-medium text-gray-900">{{ props.name }}</label>
    <VueSelect
      v-model="value"
      :options="props.options"
      :placeholder="'Select ' + props.name"
    />
    <p v-if="props.error" class="text-red-600 text-sm mb-4">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped></style>
