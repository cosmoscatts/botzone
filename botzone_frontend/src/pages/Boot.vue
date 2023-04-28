<script setup lang="ts">
const LOADING_INTERVAL = 1
const BOOTING_INTERVAL = 500
const authStore = useAuthStore()
const { loading, startLoading, endLoading } = $(useLoading())

let percent = $ref(0)
function setPercent(value = 0) {
  return percent = value
}

watch(() => authStore.restart, (n) => {
  if (n) startLoading()
}, { immediate: true })

const { pause, resume } = useIntervalFn(() => {
  const newPercent = percent + 0.15
  if (newPercent >= 100) {
    useTimeoutFn(() => {
      authStore.setBooting(false)
      endLoading()
    }, BOOTING_INTERVAL)
  } else setPercent(newPercent)
}, LOADING_INTERVAL, { immediate: false })

watch($$(loading), (n) => {
  if (n) resume()
  else pause()
}, { immediate: true })

function handleClick() {
  if (authStore.sleep) authStore.setBooting(false)
  else if (!authStore.restart && !loading) startLoading()
}
</script>

<template>
  <div
    w-screen h-screen bg-black flex="c col"
    @click="handleClick"
  >
    <span i-fa-brands:apple text-white mt="[-4]" w-20 h-20 sm:w-24 sm:h-24 />
    <div
      v-if="loading"
      class="absolute top-1/2 left-0 right-0 w-56 h-1 sm:h-1.5 bg-gray-500 rounded of-hidden"
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
