import api from '@/utils/axios.ts'
import type { rolesPayload } from '@/types/types.ts'

const fetchRoles = async () => {
  return api.get('roles-simplified', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

const fetchAllRoles = async (query?: string) => {
  const url = query ? `roles?filter[query]=${query}` : 'roles'

  return api.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

const addRole = async (payload: rolesPayload) => {
  return api.post('roles', payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

const updateRole = async (id: number, payload: rolesPayload) => {
  return api.post(
    `roles/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
}

const deleteRole = async (id: number) => {
  return api.delete(`roles/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

export { fetchRoles, fetchAllRoles, addRole, updateRole, deleteRole }
