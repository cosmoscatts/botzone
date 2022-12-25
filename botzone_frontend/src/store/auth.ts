import type { User } from '~/types'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User>()

  return {
    user,
  }
}, { persist: { enabled: true } })
