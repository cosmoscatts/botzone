<script setup lang="ts">
import { apps } from '~/configs'
const appStore = useAppStore()
</script>

<template>
  <div class="window-bound z-10 absolute" style="{ top: minMarginY }">
    <template v-for="app in apps" :key="`desktop-app-${app.id}`">
      <Window
        v-if="app.desktop && appStore.showApps[app.id]"
        v-bind="{
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          z: appStore.appsZ[app.id],
          max: appStore.maxApps[app.id],
          min: appStore.minApps[app.id],
        }"
      >
        <Component :is="app.content" v-if="app.content" />
      </Window>
      <div v-else />
    </template>
  </div>
</template>
