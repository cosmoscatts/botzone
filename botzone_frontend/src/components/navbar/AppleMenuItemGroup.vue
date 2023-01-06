<script setup lang="ts">
const { border } = defineProps<{ border?: boolean }>()
const borderClassName = computed(() => {
  return border === false
    ? 'pb-1'
    : 'after:(content-empty block pb-0 h-1.5 max-w-full mx-2 border-b c-border-400)'
})
</script>

<template>
  <ul :class="`relative px-1 pt-1 ${borderClassName}`">
    <slot />
  </ul>
</template>
