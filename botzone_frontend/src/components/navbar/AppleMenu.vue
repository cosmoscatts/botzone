<script setup lang="ts">
const refEl = ref()
const authStore = useAuthStore()
const systemStore = useSystemStore()
onClickOutside(refEl, systemStore.toggleAppleMenu)
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
      <AppleMenuItem @click="authStore.sleepMac">
        睡眠
      </AppleMenuItem>
      <AppleMenuItem @click="authStore.restartMac">
        重新启动...
      </AppleMenuItem>
      <AppleMenuItem @click="authStore.shutMac">
        关机...
      </AppleMenuItem>
    </AppleMenuItemGroup>
    <AppleMenuItemGroup :border="false">
      <AppleMenuItem :on-click="authStore.logout">
        锁定屏幕
      </AppleMenuItem>
      <AppleMenuItem :on-click="authStore.logout">
        退出登录 Admin...
      </AppleMenuItem>
    </AppleMenuItemGroup>
  </div>
</template>
