<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
  class: String,
  disabled: Boolean,
})
</script>
<template>
  <button
    class="w-auto px-4 py-2 h-10 rounded cursor-pointer bg-blue-500 text-white disabled:opacity-50"
    :class="props.class"
    :type="props.type"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>
