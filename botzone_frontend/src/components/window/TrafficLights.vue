<script setup lang="ts">
defineProps<{
  id: string
  max: boolean
  setMax: (id: string, target?: boolean) => void
  setMin: (id: string) => void
  close: (id: string) => void
}>()

const closeWindow = (e: MouseEvent | TouchEvent): void => {
  e.stopPropagation()
  close(id)
}
</script>

<template>
  <div class="traffic-lights flex flex-row absolute left-0 space-x-2 pl2 mt1.5">
    <button
      class="window-btn bg-red-500 dark:bg-red-400"
      @click="closeWindow"
      @touchend="closeWindow"
    >
      <span class="icon i-gg:close text-[9px]" />
    </button>
    <button
      :class="`window-btn ${
        max ? 'c-bg-400' : 'bg-yellow-500 dark:bg-yellow-400'
      }`"
      :disabled="max"
      @click="() => setMin(id)"
      @touchend="() => setMin(id)"
    >
      <span
        :class="`icon i-fe:minus text-[10px] ${max ? 'invisible' : ''}`"
      />
    </button>
    <button
      class="window-btn bg-green-500 dark:bg-green-400"
      @click="() => setMax(id)"
      @touchend="() => setMax(id)"
    >
      <ExitFullIcon v-if="max" :size="9" />
      <FullIcon v-else :size="6" />
    </button>
  </div>
</template>
