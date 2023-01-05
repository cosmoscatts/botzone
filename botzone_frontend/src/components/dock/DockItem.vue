<script setup lang="ts">
</script>

<template>
  <div
    ref="{ref}"
    className="{`hstack" space-x-1 h-6 px-1 cursor-default rounded ${hide} ${hover} ${
    props.className || ""
    }`}
    onClick="{props.onClick}"
    onMouseEnter="{props.onMouseEnter}"
  >
    {props.children}
  </div>
</template>
