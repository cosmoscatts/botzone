export const useDockStore = defineStore('dockStore', () => {
  let size = $ref(50)
  let mag = $ref(2)
  return {
    ...$$({
      size,
      mag,
    }),
    setDockSize: (value: number) => size = value,
    setDockMag: (value: number) => mag = value,
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDockStore, import.meta.hot))
}
