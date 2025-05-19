export type LoginPayload = {
  email: string
  password: string
}

export type Roles = {
  id: number
  name?: string
  permissions?: {
    id: number
    name: string
  }[]
}
export type rolesPayload = {
  id?: number
  name?: string
  permissions?: string[]
}

export type user = {
  email: string
  id: number
  name: string
  role: string
}

export type UserPayload = {
  email: string
  name: string
  password: string
  role: string
}

export type DepartmentPayload = {
  name: string
  is_active: number
  established_at: string
  notes: Array<string>
}

export type EmployeePayload = {
  document: any
  full_name: string
  employee_code: string
  is_active: number
  hired_date: string
  notes: Array<string>
  department_id: string
}

export type Employee = {
  id: string
  employee_code: string
  full_name: string
  is_active: number | boolean
  hired_date: string
  notes: Array<string>
  department_id: string
  department_name: string
  document_url: string | null
}

export type SalaryPayload = {
  employee_id: string
  salary: number
  payment_date: string
  notes: Array<string>
  is_paid: number | string
}

export type Salary = {
  id: string
  employee_id: string
  salary: string
  payment_date: string
  notes: Array<string>
  is_paid: number | boolean
  employee_name: string
}

export type Department = {
  id: string
  name: string
  is_active: boolean
  established_at: string
  notes: Array<string>
}

export type authResponse = {
  token: string
  user: user
}

export type userStore = {
  users: user[]
  total: number
  current_page: number
  last_page: number
  per_page: number
  to: number
}

export type meta = {
  total: number
  current_page: number
  last_page: number
  per_page: number
  to: number
}

export type fetchUserResponse = {
  data: user[]
  meta: meta
}

export type fetchDepartmentResponse = {
  data: Department[]
  meta: meta
}

export type fetchEmployeeResponse = {
  data: Employee[]
  meta: meta
}

export type fetchSalaryResponse = {
  data: Salary[]
  meta: meta
}

export type RoleStore = {
  roles: Roles[]
}

export type DepartmentStore = {
  departments: Department[]
  total: number
  current_page: number
  last_page: number
  per_page: number
  to: number
}

export type EmployeeStore = {
  employees: Employee[]
  total: number
  current_page: number
  last_page: number
  per_page: number
  to: number
}

export type SalaryStore = {
  salaries: Salary[]
  total: number
  current_page: number
  last_page: number
  per_page: number
  to: number
}
