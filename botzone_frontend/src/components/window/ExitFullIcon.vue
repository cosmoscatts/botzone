<script setup lang="ts">
defineProps<{ size: number }>()
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 19 19"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="{2}"
  >
    <path d="M18.373 9.23L9.75.606V9.23h8.624zM.6 9.742l8.623 8.624V9.742H.599z" />
  </svg>
</template>
