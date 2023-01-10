import defaultAvatar from '/imgs/user/default-avatar.jpg'
import type { User } from '~/types'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User>({
    name: 'admin',
    avatar: defaultAvatar,
  })
  const login = ref(true)
  const powerOn = ref(false)
  const booting = ref(false)
  const restart = ref(false)
  const sleep = ref(false)
  const setLogin = (value: boolean) => login.value = value
  const setPowerOn = (value: boolean) => powerOn.value = value
  const setBooting = (value: boolean) => booting.value = value
  const setRestart = (value: boolean) => restart.value = value
  const setSleep = (value: boolean) => sleep.value = value

  const closeEffect = () => {
    const systemStore = useSystemStore()
    systemStore.closeStateEffect()
  }
  const shutMac = (e?: MouseEvent): void => {
    e?.stopPropagation()
    closeEffect()
    setRestart(false)
    setSleep(false)
    setLogin(false)
    setBooting(true)
  }
  const restartMac = (e?: MouseEvent): void => {
    e?.stopPropagation()
    closeEffect()
    setRestart(true)
    setSleep(false)
    setLogin(false)
    setBooting(true)
  }
  const sleepMac = (e?: MouseEvent): void => {
    e?.stopPropagation()
    closeEffect()
    setRestart(false)
    setSleep(true)
    setLogin(false)
    setBooting(true)
  }
  const logout = (): void => {
    closeEffect()
    setLogin(false)
  }
  return {
    user,
    login,
    powerOn,
    booting,
    restart,
    sleep,
    setLogin,
    setPowerOn,
    setBooting,
    setRestart,
    setSleep,
    shutMac,
    restartMac,
    sleepMac,
    logout,
  }
}, { persist: { enabled: true } })
