import api from '@/utils/axios.ts'
import type { DepartmentPayload } from '@/types/types.ts'

const fetchDepartments = async (
  search?: string,
  page?: number,
  orderBy?: string,
  asc?: boolean,
) => {
  const url = 'departments'
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

const updateDepartment = async (id: string, payload: DepartmentPayload) => {
  return api.post(
    `departments/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  )
}

const deleteDepartment = async (id: string) => {
  return api.delete(`departments/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const fetchDepartmentAudit = async (id: string, page: number = 1) => {
  return api.get(`departments/${id}/audits`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    params: {
      page: page,
    },
  })
}

export {
  fetchDepartments,
  fetchDepartmentDetails,
  updateDepartment,
  deleteDepartment,
  addDepartment,
  fetchDepartmentAudit,
}
