<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'create'
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const title = ref(props.initialData.title || '')
const description = ref(props.initialData.description || '')
const priority = ref(props.initialData.priority || '')
const status = ref(props.initialData.status || '')
const errors = ref({})
const isSubmitting = ref(false)

watch(() => props.initialData, (newData) => {
  if (newData) {
    title.value = newData.title || ''
    description.value = newData.description || ''
    priority.value = newData.priority || ''
    status.value = newData.status || ''
  }
}, { deep: true })

const validate = () => {
  errors.value = {}
  
  if (!title.value) {
    errors.value.title = 'Title is required'
  }
  
  if (!description.value) {
    errors.value.description = 'Description is required'
  }
  
  if (!priority.value) {
    errors.value.priority = 'Priority is required'
  }
  
  if (!status.value) {
    errors.value.status = 'Status is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  
  isSubmitting.value = true
  try {
    await emit('submit', {
      title: title.value,
      description: description.value,
      priority: priority.value,
      status: status.value
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const isEditMode = props.mode === 'edit'
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2">
      <label for="title" class="text-sm font-semibold text-gray-700">
        Title <span class="text-red-500">*</span>
      </label>
      <input
        v-model="title"
        type="text"
        id="title"
        placeholder="Enter ticket title"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-gray-400"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label for="description" class="text-sm font-semibold text-gray-700">
        Description <span class="text-red-500">*</span>
      </label>
      <textarea
        v-model="description"
        id="description"
        rows="10"
        placeholder="Describe the ticket in detail"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-gray-400 resize-none"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col gap-2">
        <label for="priority" class="text-sm font-semibold text-gray-700">
          Priority <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select
            v-model="priority"
            id="priority"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-gray-400 cursor-pointer appearance-none bg-white pr-10"
          >
            <option value="" disabled>Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p v-if="errors.priority" class="text-red-500 text-sm mt-1">{{ errors.priority }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label for="status" class="text-sm font-semibold text-gray-700">
          Status <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select
            v-model="status"
            id="status"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-gray-400 cursor-pointer appearance-none bg-white pr-10"
          >
            <option value="" disabled>Select status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
      </div>
    </div>

    <div class="flex gap-4 mt-4">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold md:py-3 md:px-6 rounded-lg hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer py-2 px-4"
      >
        {{ isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Ticket' : 'Create Ticket') }}
      </button>
      <button
        type="button"
        @click="handleCancel"
        class="md:py-3 md:px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer py-2 px-4"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
