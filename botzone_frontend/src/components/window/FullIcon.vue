<script setup lang="ts">
defineProps<{ size: number }>()
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 13 13"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="{2}"
  >
    <path d="M9.26 12.03L.006 2.73v9.3H9.26zM2.735.012l9.3 9.3v-9.3h-9.3z" />
  </svg>
</template>
