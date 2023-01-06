interface NavbarState {
  date: Date
  showAppleMenu: boolean
  showControlCenter: boolean
  showWifiMenu: boolean
}

export const useUiStore = defineStore('uiStore', () => {
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
  })
  return {
    volume,
    brightness,
    wifi,
    bluetooth,
    airdrop,
    fullscreen,
    state,
    toggleFullScreen,
    setVolume: (data: number) => volume.value = data,
    setBrightness: (data: number) => brightness.value = data,
    toggleWIFI: () => wifi.value = !wifi.value,
    toggleBluetooth: () => bluetooth.value = !bluetooth.value,
    toggleAirdrop: () => airdrop.value = !airdrop.value,
    setDate: (data: Date) => state.date = data,
    toggleAppleMenu: () => state.showAppleMenu = !state.showAppleMenu,
    toggleControlCenter: () => state.showControlCenter = !state.showControlCenter,
    toggleWifiMenu: () => state.showWifiMenu = !state.showWifiMenu,
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot))
}
