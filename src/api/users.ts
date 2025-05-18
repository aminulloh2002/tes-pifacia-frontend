import api from '@/utils/axios.ts'
import type { UserPayload } from '@/types/types.ts'

const fetchUsers = async (search?: string, page?: number) => {
  const url = search ? 'users?filter[query]=' + search : 'users'
  if (page) {
    return api.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { page },
    })
  }

  return api.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

// const fetchUserDetail = async (id: string) => {
//   return api.get(`users/${id}`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//   })
// }

const addUser = async (payload: UserPayload) => {
  return api.post('users', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateUser = async (id: number, payload: UserPayload) => {
  return api.post(
    `users/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  )
}

const deleteUser = async (id: number) => {
  return api.delete(`users/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export { fetchUsers, updateUser, deleteUser, addUser }
