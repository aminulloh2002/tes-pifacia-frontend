import api from '@/utils/axios.ts'
import type { DepartmentPayload } from '@/types/types.ts'

const fetchDepartments = async (search?: string, page?: number) => {
  const url = search ? 'departments?filter[query]=' + search : 'departments'
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

const fetchDepartmentDetails = async (id: string) => {
  return api.get(`departments/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const addDepartment = async (payload: DepartmentPayload) => {
  return api.post('departments', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateDepartment = async (id: number, payload: DepartmentPayload) => {
  return api.post(
    `departments/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  )
}

const deleteUser = async (id: number) => {
  return api.delete(`departments/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export { fetchDepartments, fetchDepartmentDetails, updateDepartment, deleteUser, addDepartment }
