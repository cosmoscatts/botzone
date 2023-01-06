<script setup lang="ts">
const props = defineProps<{
  logout: () => void
  shut: (e: MouseEvent) => void
  restart: (e: MouseEvent) => void
  sleep: (e: MouseEvent) => void
  toggleAppleMenu: () => void
}>()
const refEl = ref()
onClickOutside(refEl, props.toggleAppleMenu)
</script>

<template>
  <div ref="refEl" menu-box left-2 w56>
    <AppleMenuItemGroup>
      <AppleMenuItem>About This Mac</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>System Preferences...</AppleMenuItem>
      <AppleMenuItem>App Store...</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>Recent Items</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>Force Quit...</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem :on-click="sleep">
        Sleep
      </AppleMenuItem>
      <AppleMenuItem :on-click="restart">
        Restart...
      </AppleMenuItem>
      <AppleMenuItem :on-click="shut">
        Shut Down...
      </AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup :border="false">
      <AppleMenuItem :on-click="logout">
        Lock Screen
      </AppleMenuItem>
      <AppleMenuItem :on-click="logout">
        Log Out Admin...
      </AppleMenuItem>
    </AppleMenuItemGroup>
  </div>
</template>
