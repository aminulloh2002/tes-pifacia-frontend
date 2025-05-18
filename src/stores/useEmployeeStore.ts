import { defineStore } from 'pinia'
import type { EmployeeStore, fetchEmployeeResponse } from '@/types/types.ts'

const useRoleStore = defineStore('employee', {
  state: (): EmployeeStore => ({
    employees: [],
    last_page: 0,
    current_page: 0,
    per_page: 0,
    total: 0,
    to: 0,
  }),
  actions: {
    setEmployees(res: fetchEmployeeResponse) {
      this.employees = res.data
      this.current_page = res.meta.current_page
      this.last_page = res.meta.last_page
      this.per_page = res.meta.per_page
      this.total = res.meta.total
      this.to = res.meta.to
    },
    clearEmployees() {
      this.employees = []
    },
  },
})

export default useRoleStore
