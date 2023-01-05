<script setup lang="ts">
import { wallpapers } from '~/configs'
</script>

<template>
  <div
    w-screen h-screen text-center
    :style="{
      background: `url(${
        isDark ? wallpapers.night : wallpapers.day
      }) center/cover no-repeat`,
    }"
  >
    123123123
  </div>
</template>
