<script setup lang="ts">
defineProps<{ onClick?: (e: MouseEvent) => void }>()
</script>

<template>
  <li
    className="leading-6 cursor-default px-2.5 rounded hover:text-white hover:bg-blue-500"
    @click="onClick"
  >
    <slot />
  </li>
</template>
