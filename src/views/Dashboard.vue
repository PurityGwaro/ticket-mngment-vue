<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useTickets } from '../composables/useTickets'
import { useToast } from 'vue-toastification'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Statistic from '../components/tickets/Statistic.vue'
import QuickAction from '../components/tickets/QuickAction.vue'

const router = useRouter()
const { currentUser, logout, isAuthenticated } = useAuth()
const { getTickets, getAllTicketsByStatus } = useTickets()
const toast = useToast()

const ticketsData = ref({
  userTickets: [],
  openTickets: [],
  inProgressTickets: [],
  closedTickets: []
})

const handleLogout = () => {
  logout()
  toast.success('Logged out successfully')
  router.push('/')
}

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/auth')
    return
  }
  
  if (currentUser.value) {
    const userTickets = getTickets(currentUser.value)
    const openTickets = getAllTicketsByStatus('open', currentUser.value.id)
    const inProgressTickets = getAllTicketsByStatus('in_progress', currentUser.value.id)
    const closedTickets = getAllTicketsByStatus('closed', currentUser.value.id)
    
    ticketsData.value = {
      userTickets,
      openTickets,
      inProgressTickets,
      closedTickets
    }
  }
})
</script>

<template>
  <div v-if="currentUser" class="min-h-screen bg-gray-50 flex flex-col">
    <Header :currentUser="currentUser" :handleLogout="handleLogout" />
    
    <section class="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 flex flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20 flex-1">
      <div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p class="text-gray-600 text-sm sm:text-base md:text-lg">
          Welcome back, <span class="font-semibold">{{ currentUser.name }}</span>! Here's an overview of your tickets.
        </p>
      </div>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Statistic 
          title="Total Tickets" 
          :number="ticketsData.userTickets.length" 
          description="All tickets in system" 
        />
        <Statistic 
          title="Open" 
          :number="ticketsData.openTickets.length" 
          description="Awaiting action" 
        />
        <Statistic 
          title="In Progress" 
          :number="ticketsData.inProgressTickets.length" 
          description="Currently being worked on" 
        />
        <Statistic 
          title="Closed" 
          :number="ticketsData.closedTickets.length" 
          description="Completed tickets" 
        />
      </section>

      <section class="flex flex-col gap-4 sm:gap-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 md:mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickAction 
            title="View All Tickets" 
            description="Browse and manage all your tickets in one place" 
            link="/tickets" 
          />
          <QuickAction 
            title="Create New Ticket" 
            description="Submit a new ticket to track your task" 
            link="/tickets/new" 
          />
        </div>
      </section>
    </section>
    
    <Footer />
  </div>
</template>
