<script setup lang="ts">
import { apps } from '~/configs'

const appStore = useAppStore()
const dockStore = useDockStore()

const mouseX = ref<number | null>(null)
const setMouseX = (value: number | null) => mouseX.value = value
</script>

<template>
  <div
    :class="`dock w-full sm:w-max fixed left-0 right-0 mx-auto bottom-1 ${
      appStore.hideDockAndTopbar ? 'z-0' : 'z-50'
    } overflow-x-scroll sm:overflow-x-visible`"
  >
    <ul
      mxa w-max px2 space-x-2 flex backdrop-blur-2xl
      c="border-400/40 bg-white/20"
      border="1 rounded-none sm:rounded-xl"
      :style="{
        height: `${dockStore.size + 15}px`,
      }"
      @mousemove="(e) => setMouseX(e.x)"
      @mouseleave="() => setMouseX(null)"
    >
      <DockItem
        v-for="{ id, title, img, desktop, link } in apps"
        :key="id"
        v-bind="{
          id,
          title,
          img,
          mouseX,
          desktop,
          link,
          isOpen: desktop && appStore.showApps[id],
        }"
      />
    </ul>
  </div>
</template>
