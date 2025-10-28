<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const { login } = useAuth()
const toast = useToast()

const email = ref('')
const password = ref('')
const errors = ref({})
const isSubmitting = ref(false)

const validate = () => {
  errors.value = {}
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.value)) {
    errors.value.email = 'Invalid email address'
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
  if (!validate()) return
  
  isSubmitting.value = true
  try {
    await login(email.value, password.value)
    router.push('/dashboard')
    toast.success('Login successful! Welcome back!')
  } catch (error) {
    toast.error(error.message || 'Login failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit">
    <div>
      <label for="login-email" class="block text-sm font-medium text-gray-700 mb-2">
        Email Address <span class="text-red-500">*</span>
      </label>
      <input
        v-model="email"
        type="email"
        id="login-email"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="you@example.com"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label for="login-password" class="block text-sm font-medium text-gray-700 mb-2">
        Password <span class="text-red-500">*</span>
      </label>
      <input
        v-model="password"
        type="password"
        id="login-password"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="••••••••"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
    </button>

    <div class="text-center text-sm text-gray-600">
      Demo: Use <span class="font-semibold">demo@test.com</span> / <span class="font-semibold">password123</span>
    </div>
  </form>
</template>
