<script setup lang="ts">
import { music } from '~/configs'

const props = defineProps<{
  toggleAudio: (value: boolean) => void
  setBrightness: (value: number) => void
  setVolume: (value: number) => void
  playing: boolean
}>()

const refEl = ref()
const uiStore = useUiStore()
onClickOutside(refEl, uiStore.toggleControlCenter)
</script>

<template>
  <div
    ref="refEl"
    fixed shadow-menu w80 h96 max-w-full top-9.5 right-0
    sm:right-1.5 p-2.5 c-text-black c="bg-100/70" border rounded-2xl menu-border
    grid="~ cols-4 rows-5 gap2"
  >
    <div cc-grid row-span-2 col-span-2 p-2 flex="~ col" justify-around>
      <div hstack space-x-2>
        <div
          :class="`${uiStore.wifi ? 'cc-btn' : 'cc-btn-active'}`" cursor-pointer
          @click="uiStore.toggleWIFI"
        >
          <span i-material-symbols:wifi text-base />
        </div>
        <div flex flex-col pt-0.5>
          <span font-medium leading-4>Wi-Fi</span>
          <span cc-text>{{ uiStore.wifi ? "家庭" : "关闭" }}</span>
        </div>
      </div>
      <div hstack space-x-2>
        <div
          :class="`${uiStore.bluetooth ? 'cc-btn' : 'cc-btn-active'}`" cursor-pointer
          @click="uiStore.toggleBluetooth"
        >
          <span i-charm:bluetooth text-base />
        </div>
        <div flex flex-col pt-0.5>
          <span font-medium leading-4>蓝牙</span>
          <span cc-text>{{ uiStore.bluetooth ? "打开" : "关闭" }}</span>
        </div>
      </div>
      <div hstack space-x-2>
        <div
          :class="`${uiStore.airdrop ? 'cc-btn' : 'cc-btn-active'}`" cursor-pointer
          @click="uiStore.toggleAirdrop"
        >
          <span i-material-symbols:rss-feed-rounded text-base />
        </div>
        <div flex flex-col pt-0.5>
          <span font-medium leading-4>隔空投送</span>
          <span cc-text>{{ uiStore.airdrop ? "仅限联系人" : "关闭" }}</span>
        </div>
      </div>
    </div>
    <div cc-grid col-span-2 p-2 hstack space-x-2>
      <div
        :class="`${isDark ? 'cc-btn' : 'cc-btn-active'}`" cursor-pointer
        @click="toggleDark()"
      >
        <span text-base i-ion:sunny dark:i-ion:moon />
      </div>
      <div flex="~ col">
        <span font-medium ml1>
          {{ isDark ? "暗色模式" : "亮色模式" }}
        </span>
      </div>
    </div>
    <div cc-grid p2 flex="c col" text-center cursor-pointer>
      <span i-bi:brightness-alt-high text-xl />
      <span text-xs leading-3.5>键盘亮度</span>
    </div>
    <div
      cc-grid p2 flex="c col" text-center cursor-pointer
      @click="uiStore.toggleFullScreen"
    >
      <span text-base :class="['i-bi:fullscreen', 'i-bi:fullscreen-exit'][Number(uiStore.fullscreen)] " />
      <span text-xs leading-3.5 mt-1.5>
        {{ uiStore.fullscreen ? "关闭全屏" : "进入全屏" }}
      </span>
    </div>
    <div cc-grid col-span-4 px2.5 py2 space-y-1 flex="~ col" justify-around>
      <span font-medium ml-0.5>显示器</span>
      <SliderComponent
        icon="i-ion:sunny"
        :value="uiStore.brightness"
        set-value="{setBrightness}"
      />
    </div>
    <div cc-grid col-span-4 px2.5 py2 space-y-1 flex="~ col" justify-around>
      <span font-medium ml-0.5>声音</span>
      <SliderComponent
        icon="i-ion:volume-high"
        value="{volume}"
        set-value="{setVolume}"
      />
    </div>
    <div cc-grid col-span-4 p2 pr4 hstack flex-row justify-between space-x-2.5>
      <img :src="music.cover" alt="cover art" w12 rounded-lg>
      <div flex="~ col" flex-grow justify-start>
        <span font-medium>{{ music.title }}</span>
        <span cc-text>{{ music.artist }}</span>
      </div>
      <span
        :class="`${['i-bi:play-fill', 'i-bi:pause-fill'][Number(props.playing)]}`" text-2xl
        @click="props.toggleAudio"
      />
    </div>
  </div>
</template>
