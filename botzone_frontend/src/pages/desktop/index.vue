<script setup lang="ts">
import { wallpapers } from '~/configs'

const systemStore = useSystemStore()
</script>

<template>
  <div
    w-screen h-screen of-hidden bg-center bg-cover
    :style="{
      backgroundImage: `url(${isDark ? wallpapers.night : wallpapers.day})`,
      filter: `brightness( ${Math.max(50, systemStore.brightness)}% )`,
    }"
  >
    <Navbar />
  </div>
</template>
