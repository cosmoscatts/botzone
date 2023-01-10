import { music } from '~/configs'

interface NavbarState {
  date: Date
  showAppleMenu: boolean
  showControlCenter: boolean
  showWifiMenu: boolean
  showNotch: boolean
}

export const useSystemStore = defineStore('systemStore', () => {
  const volume = ref(100)
  const brightness = ref(80)
  const wifi = ref(true)
  const bluetooth = ref(true)
  const airdrop = ref(true)
  const { isFullscreen: fullscreen, toggle: toggleFullScreen } = useFullscreen()
  const state = reactive<NavbarState>({
    date: new Date(),
    showAppleMenu: false,
    showControlCenter: false,
    showWifiMenu: false,
    showNotch: true,
  })
  const [, audioState, controls] = useAudio({
    src: music.audio,
    autoReplay: true,
  })
  const setVolume = (data: number) => volume.value = data
  return {
    volume,
    brightness,
    wifi,
    bluetooth,
    airdrop,
    fullscreen,
    state,
    toggleFullScreen,
    audio: {
      controls,
      ...audioState,
    },
    setBrightness: (data: number) => brightness.value = data,
    toggleWIFI: () => wifi.value = !wifi.value,
    toggleBluetooth: () => bluetooth.value = !bluetooth.value,
    toggleAirdrop: () => airdrop.value = !airdrop.value,
    setDate: (data: Date) => state.date = data,
    toggleAppleMenu: () => state.showAppleMenu = !state.showAppleMenu,
    toggleControlCenter: () => state.showControlCenter = !state.showControlCenter,
    toggleWifiMenu: () => state.showWifiMenu = !state.showWifiMenu,
    toggleNotch: () => state.showNotch = !state.showNotch,
    setAudioVolume: (value: number) => {
      setVolume(value)
      controls.volume(value / 100)
    },
    closeStateEffect() {
      state.showAppleMenu = false
      state.showControlCenter = false
      state.showWifiMenu = false
      controls.pause()
    },
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
}
