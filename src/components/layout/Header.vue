<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  },
  handleLogout: {
    type: Function,
    required: true
  }
})

const router = useRouter()
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-xs">
    <div class="w-full mx-auto py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-12">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition">
          Tickify
        </router-link>
        <div class="flex gap-3 sm:gap-4 md:gap-6 items-center">
          <div class="text-right hidden md:block">
            <p class="text-xs text-gray-500">Logged in as</p>
            <p class="font-semibold text-gray-800 text-sm">{{ currentUser.email }}</p>
          </div>
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
