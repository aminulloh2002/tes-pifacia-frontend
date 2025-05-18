import { defineStore } from 'pinia'
import type { Department, DepartmentStore } from '@/types/types.ts'

const useRoleStore = defineStore('roles', {
  state: (): DepartmentStore => ({
    departments: [],
  }),
  actions: {
    setDepartments(res: { data: Department[] }) {
      this.departments = res.data
    },
    clearDepartmens() {
      this.departments = []
    },
  },
})

export default useRoleStore
