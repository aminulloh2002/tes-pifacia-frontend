import { defineStore } from 'pinia'
import type { fetchSalaryResponse, SalaryStore } from '@/types/types.ts'

const useRoleStore = defineStore('salary', {
  state: (): SalaryStore => ({
    salaries: [],
    last_page: 0,
    current_page: 0,
    per_page: 0,
    total: 0,
    to: 0,
  }),
  actions: {
    setSalaries(res: fetchSalaryResponse) {
      this.salaries = res.data
      this.current_page = res.meta.current_page
      this.last_page = res.meta.last_page
      this.per_page = res.meta.per_page
      this.total = res.meta.total
      this.to = res.meta.to
    },
    clearSalaries() {
      this.salaries = []
    },
  },
})

export default useRoleStore
