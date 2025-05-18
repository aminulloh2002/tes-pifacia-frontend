<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['page-changed'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const pages = computed(() => {
  const range = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(props.currentPage - half, 1)
  const end = Math.min(start + props.maxVisiblePages - 1, totalPages.value)

  // Adjust if we're at the end
  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(end - props.maxVisiblePages + 1, 1)
  }

  // Add first page and ellipsis if needed
  if (start > 1) {
    range.push(1)
    if (start > 2) range.push('...')
  }

  // Add page numbers
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  // Add last page and ellipsis if needed
  if (end < totalPages.value) {
    if (end < totalPages.value - 1) range.push('...')
    range.push(totalPages.value)
  }

  return range
})

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}
</script>
<template>
  <div class="flex items-center justify-center mt-6">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="cursor-pointer flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <i class="pi pi-angle-left"></i>
    </button>

    <!-- Page Numbers -->
    <div class="items-center hidden md:flex gap-x-2 mx-4">
      <template v-for="page in pages" :key="page">
        <button
          v-if="page !== '...'"
          @click="changePage(Number(page))"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md cursor-pointer',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
        <span v-else class="px-2 text-gray-500">...</span>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="cursor-pointer flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <i class="pi pi-angle-right"></i>
    </button>
  </div>
</template>
