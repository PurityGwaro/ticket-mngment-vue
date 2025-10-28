import { ref, computed } from 'vue'
import { v4 as uuid } from 'uuid'

const currentUser = ref(null)
const users = ref([])
const loading = ref(true)

const DEMO_USER = {
  email: 'demo@test.com',
  password: 'password123',
  name: 'Demo User'
}

export function useAuth() {
  const isAuthenticated = computed(() => !!currentUser.value)

  const initAuth = () => {
    const storedUsers = localStorage.getItem('Tickify_users')
    const storedCurrentUser = localStorage.getItem('Tickify_current_user')

    if (storedUsers) {
      users.value = JSON.parse(storedUsers)
    }
    if (storedCurrentUser) {
      currentUser.value = JSON.parse(storedCurrentUser)
    }
    loading.value = false
  }

  const signup = async (name, email, password) => {
    const userExists = users.value.some(user => user.email === email)

    if (userExists) {
      throw new Error('User with this email already exists')
    }

    const newUser = {
      id: uuid(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    }

    users.value = [...users.value, newUser]
    localStorage.setItem('Tickify_users', JSON.stringify(users.value))

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password
    currentUser.value = userWithoutPassword
    localStorage.setItem('Tickify_current_user', JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  }

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const demoUserData = {
        id: 'demo',
        email: DEMO_USER.email,
        name: DEMO_USER.name,
        isDemo: true
      }
      currentUser.value = demoUserData
      localStorage.setItem('Tickify_current_user', JSON.stringify(demoUserData))
      return demoUserData
    }

    const user = users.value.find(u => u.email === email && u.password === password)

    if (!user) {
      throw new Error('No user found with this email or password')
    }

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password
    currentUser.value = userWithoutPassword
    localStorage.setItem('Tickify_current_user', JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('Tickify_current_user')
  }

  return {
    currentUser,
    user: currentUser,
    users,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    initAuth
  }
}
