import { defineStore } from 'pinia'
import type { fetchUserResponse, userStore } from '@/types/types.ts'

const useUserStore = defineStore('users', {
  state: (): userStore => ({
    users: [],
    total: 0,
    current_page: 0,
    last_page: 0,
    per_page: 0,
    to: 0
  }),
  actions: {
    setUsers(res: fetchUserResponse) {
      this.users = res.data
      this.current_page = res.meta.current_page
      this.last_page = res.meta.last_page
      this.per_page = res.meta.per_page
      this.total = res.meta.total
      this.to = res.meta.to
    },
    clearUsers() {
      this.users = []
      this.total = 0
      this.current_page = 0
      this.last_page = 0
      this.per_page = 0
    }
  }
})

export default useUserStore
