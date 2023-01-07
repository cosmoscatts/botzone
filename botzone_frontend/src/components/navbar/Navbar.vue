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

const systemStore = useSystemStore()
const setAudioVolume = (value: number) => {
  systemStore.setVolume(value)
  controls.volume(value / 100)
}
const setSiteBrightness = (value: number) => systemStore.setBrightness(value)
useIntervalFn(() => systemStore.setDate(new Date()), 10 * 1000)

const logout = (): void => {
  controls.pause()
  // props.setLogin(false)
}

const shut = (e: MouseEvent): void => {
  controls.pause()
  // props.shutMac(e)
}

const restart = (e: MouseEvent): void => {
  controls.pause()
  // props.restartMac(e)
}

const sleep = (e: MouseEvent): void => {
  controls.pause()
  // props.sleepMac(e)
}
</script>

<template>
  <div
    wfull hstack h7 px2 fixed top-0 flex justify-between
    text="sm [#1C1C1C] dark:white" bg="gray-100/30 dark:gray-700/30" backdrop-blur-12px shadow transition
    :class="`${
      props.hide ? 'z-0' : 'z-20'
    }`"
  >
    <Transition name="fade">
      <div v-if="systemStore.state.showNotch" class="notch">
        <span i-twemoji-face-with-monocle text-1.2rem />
      </div>
    </Transition>

    <div hstack space-x-1>
      <NavbarItem
        px2 :force-hover="systemStore.state.showAppleMenu"
        @click="systemStore.toggleAppleMenu"
      >
        <span i-ri:apple-fill text-base />
      </NavbarItem>
      <NavbarItem
        font-semibold px2
      >
        Botzone
      </NavbarItem>
    </div>

    <AppleMenu
      v-if="systemStore.state.showAppleMenu"
      :logout="{ logout }"
      :shut="{ shut }"
      :restart="{ restart }"
      :sleep="{ sleep }"
      :toggle-apple-menu="systemStore.toggleAppleMenu"
    />

    <div hstack flex-row justify-end space-x-2>
      <NavbarItem hide-on-mobile>
        <Battery />
      </NavbarItem>
      <NavbarItem
        :force-hover="systemStore.state.showWifiMenu"
        :hide-on-mobile="true"
        :on-click="systemStore.toggleWifiMenu"
      >
        <span :class="`${['i-material-symbols:wifi-off', 'i-material-symbols:wifi'][Number(systemStore.wifi)]} text-lg`" />
      </NavbarItem>

      <NavbarItem hide-on-mobile>
        <span i-bx:search text-17px mt1px />
      </NavbarItem>
      <NavbarItem
        :force-hover="systemStore.state.showControlCenter"
        :on-click="systemStore.toggleControlCenter"
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
        <span>{{ formatDate({ date: systemStore.state.date, pattern: 'MMM d' }) }}</span>
        <span>{{ formatDate({ date: systemStore.state.date, pattern: 'h:mm A' }) }}</span>
      </NavbarItem>
    </div>
    <WifiMenu v-if="systemStore.state.showWifiMenu" />
    <ControlCenterMenu
      v-if="systemStore.state.showControlCenter"
      :playing="audioState.playing"
      :toggle-audio="controls.toggle"
      :set-volume="setAudioVolume"
      :set-brightness="setSiteBrightness"
      :toggle-control-center="systemStore.toggleControlCenter"
    />
  </div>
</template>

<style scoped lang="less">
.notch {
    display: grid;
    place-items: center;

    position: absolute;
    top: 0;
    left: 50%;

    width:  140px;
    height: 95%;

    background-color: #222;
    border-radius: 0 0 0.5rem 0.5rem;
    transform: translateX(-50%);

    & > span {
      opacity: 0;

      transition: opacity 0.2s ease-in-out;
    }

    &:hover {
      & > span {
        opacity: 1;
      }
    }

    // for outward curves
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      height: 16px;
      width: 16px;
      border-radius: 50%;
    }
    &::before {
      left: -16px;
      box-shadow: 8px -8px #222;
    }
    &::after {
      right: -16px;
      box-shadow: -8px -8px #222;
    }
  }
</style>
