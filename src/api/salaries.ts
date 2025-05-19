import api from '@/utils/axios.ts'
import type { SalaryPayload } from '@/types/types.ts'

const fetchSalaries = async (search?: string, page?: number, orderBy?: string, asc?: boolean) => {
  const url = 'salaries'
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

const fetchSalaryDetails = async (id: string) => {
  return api.get(`salaries/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const addSalary = async (payload: SalaryPayload) => {
  return api.post('salaries', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const updateSalary = async (id: string, payload: SalaryPayload) => {
  return api.post(
    `salaries/${id}`,
    { ...payload, _method: 'PUT' },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  )
}

const deleteSalary = async (id: string) => {
  return api.delete(`salaries/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

const fetchSalaryAudit = async (id: string, page: number = 1) => {
  return api.get(`salaries/${id}/audits`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    params: {
      page: page,
    },
  })
}

const fetchEmployeeSimplified = async () => {
  return api.get('employees-simplified', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export {
  fetchSalaries,
  fetchSalaryDetails,
  fetchSalaryAudit,
  addSalary,
  updateSalary,
  deleteSalary,
  fetchEmployeeSimplified,
}
