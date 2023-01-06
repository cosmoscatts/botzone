<script setup lang="ts">
defineProps<{
  icon: string
  value: number
  setValue: (value: number) => void
}>()
</script>

<template>
  <div class="slider flex w-full">
    <div
      w7 h7 flex-c c-bg-100 c-border-300
      border="t l b rounded-l-full"
    >
      <span :class="`${icon} c-text-500 text-xs`" />
    </div>
    <n-slider
      :value="value"
      :tooltip="false"
      :on-update:value="setValue"
    />
  </div>
</template>
