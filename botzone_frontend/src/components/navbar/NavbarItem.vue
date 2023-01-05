<script setup lang="ts">
const props = defineProps<{
  hideOnMobile?: boolean
  forceHover?: boolean
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
}>()

const hide = computed(() => props.hideOnMobile ? 'hidden sm:inline-flex' : 'inline-flex')
const hover = computed(() => props.forceHover
  ? 'bg-gray-100/30 dark:bg-gray-400/40'
  : 'hover:(bg-gray-100/30 dark:bg-gray-400/40)')
</script>

<template>
  <div
    :class="`hstack space-x-1 h-6 px-1 cursor-default rounded cursor-pointer ${hide} ${hover} ${props.className}`"
    @click="props.onClick"
    @mouseenter="props.onMouseEnter"
  >
    <slot />
  </div>
</template>
