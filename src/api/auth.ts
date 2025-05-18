import type { LoginPayload } from '@/types/types.ts'
import api from '@/utils/axios.ts'

export function fetchLogin(payload: LoginPayload) {
  return api.post(`auth/login`, payload)
}
