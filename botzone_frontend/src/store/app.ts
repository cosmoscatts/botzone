import { apps } from '~/configs'

interface AppState {
  showApps: {
    [key: string]: boolean
  }
  appsZ: {
    [key: string]: number
  }
  maxApps: {
    [key: string]: boolean
  }
  minApps: {
    [key: string]: boolean
  }
  maxZ: number
  currentTitle: string
  hideDockAndTopbar: boolean
  showLaunchpad: boolean
}

export const useAppStore = defineStore('appStore', () => {
  const state = reactive<AppState>({
    showApps: {},
    appsZ: {},
    maxApps: {},
    minApps: {},
    maxZ: 2,
    currentTitle: 'Finder',
    hideDockAndTopbar: false,
    showLaunchpad: false,
  })
  const setShowApps = (showApps = {}) => state.showApps = showApps
  const setMaxApps = (maxApps = {}) => state.maxApps = maxApps
  const setMinApps = (minApps = {}) => state.minApps = minApps
  const setHideDockAndTopbar = (value: boolean) => state.hideDockAndTopbar = value
  const toggleLaunchpad = () => {
    const r = document.querySelector('#launchpad') as HTMLElement
    if (!state.showLaunchpad) {
      r.style.transform = 'scale(1)'
      r.style.transition = 'ease-in 0.2s'
    } else {
      r.style.transform = 'scale(1.1)'
      r.style.transition = 'ease-out 0.2s'
    }
    state.showLaunchpad = !state.showLaunchpad
  }
  const getAppsData = () => {
    apps.forEach((app) => {
      state.showApps = {
        ...state.showApps,
        [app.id]: app.show ?? false,
      }
      state.appsZ = {
        ...state.appsZ,
        [app.id]: 2,
      }
      state.maxApps = {
        ...state.maxApps,
        [app.id]: false,
      }
      state.minApps = {
        ...state.minApps,
        [app.id]: false,
      }
    })
  }
  const open = (id: string) => {
    state.showApps[id] = true
    const maxZ = state.maxZ + 1
    state.appsZ[id] = maxZ
    const currentApp = apps.find(app => app.id === id)
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`)
    }
    state.maxZ = maxZ
    state.currentTitle = currentApp.title
    if (state.minApps[id]) {
      const r = document.querySelector(`#window-${id}`) as HTMLElement
      r.style.transform = `translate(${r.style.getPropertyValue(
        '--window-transform-x',
      )}, ${r.style.getPropertyValue('--window-transform-y')}) scale(1)`
      r.style.transition = 'ease-in 0.3s'
      state.minApps[id] = false
    }
  }
  return {
    ...toRefs(state),
    setShowApps,
    setMaxApps,
    setMinApps,
    setHideDockAndTopbar,
    toggleLaunchpad,
    getAppsData,
    openApp(id: string) {
      if (id === 'launchpad') toggleLaunchpad()
      else {
        if (state.showLaunchpad) toggleLaunchpad()
        open(id)
      }
    },
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
