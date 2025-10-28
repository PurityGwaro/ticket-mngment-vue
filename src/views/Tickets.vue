<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'
import { useToast } from 'vue-toastification'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import TicketCard from '../components/tickets/TicketCard.vue'

const router = useRouter()
const { currentUser, logout, isAuthenticated } = useAuth()
const { getTickets } = useTickets()
const toast = useToast()

const tickets = ref([])

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
    tickets.value = getTickets(currentUser.value)
  }
})
</script>

<template>
  <div v-if="currentUser" class="h-screen bg-gray-50 flex flex-col">
    <Header :currentUser="currentUser" :handleLogout="handleLogout" />
    
    <div class="px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6">
      <button 
        @click="() => router.push('/dashboard')" 
        class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors hover:underline cursor-pointer"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-medium text-sm sm:text-base hover:text-blue-600">Go to Dashboard</span>
      </button>
    </div>
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 md:px-8 lg:px-12 pt-2 sm:pt-4 pb-4 sm:pb-6">
      <div class="flex flex-col gap-1 sm:gap-2">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">All Tickets</h1>
        <p class="text-sm sm:text-base text-gray-600">Here are all the tickets created by you</p>
      </div>
      <div class="w-full sm:w-auto">
        <button 
          @click="() => router.push('/tickets/new')" 
          class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer text-sm sm:text-base"
        >
          Create New Ticket
        </button>
      </div>
    </div>
    
    <section class="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-6">
      <div v-if="tickets.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
        <svg class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No tickets yet</h3>
        <p class="text-sm sm:text-base text-gray-500 mb-6">Create your first ticket to get started</p>
        <button 
          @click="() => router.push('/tickets/new')" 
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-200 hover:scale-105 cursor-pointer"
        >
          Create Ticket
        </button>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6">
        <TicketCard 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          :ticket="ticket" 
        />
      </div>
    </section>

    <Footer />
  </div>
</template>
