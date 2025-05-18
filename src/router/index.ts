import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes.ts'
import { createPinia, getActivePinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import api from '@/utils/axios.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

if (!getActivePinia()) {
  setActivePinia(createPinia())
}

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth) {
    try {
      const ping = await api.get('check-token', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      if (ping.status !== 200) {
        auth.logout()
      }
    } catch (e) {
      console.log(e)
      auth.logout()
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      next({ name: 'login' })
    } else if (to.meta.requiresAdministrator && !auth.isAdministrator) {
      next({ name: 'home.dashboard' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login' && auth.isAuthenticated) {
      next({ name: 'home.dashboard' })
    }
    next()
  }
})

export default router
