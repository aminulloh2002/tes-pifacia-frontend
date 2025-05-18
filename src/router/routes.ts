import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    component: DashboardView,
    name: 'home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/components/Dashboard/HomeComponent.vue'),
        name: 'home.dashboard',
      },
      {
        path: 'role',
        component: () => import('@/components/Dashboard/RoleComponent.vue'),
        name: 'home.role',
      },
      {
        path: 'user',
        component: () => import('@/components/Dashboard/UserComponent.vue'),
        name: 'home.user',
        meta: { requiresAdministrator: true },
      },
      {
        path: 'departments',
        component: () => import('@/components/Dashboard/Departments/DepartmentComponent.vue'),
        name: 'home.departments',
        children: [
          {
            path: 'details',
            component: () => import('@/components/Dashboard/Departments/DepartmentDetails.vue'),
            name: 'home.departments.details',
          }
        ]
      },
      {
        'path': 'employees',
        component: () => import('@/components/Dashboard/Employees/EmployeesComponent.vue'),
        name: 'home.employees',
      },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]
