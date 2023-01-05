<script setup lang="ts">
import { wallpapers } from '~/configs'

const brightness = ref(100)
</script>

<template>
  <div
    w-screen h-screen overflow-hidden bg-center bg-cover
    :style="{
      backgroundImage: `url(${isDark ? wallpapers.night : wallpapers.day})`,
      filter: `brightness( ${(brightness as number) * 0.7 + 50}% )`,
    }"
  >
    <Navbar />
  </div>
</template>
