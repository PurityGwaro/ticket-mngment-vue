<script setup>
import { defineProps } from 'vue'
import { truncateText, getStatusColor, getPriorityColor, formatStatus } from '../../utils'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4">
    <div class="flex items-start justify-between gap-2 sm:gap-3">
      <h3 class="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 flex-1">{{ ticket.title }}</h3>
      <router-link 
        :to="`/ticket/${ticket.id}`" 
        class="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
      >
        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <p class="text-xs sm:text-sm text-gray-600 line-clamp-3">
      {{ truncateText(ticket.description, 120) }}
    </p>

    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      <span :class="`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`">
        {{ formatStatus(ticket.status) }}
      </span>
      <span :class="`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`">
        {{ ticket.priority }}
      </span>
    </div>

    <div class="pt-2 sm:pt-3 border-t border-gray-100">
      <p class="text-xs text-gray-500 truncate">ID: {{ ticket.id }}</p>
    </div>
  </div>
</template>
