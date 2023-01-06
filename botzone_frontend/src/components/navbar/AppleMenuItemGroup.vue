<script setup lang="ts">
const { border = true } = defineProps<{ border?: boolean }>()
const borderClassName = computed(() => {
  return border === false
    ? 'pb-1'
    : 'after:(content-empty block pb0 h1.5 max-w-full mx2 border-b c-border-400)'
})
</script>

<template>
  <ul :class="`relative px1 pt1 ${borderClassName}`">
    <slot />
  </ul>
</template>
