export const useUiStore = defineStore('uiStore', () => {
  const volume = ref(100)
  const brightness = ref(80)
  const wifi = ref(true)
  const bluetooth = ref(true)
  const airdrop = ref(true)
  const fullscreen = ref(false)
  return {
    volume,
    brightness,
    wifi,
    bluetooth,
    airdrop,
    fullscreen,
    setVolume: (data: number) => volume.value = data,
    setBrightness: (data: number) => brightness.value = data,
    toggleWIFI: (data: boolean) => wifi.value = data,
    toggleBluetooth: (data: boolean) => bluetooth.value = data,
    toggleAirdrop: (data: boolean) => airdrop.value = data,
    toggleFullScreen: (data: boolean) => fullscreen.value = data,
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot))
}
