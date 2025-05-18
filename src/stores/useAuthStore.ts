import { defineStore } from 'pinia'
import type { authResponse } from '@/types/types.ts'

export const useAuthStore = defineStore('auth', {

  state: (): authResponse => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : {},
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdministrator: (state) => state.user?.role === 'administrator',
  },
  actions: {
    authenticate(data: authResponse) {
      this.token = data.token
      this.user = data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.token = ''
      this.user = {
        id: 0,
        name: '',
        email: '',
        role: ''
      }
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
