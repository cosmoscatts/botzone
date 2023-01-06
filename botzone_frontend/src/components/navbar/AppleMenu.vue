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
      <AppleMenuItem>关于本机</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>系统偏好设置...</AppleMenuItem>
      <AppleMenuItem>App Store...</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>最近使用的项目</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem>强制退出...</AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup>
      <AppleMenuItem :on-click="sleep">
        睡眠
      </AppleMenuItem>
      <AppleMenuItem :on-click="restart">
        重新启动...
      </AppleMenuItem>
      <AppleMenuItem :on-click="shut">
        关机...
      </AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup :border="false">
      <AppleMenuItem :on-click="logout">
        锁定屏幕
      </AppleMenuItem>
      <AppleMenuItem :on-click="logout">
        退出登录 Admin...
      </AppleMenuItem>
    </AppleMenuItemGroup>
  </div>
</template>
