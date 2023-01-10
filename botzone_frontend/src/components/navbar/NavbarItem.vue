<script setup lang="ts">
const props = defineProps<{
  hideOnMobile?: boolean
  forceHover?: boolean
  className?: string
}>()

const hide = computed(() => props.hideOnMobile ? 'hidden sm:inline-flex' : 'inline-flex')
const hover = computed(() => props.forceHover
  ? 'bg-gray-100/30 dark:bg-gray-400/40'
  : 'hover:(bg-gray-100/30 dark:bg-gray-400/40)')
</script>

<template>
  <div :class="`hstack space-x-1 h6 px1 rounded select-none cursor-pointer ${hide} ${hover} ${props.className}`">
    <slot />
  </div>
</template>
