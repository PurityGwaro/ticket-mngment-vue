<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'
import { useToast } from 'vue-toastification'
import { getStatusColor, getPriorityColor, formatStatus } from '../utils'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import TicketForm from '../components/tickets/TicketForm.vue'

const router = useRouter()
const route = useRoute()
const { currentUser, logout, isAuthenticated } = useAuth()
const { getTicketById, updateTicket, deleteTicket } = useTickets()
const toast = useToast()

const ticket = ref(null)
const loading = ref(true)
const isEditMode = ref(false)

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
  
  if (currentUser.value && route.params.id) {
    const foundTicket = getTicketById(route.params.id)
    if (foundTicket) {
      ticket.value = foundTicket
    } else {
      toast.error('Ticket not found')
      router.push('/tickets')
    }
    loading.value = false
  }
})

const handleEdit = () => {
  isEditMode.value = true
}

const handleCancelEdit = () => {
  isEditMode.value = false
}

const handleDelete = () => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    deleteTicket(route.params.id)
    toast.success('Ticket deleted successfully')
    router.push('/tickets')
  }
}

const onSubmit = async (data) => {
  try {
    const updatedTicket = updateTicket(route.params.id, data)
    ticket.value = updatedTicket
    isEditMode.value = false
    toast.success('Ticket updated successfully')
  } catch (error) {
    toast.error(error.message || 'Failed to update ticket')
  }
}
</script>

<template>
  <div v-if="currentUser && !loading" class="h-screen bg-gray-50 flex flex-col">
    <Header :currentUser="currentUser" :handleLogout="handleLogout" />

    <section class="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
      <div class="max-w-5xl mx-auto">
        <button 
          @click="() => router.push('/tickets')" 
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 transition-colors cursor-pointer hover:underline"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="font-medium text-sm sm:text-base hover:text-blue-600">Back to Tickets</span>
        </button>

        <div v-if="ticket" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ ticket.title }}</h1>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
              <span :class="`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(ticket.status)}`">
                {{ formatStatus(ticket.status) }}
              </span>
              <span :class="`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getPriorityColor(ticket.priority)}`">
                {{ ticket.priority }}
              </span>
            </div>
          </div>

          <div class="p-4 sm:p-6 md:p-8">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Ticket Details</h2>
              <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  @click="handleEdit"
                  class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete"
                  class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="mb-6 sm:mb-8">
              <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">Description</h3>
              <p class="text-gray-700 leading-relaxed text-sm sm:text-base">{{ ticket.description }}</p>
            </div>

            <div class="border-t border-gray-200 pt-4 sm:pt-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="flex flex-col items-start gap-2">
                  <p class="text-xs sm:text-sm text-gray-500 mb-1">Ticket ID</p>
                  <p class="text-gray-800 font-mono text-xs sm:text-sm break-all">{{ ticket.id }}</p>
                </div>
                <div class="flex flex-col items-start gap-2">
                  <p class="text-xs sm:text-sm text-gray-500 mb-1">Created At</p>
                  <p class="text-gray-800 text-xs sm:text-sm">{{ new Date(ticket.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="isEditMode">
      <div 
        class="fixed inset-0 bg-opacity-50 z-40 transition-opacity"
        @click="handleCancelEdit"
      />
      
      <div class="fixed inset-y-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between z-10">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Edit Ticket</h2>
          <button
            @click="handleCancelEdit"
            class="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <TicketForm
            @submit="onSubmit"
            @cancel="handleCancelEdit"
            :initialData="ticket"
            mode="edit"
          />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
