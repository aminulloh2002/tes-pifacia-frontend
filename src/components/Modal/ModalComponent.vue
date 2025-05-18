<!-- Modal.vue -->
<script setup lang="ts">
import { defineProps } from 'vue'

defineEmits(['close'])
const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '' },
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.modelValue"
      class="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center pb-2 mb-5 border-b-1 border-b-gray-200">
          <h3 v-if="title" class="text-xl font-semibold">{{ title }}</h3>
          <button
            @click="$emit('close')"
            class="text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Close modal"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
