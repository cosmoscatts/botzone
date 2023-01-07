<script setup lang="ts">
import { apps } from '~/configs'

const props = defineProps<{
  open: (id: string) => void
  showApps: {
    [key: string]: boolean
  }
  showLaunchpad: boolean
  toggleLaunchpad: (target: boolean) => void
  hide: boolean
}>()

const dockStore = useDockStore()

const openApp = (id: string) => {
  if (id === 'launchpad') props.toggleLaunchpad(!props.showLaunchpad)
  else {
    props.toggleLaunchpad(false)
    props.open(id)
  }
}

const mouseX = ref<number | null>(null)
const setMouseX = (value: number | null) => mouseX.value = value
</script>

<template>
  <div
    :class="`dock w-full sm:w-max fixed left-0 right-0 mx-auto bottom-1 ${
      props.hide ? 'z-0' : 'z-50'
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
        v-for="app in apps"
        :id="app.id"
        :key="app.id"
        :title="app.title"
        :img="app.img"
        :mouse-x="mouseX"
        :desktop="app.desktop"
        :open-app="openApp"
        :is-open="app.desktop && showApps[app.id]"
        :link="app.link"
        :dock-size="dockStore.size"
        :dock-mag="dockStore.mag"
      />
    </ul>
  </div>
</template>
