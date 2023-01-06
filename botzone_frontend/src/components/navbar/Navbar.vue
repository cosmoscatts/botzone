<script setup lang="ts">
import type { Ref } from 'vue'
import { music } from '~/configs'

const props = defineProps<{
  title: string
  setSpotlightBtnRef: (value: Ref<HTMLDivElement>) => void
  hide: boolean
  toggleSpotlight: () => void
}>()

const [_, audioState, controls] = useAudio({
  src: music.audio,
  autoReplay: true,
})

const uiStore = useUiStore()
const setAudioVolume = (value: number) => {
  uiStore.setVolume(value)
  controls.volume(value / 100)
}
const setSiteBrightness = (value: number) => uiStore.setBrightness(value)
useIntervalFn(() => uiStore.setDate(new Date()), 60 * 1000)
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
        :on-click="uiStore.toggleWifiMenu"
      >
        <span :class="`${['i-material-symbols:wifi-off', 'i-material-symbols:wifi'][Number(uiStore.wifi)]} text-lg`" />
      </NavbarItem>

      <NavbarItem>
        <span i-bx:search text-17px />
      </NavbarItem>
      <NavbarItem
        :force-hover="uiStore.state.showControlCenter"
        :on-click="uiStore.toggleControlCenter"
      >
        <svg
          viewBox="0 0 29 29"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z" />
        </svg>
      </NavbarItem>
      <NavbarItem>
        <span>{{ formatDate({ date: new Date(), pattern: 'MMM d' }) }}</span>
        <span>{{ formatDate({ date: new Date(), pattern: 'h:mm ' }) }}</span>
      </NavbarItem>
    </div>
    <WifiMenu v-if="uiStore.state.showWifiMenu" />
    <ControlCenterMenu
      v-if="uiStore.state.showControlCenter"
      :playing="audioState.playing"
      :toggle-audio="controls.toggle"
      :set-volume="setAudioVolume"
      :set-brightness="setSiteBrightness"
      :toggle-control-center="uiStore.toggleControlCenter"
    />
  </div>
</template>
