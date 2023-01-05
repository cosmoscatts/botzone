<script setup lang="ts">
const battery = useBattery()
const width = computed(() => 0.1 + battery.level.value * 0.96)
const color = computed(() => {
  if (battery.charging.value) return 'bg-green-400'
  if (battery.level.value < 0.2) return 'bg-red-500'
  else if (battery.level.value < 0.5) return 'bg-yellow-500'
  else return 'bg-white'
})
</script>

<template>
  <div hstack space-x-2>
    <span text-xs>{{ (battery.level.value * 100).toFixed() }}%</span>
    <div relative hstack>
      <span i-bi:battery text-2xl />
      <div
        :class="`battery-level ${color}`"
        :style="{ width: `${width}rem` }"
      />
      <span v-if="battery.charging" class="i-bi:lightning-charge-fill text-xs absolute top-1/2 -mt-1.5 left0 ml1" />
    </div>
  </div>
</template>
