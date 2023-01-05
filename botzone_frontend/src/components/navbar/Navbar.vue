<script setup lang="ts">
import type { Ref } from 'vue'
interface NavbarState {
  date: Date
  showAppleMenu: boolean
  showControlCenter: boolean
  showWifiMenu: boolean
}
const props = defineProps<{
  title: string
  setSpotlightBtnRef: (value: Ref<HTMLDivElement>) => void
  hide: boolean
  toggleSpotlight: () => void
}>()

const uiStore = useUiStore()
const state = reactive<NavbarState>({
  date: new Date(),
  showAppleMenu: false,
  showControlCenter: false,
  showWifiMenu: false,
})
// const toggleAppleMenu = (value: boolean) => state.showAppleMenu = !state.showAppleMenu
// const toggleControlCenter = (value: boolean) => state.showControlCenter = !state.showControlCenter
const toggleWifiMenu = () => state.showWifiMenu = !state.showWifiMenu
</script>

<template>
  <div
    wfull hstack h8 px2 fixed top-0 flex justify-between
    text="sm white" bg="gray-700/10" backdrop-blur-2xl shadow transition
    :class="`${
      props.hide ? 'z-0' : 'z-20'
    }`"
  >
    <div hstack space-x-1>
      <NavbarItem px2>
        <span i-ri:apple-fill text-base />
      </NavbarItem>
      <NavbarItem
        font-semibold px2
      >
        Botzone
      </NavbarItem>
    </div>

    <div hstack flex-row justify-end space-x-2>
      <NavbarItem hide-on-mobile>
        <Battery />
      </NavbarItem>
      <NavbarItem
        :hide-on-mobile="true"
        :on-click="toggleWifiMenu"
      >
        <span :class="`${['i-material-symbols:wifi-off', 'i-material-symbols:wifi'][Number(uiStore.wifi)]} text-lg`" />
      </NavbarItem>

      <NavbarItem>
        <span i-bx:search text-17px />
      </NavbarItem>
      <!-- <NavbarItem
          forceHover={state.showControlCenter}
          onClick={toggleControlCenter}
          ref={controlCenterBtnRef}
        >
          <CCMIcon size={16} />
        </NavbarItem> -->
      <NavbarItem>
        <span>{{ formatDate({ date: new Date(), pattern: 'MMM d' }) }}</span>
        <span>{{ formatDate({ date: new Date(), pattern: 'h:mm ' }) }}</span>
      </NavbarItem>
    </div>
    <WifiMenu v-if="state.showWifiMenu" />
  </div>
</template>
