import { defineStore } from 'pinia'
import type { DepartmentStore, fetchDepartmentResponse } from '@/types/types.ts'

const useRoleStore = defineStore('departments', {
  state: (): DepartmentStore => ({
    departments: [],
    last_page: 0,
    current_page: 0,
    per_page: 0,
    total: 0,
    to: 0,
  }),
  actions: {
    setDepartments(res: fetchDepartmentResponse) {
      this.departments = res.data
      this.current_page = res.meta.current_page
      this.last_page = res.meta.last_page
      this.per_page = res.meta.per_page
      this.total = res.meta.total
      this.to = res.meta.to
    },
    clearDepartmens() {
      this.departments = []
    },
  },
})

export default useRoleStore
