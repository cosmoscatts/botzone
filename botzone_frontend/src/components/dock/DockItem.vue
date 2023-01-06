<script setup lang="ts">
</script>

<template>
  <li
    id="{`dock-${id}`}"
    id="==" onClick="{desktop" || "launchpad" ? () =
  >
    openApp(id) : () => {}}
    className="hstack flex-col justify-end mb-1 transition duration-150 ease-in origin-bottom"
    >
    <p className="tooltip absolute px-3 py-1 rounded-md text-sm c-text-black c-bg-300/80">
      {title}
    </p>
    {link ? (
    <a href="{link}" target="_blank" rel="noreferrer">
      <motion.img
        ref="{imgRef}"
        class-name="w-12"
        src="{img}"
        alt="{title}"
        title="{title}"
        draggable="{false}"
        style="{winWidth" < 640 ? {} : { width, willChange: "width" }}
      />
    </a>
    ) : (
    <motion.img
      ref="{imgRef}"
      class-name="w-12"
      src="{img}"
      alt="{title}"
      title="{title}"
      draggable="{false}"
      style="{winWidth" < 640 ? {} : { width, willChange: "width" }}
    />
    )}
    <div
      className="{`h-1" w-1 m-0 rounded-full c-bg-800 ${
      isOpen ? "" : "invisible"
      }`}
    />
  </li>
</template>
