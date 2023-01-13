import defaultAvatar from '/imgs/user/default-avatar.jpg'
import type { User } from '~/types'

export const useAuthStore = defineStore('authStore', () => {
  const user = $ref<User>({
    name: 'admin',
    avatar: defaultAvatar,
  })
  let login = $ref(true)
  let powerOn = $ref(false)
  let booting = $ref(false)
  let restart = $ref(false)
  let sleep = $ref(false)

  const setLogin = (value: boolean) => login = value
  const setPowerOn = (value: boolean) => powerOn = value
  const setBooting = (value: boolean) => booting = value
  const setRestart = (value: boolean) => restart = value
  const setSleep = (value: boolean) => sleep = value

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
  return $$({
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
  })
}, { persist: { enabled: true } })
