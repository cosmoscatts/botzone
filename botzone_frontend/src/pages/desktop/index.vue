<script setup lang="ts">
import { wallpapers } from '~/configs'

const uiStore = useUiStore()
</script>

<template>
  <div
    w-screen h-screen of-hidden bg-center bg-cover
    :style="{
      backgroundImage: `url(${isDark ? wallpapers.night : wallpapers.day})`,
      filter: `brightness( ${uiStore.brightness * 0.7 + 50}% )`,
    }"
  >
    <Navbar />
  </div>
</template>
