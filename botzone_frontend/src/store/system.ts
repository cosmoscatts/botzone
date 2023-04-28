import type { StoreDefinition } from 'pinia'
import { music } from '~/configs'

interface NavbarState {
  date: Date
  showAppleMenu: boolean
  showControlCenter: boolean
  showWifiMenu: boolean
  showNotch: boolean
  showSpotlight: boolean
}

function getBaseState() {
  return {
    date: new Date(),
    showAppleMenu: false,
    showControlCenter: false,
    showWifiMenu: false,
    showNotch: true,
    showSpotlight: false,
  }
}

export const useSystemStore = defineStore('systemStore', () => {
  let volume = $ref(100)
  let brightness = $ref(80)
  let wifi = $ref(true)
  let bluetooth = $ref(true)
  let airdrop = $ref(true)
  const { isFullscreen: fullscreen, toggle: toggleFullScreen } = $(useFullscreen())
  const state = reactive<NavbarState>(getBaseState())
  const [, audioState, controls] = useAudio({
    src: music.audio,
    autoReplay: true,
  })
  const setVolume = (data: number) => volume = data
  return {
    ...$$({
      volume,
      brightness,
      wifi,
      bluetooth,
      airdrop,
      fullscreen,
    }),
    state,
    toggleFullScreen,
    audio: {
      controls,
      ...audioState,
    },
    setBrightness: (data: number) => brightness = data,
    toggleWIFI: () => wifi = !wifi,
    toggleBluetooth: () => bluetooth = !bluetooth,
    toggleAirdrop: () => airdrop = !airdrop,
    setDate: (data: Date) => state.date = data,
    toggleAppleMenu: () => state.showAppleMenu = !state.showAppleMenu,
    toggleControlCenter: () => state.showControlCenter = !state.showControlCenter,
    toggleWifiMenu: () => state.showWifiMenu = !state.showWifiMenu,
    toggleNotch: () => state.showNotch = !state.showNotch,
    toggleSpotlight: () => state.showSpotlight = !state.showSpotlight,
    setAudioVolume: (value: number) => {
      setVolume(value)
      controls.volume(value / 100)
    },
    closeStateEffect() {
      state.showAppleMenu = false
      state.showControlCenter = false
      state.showWifiMenu = false
      state.showSpotlight = false
      controls.pause()
    },
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore as unknown as StoreDefinition, import.meta.hot))
}
