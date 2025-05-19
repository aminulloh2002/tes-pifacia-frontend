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

const addEmployee = async (payload: FormData) => {
  return api.post('employees', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateEmployee = async (id: string, payload: FormData) => {
  return api.post(`employees/${id}`, payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, Multipart: 'form-data' },
  })
}

const deleteEmployee = async (id: string) => {
  return api.delete(`employees/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const fetchEmployeeAudit = async (id: string, page: number = 1) => {
  return api.get(`employees/${id}/audits`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    params: {
      page: page,
    },
  })
}

export {
  fetchEmployees,
  fetchEmployeeDetails,
  fetchEmployeeAudit,
  updateEmployee,
  deleteEmployee,
  addEmployee,
}
