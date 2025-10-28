<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-white flex flex-col items-center justify-start gap-2 border rounded-xl p-6 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
    <h1 class="text-lg font-semibold text-gray-700">{{ title }}</h1>
    <p class="text-4xl font-bold text-blue-600">{{ number }}</p>
    <p class="text-sm text-gray-500 text-center">{{ description }}</p>
  </div>
</template>
