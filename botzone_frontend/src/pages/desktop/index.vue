<script setup lang="ts">
import WindowArea from './components/WindowArea.vue'
import { wallpapers } from '~/configs'

const appStore = useAppStore()
const systemStore = useSystemStore()
const brightness = computed(() => {
  let val = systemStore.brightness * 0.6 + 50
  val = Math.max(val, 50)
  val = Math.min(val, 110)
  return val
})
appStore.getAppsData()
</script>

<template>
  <div
    w-screen h-screen of-hidden bg="center cover"
    :style="{
      backgroundImage: `url(${isDark ? wallpapers.night : wallpapers.day})`,
      filter: `brightness( ${brightness}% )`,
    }"
  >
    <Navbar />

    <WindowArea />

    <Dock />
  </div>
</template>
