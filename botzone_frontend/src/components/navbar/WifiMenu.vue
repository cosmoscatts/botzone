<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <div menu-box flex gap2 h11 w80 max-wfull right-0 sm:right-2 px2 py="[0.5]">
    <div w="4/5" p="2.5" font-medium>
      Wi-Fi
    </div>
    <div w="1/5" py2 text-center>
      <n-switch v-model:value="uiStore.wifi" />
    </div>
  </div>
</template>
