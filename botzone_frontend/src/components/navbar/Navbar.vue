<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  title: string
  setSpotlightBtnRef: (value: Ref<HTMLDivElement>) => void
  hide: boolean
  toggleSpotlight: () => void
}>()
</script>

<template>
  <div
    :class="`wfull hstack h8 px2 fixed top0 justify-between ${
      props.hide ? 'z-0' : 'z-20'
    } text-sm text-white bg-gray-700/10 backdrop-blur-2xl shadow transition`"
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

    <div className="hstack flex-row justify-end space-x-2">
      <TopBarItem hide-on-mobile="{true}">
        <Battery />
      </TopBarItem>
      <TopBarItem
        ref="{wifiBtnRef}"
        hide-on-mobile="{true}"
        force-hover="{state.showWifiMenu}"
        on-click="{toggleWifiMenu}"
      >
        {wifi ? (
        <span className="i-material-symbols:wifi text-lg" />
        ) : (
        <span className="i-material-symbols:wifi-off text-lg" />
        )}
      </TopBarItem>
      <TopBarItem>
        <span className="i-bx:search text-[17px]" />
      </TopBarItem>
      <!-- <TopBarItem
          forceHover={state.showControlCenter}
          onClick={toggleControlCenter}
          ref={controlCenterBtnRef}
        >
          <CCMIcon size={16} />
        </TopBarItem> -->
      <TopBarItem>
        <span>{format(state.date, "eee MMM d")}</span>
        <span>{format(state.date, "h:mm aa")}</span>
      </TopBarItem>
    </div>
  </div>
</template>
