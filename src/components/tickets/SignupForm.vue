<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const { signup } = useAuth()
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const terms = ref(false)
const errors = ref({})
const isSubmitting = ref(false)

const validate = () => {
  errors.value = {}
  
  if (!name.value) {
    errors.value.name = 'Name is required'
  }
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.value)) {
    errors.value.email = 'Invalid email address'
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required'
  }
  
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Confirm Password is required'
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  }
  
  if (!terms.value) {
    errors.value.terms = 'You must agree to the terms and conditions'
  }
  
  return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
  if (!validate()) return
  
  isSubmitting.value = true
  try {
    await signup(name.value, email.value, password.value)
    router.push('/dashboard')
    toast.success('Signup successful! Welcome!')
  } catch (error) {
    toast.error(error.message || 'Signup failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit">
    <div>
      <label for="signup-name" class="block text-sm font-medium text-gray-700 mb-2">
        Full Name <span class="text-red-500">*</span>
      </label>
      <input
        v-model="name"
        type="text"
        id="signup-name"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="John Doe"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-2">
        Email Address <span class="text-red-500">*</span>
      </label>
      <input
        v-model="email"
        type="email"
        id="signup-email"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="you@example.com"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label for="signup-password" class="block text-sm font-medium text-gray-700 mb-2">
        Password <span class="text-red-500">*</span>
      </label>
      <input
        v-model="password"
        type="password"
        id="signup-password"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="••••••••"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <div>
      <label for="signup-confirm" class="block text-sm font-medium text-gray-700 mb-2">
        Confirm Password <span class="text-red-500">*</span>
      </label>
      <input
        v-model="confirmPassword"
        type="password"
        id="signup-confirm"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        placeholder="••••••••"
      />
      <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
    </div>

    <label class="flex items-start">
      <input
        v-model="terms"
        type="checkbox"
        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
      />
      <span class="ml-2 text-sm text-gray-600">
        I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</a> and <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</a>
      </span>
    </label>
    <p v-if="errors.terms" class="text-red-500 text-sm mt-1">{{ errors.terms }}</p>

    <button
      type="submit"
      class="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
    </button>
  </form>
</template>
