<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import Login from '~/pages/Login.vue'
import Desktop from '~/pages/Desktop.vue'
import Boot from '~/pages/Boot.vue'

hljs.registerLanguage('java', java)

const authStore = useAuthStore()
if (!authStore.powerOn) { // 未开机
  authStore.restartMac()
  authStore.setPowerOn(true)
}
const theme = computed(() => [null, darkTheme][Number(isDark.value)])
const themeOverrides = useThemeOverrides()
writeThemeColorsToBody() // 将 naive-ui 自带颜色写入 body
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-loading-bar-provider>
      <Boot v-if="authStore.booting" />
      <Login v-else-if="!authStore.login" />
      <Desktop v-else />
    </n-loading-bar-provider>
  </n-config-provider>
</template>
