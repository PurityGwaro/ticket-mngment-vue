import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AuthScreen from '@/views/AuthScreen.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tickets from '@/views/Tickets.vue'
import NewTicket from '@/views/NewTicket.vue'
import Ticket from '@/views/Ticket.vue'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth',
    name: 'AuthScreen',
    component: AuthScreen,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/new',
    name: 'NewTicket',
    component: NewTicket,
    meta: { requiresAuth: true }
  },
  {
    path: '/ticket/:id',
    name: 'Ticket',
    component: Ticket,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/auth')
  }
  else if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/dashboard')
  }
  else {
    next()
  }
})

export default router
