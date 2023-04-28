<script setup lang="ts">
const { id, max } = defineProps<{
  id: string
  max: boolean
}>()
const emits = defineEmits(['setMax', 'setMin', 'close'])
function closeWindow(e: MouseEvent | TouchEvent): void {
  e.stopPropagation()
  emits('close', id)
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
      @click="$emit('setMin', id)"
      @touchend="$emit('setMin', id)"
    >
      <span
        :class="`icon i-fe:minus text-[10px] ${max ? 'invisible' : ''}`"
      />
    </button>
    <button
      class="window-btn bg-green-500 dark:bg-green-400"
      @click="$emit('setMax', id)"
      @touchend="$emit('setMax', id)"
    >
      <ExitFullIcon v-if="max" :size="9" />
      <FullIcon v-else :size="6" />
    </button>
  </div>
</template>
