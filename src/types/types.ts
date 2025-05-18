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

export type Department = {
  id: number
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

export type fetchUserResponse = {
  data: user[]
  meta: {
    total: number
    current_page: number
    last_page: number
    per_page: number
    to: number
  }
}
export type fetchDepartmentResponse = {
  data: Department[]
  meta: {
    total: number
    current_page: number
    last_page: number
    per_page: number
    to: number
  }
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
