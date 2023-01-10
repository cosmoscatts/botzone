<script setup lang="ts">
const LOADING_INTERVAL = 1
const BOOTING_INTERVAL = 500
const authStore = useAuthStore()
const { loading, startLoading, endLoading } = useLoading()
const percent = ref(0)
const setPercent = (value = 0) => percent.value = value

watch(() => authStore.restart, (val) => {
  if (val) startLoading()
}, { immediate: true })

const { pause, resume } = useIntervalFn(() => {
  const newPercent = percent.value + 0.15
  if (newPercent >= 100) {
    useTimeoutFn(() => {
      authStore.setBooting(false)
      endLoading()
    }, BOOTING_INTERVAL)
  } else setPercent(newPercent)
}, LOADING_INTERVAL, { immediate: false })

watch(loading, (val) => {
  if (val) resume()
  else pause()
}, { immediate: true })

const handleClick = () => {
  if (authStore.sleep) authStore.setBooting(false)
  else if (!authStore.restart && !loading.value) startLoading()
}
</script>

<template>
  <div
    w-screen h-screen bg-black flex="col c"
    @click="handleClick"
  >
    <span i-fa-brands:apple text-white mt="[-4]" w-20 h-20 sm:w-24 sm:h-24 />
    <div
      v-if="loading"
      className="absolute top-1/2 left-0 right-0 w-56 h-1 sm:h-1.5 bg-gray-500 rounded overflow-hidden"
      m="t-16 sm:t-24 x-auto"
    >
      <span
        absolute top-0 bg-white h-full rounded-sm
        :style="{
          width: `${percent}%`,
        }"
      />
    </div>
    <div
      v-if="!authStore.restart && !loading"
      absolute top="1/2" left-0 right-0
      m="t-16 sm:t-20 x-auto"
      text="sm gray-200 center"
    >
      {{ `点击${['启动', '唤醒'][Number(authStore.sleep)]}` }}
    </div>
  </div>
</template>
