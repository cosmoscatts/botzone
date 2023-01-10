export const useDockStore = defineStore('dockStore', () => {
  const size = ref(50)
  const mag = ref(2)
  return {
    size,
    mag,
    setDockSize: (value: number) => size.value = value,
    setDockMag: (value: number) => mag.value = value,
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDockStore, import.meta.hot))
}
