<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link
    :to="link"
    class="group bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
  >
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
          {{ title }}
        </h3>
        <p class="text-gray-600">
          {{ description }}
        </p>
      </div>
      <svg class="w-8 h-8 text-blue-600 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </router-link>
</template>
