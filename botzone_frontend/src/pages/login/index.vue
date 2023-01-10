<script setup lang="ts">
import { wallpapers } from '~/configs'

const authStore = useAuthStore()
const password = ref('')
const sign = ref('点击登录')
const setSign = (value: string) => sign.value = value
const loginHandle = () => {
  if (['', '123456'].includes(password.value)) {
    authStore.setLogin(true)
  } else if (password.value !== '') {
    setSign('密码不正确')
  }
}
const keyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') loginHandle()
}
</script>

<template>
  <div
    w-screen h-screen text-center
    :style="{
      background: `url(${
        isDark ? wallpapers.night : wallpapers.day
      }) center/cover no-repeat`,
    }"
    @click="loginHandle"
  >
    <div class="inline-block wa relative top-1/2 -mt-40">
      <img
        rounded-full w24 h24 my0 mxa
        :src="authStore.user?.avatar"
        alt="img"
      >
      <div font-semibold mt-2 text-xl text-white>
        {{ authStore.user?.name ?? '-' }}
      </div>

      <div
        mxa grid="~ cols-5" w44 h8 mt4
        rounded-md backdrop-blur-2xl bg="gray-300/50"
      >
        <input
          v-model="password"
          text-sm text-white col-start-1
          col-span-4 no-outline bg-transparent
          px2
          type="password"
          placeholder="Enter Password"
          @click="(e) => e.stopPropagation()"
          @keypress="keyPress"
        >
        <div col-start-5 col-span-1 flex-c>
          <span i-bi:question-square-fill text-white ml1 />
        </div>
      </div>

      <div text-sm mt-2 text-gray-200 cursor-pointer>
        {{ sign }}
      </div>
    </div>

    <div text-sm fixed bottom-16 left-0 right-0 mx-auto flex="~ row-reverse" space-x-4 w-max>
      <div
        hstack flex-col text-white w-24 cursor-pointer
        @click="authStore.sleepMac"
      >
        <div flex-c h10 w10 bg-gray-700 rounded-full>
          <span className="i-gg:sleep text-[40px]" />
        </div>
        <span>睡眠</span>
      </div>
      <div
        hstack flex-col text-white w24 cursor-pointer
        @click="authStore.restartMac"
      >
        <div flex-c h10 w10 bg-gray-700 rounded-full>
          <span i-ri:restart-line text-4xl />
        </div>
        <span>重启</span>
      </div>
      <div
        hstack flex-col text-white w24 cursor-pointer
        @click="authStore.shutMac"
      >
        <div flex-c h10 w10 bg-gray-700 rounded-full>
          <span i-ri:shut-down-line text-4xl />
        </div>
        <span>关机</span>
      </div>
    </div>
  </div>
</template>
