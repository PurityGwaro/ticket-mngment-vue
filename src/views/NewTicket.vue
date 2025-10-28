<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'
import { useToast } from 'vue-toastification'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import TicketForm from '../components/tickets/TicketForm.vue'

const router = useRouter()
const { currentUser, logout, isAuthenticated } = useAuth()
const { createTicket } = useTickets()
const toast = useToast()

const handleLogout = () => {
  logout()
  toast.success('Logged out successfully')
  router.push('/')
}

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/auth')
  }
})

const onSubmit = async (data) => {
  try {
    await createTicket(data, currentUser.value)
    router.push('/tickets')
    toast.success('Ticket created successfully')
  } catch (error) {
    toast.error(error.message || 'Failed to create ticket')
  }
}

const handleCancel = () => {
  router.push('/tickets')
}
</script>

<template>
  <div v-if="currentUser" class="h-screen bg-gray-50 flex flex-col">
    <Header :currentUser="currentUser" :handleLogout="handleLogout" />
    
    <section class="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 flex flex-col gap-6 sm:gap-8 md:gap-12 items-center">
      <div class="w-full max-w-2xl">
        <button 
          @click="() => router.push('/tickets')" 
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 transition-colors hover:underline cursor-pointer"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="font-medium text-sm sm:text-base hover:text-blue-600">Go to Tickets</span>
        </button>
      </div>
      
      <div class="text-center px-4">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Create A New Ticket</h1>
        <p class="text-sm sm:text-base text-gray-600">Fill out the form below to submit a new ticket</p>
      </div>
      
      <div class="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <TicketForm
          @submit="onSubmit"
          @cancel="handleCancel"
          mode="create"
        />
      </div>
    </section>
    
    <Footer />
  </div>
</template>
