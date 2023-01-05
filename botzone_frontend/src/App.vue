<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import Login from '~/pages/login/index.vue'
import Desktop from '~/pages/desktop/index.vue'

hljs.registerLanguage('java', java)

// 主题和自定义主题覆盖
const theme = computed(() => [null, darkTheme][Number(isDark.value)])
const login = ref(true)
</script>

<template>
  <n-config-provider
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-loading-bar-provider>
      <Login v-if="!login" />
      <Desktop v-else />
    </n-loading-bar-provider>
  </n-config-provider>
</template>
