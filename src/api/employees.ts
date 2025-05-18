import api from '@/utils/axios.ts'
import type { EmployeePayload } from '@/types/types.ts'

const fetchEmployees = async (search?: string, page?: number, orderBy?: string, asc?: boolean) => {
  const url = 'employees'
  const params: Record<string, unknown> = {}

  if (search) params['filter[query]'] = search
  if (page) params.page = page
  if (orderBy) params['sort'] = asc ? '' + orderBy : '-' + orderBy

  return api.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params,
  })
}

const fetchEmployeeDetails = async (id: string) => {
  return api.get(`employees/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const addEmployee = async (payload: EmployeePayload) => {
  return api.post('employees', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateEmployee = async (id: string, payload: EmployeePayload) => {
  return api.post(
    `employees/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  )
}

const deleteEmployee = async (id: string) => {
  return api.delete(`employees/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export { fetchEmployees, fetchEmployeeDetails, updateEmployee, deleteEmployee, addEmployee }
