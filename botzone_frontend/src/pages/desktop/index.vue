<script setup lang="ts">
import { wallpapers } from '~/configs'

const systemStore = useSystemStore()
const brightness = computed(() => {
  let val = systemStore.brightness * 0.6 + 50
  val = Math.max(val, 50)
  val = Math.min(val, 110)
  return val
})
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
    <Dock />
  </div>
</template>
