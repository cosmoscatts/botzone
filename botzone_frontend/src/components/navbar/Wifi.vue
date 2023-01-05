<script setup lang="ts">
const wifi = ref(true)
</script>

<template>
  <n-popover trigger="hover" :show-arrow="false">
    <template #trigger>
      <span :class="`${['i-material-symbols:wifi-off', 'i-material-symbols:wifi'][Number(wifi)]} text-lg`" />
    </template>
    <div menu-box flex gap-2 h11 w80 max-w-full right-0 sm:right-2 px2 py="0.5">
      <div w="4/5" p="2.5" font-medium>
        Wi-Fi
      </div>
      <div w="1/5" py2 text-center>
        <n-switch v-model:value="wifi" />
      </div>
    </div>
  </n-popover>
</template>
