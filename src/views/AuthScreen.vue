<script setup>
import { ref } from 'vue'
import LoginForm from '../components/tickets/LoginForm.vue'
import SignupForm from '../components/tickets/SignupForm.vue'
import Footer from '../components/layout/Footer.vue'

const activeTab = ref('login')
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center">
            <router-link to="/">
              <h1 class="text-3xl font-bold text-white mb-2 hover:text-indigo-100 transition">Tickify</h1>
            </router-link>
            <p class="text-indigo-100">Manage your tickets with ease</p>
          </div>

          <div class="flex border-b border-gray-200">
            <button
              @click="activeTab = 'login'"
              :class="`flex-1 py-4 text-center font-semibold transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`"
            >
              Login
            </button>
            <button
              @click="activeTab = 'signup'"
              :class="`flex-1 py-4 text-center font-semibold transition-colors cursor-pointer ${
                activeTab === 'signup'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`"
            >
              Sign Up
            </button>
          </div>

          <div class="p-8">
            <LoginForm v-if="activeTab === 'login'" />
            <SignupForm v-else />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
