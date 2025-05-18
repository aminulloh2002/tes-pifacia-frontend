import { defineStore } from 'pinia'
import type { Roles, RoleStore } from '@/types/types.ts'

const useRoleStore = defineStore('roles', {
  state: (): RoleStore => ({
    roles: [],
  }),
  actions: {
    setRoles(res: { data: Roles[] }) {
      this.roles = res.data
    },
    clearRoles() {
      this.roles = []
    },
  },
})

export default useRoleStore
