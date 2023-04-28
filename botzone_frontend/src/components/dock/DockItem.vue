<script setup lang="ts">
import { interpolate } from 'popmotion'
import { useSpring } from '@vueuse/motion'

const props = defineProps<{
  id: string
  title: string
  img: string
  mouseX: number | null
  desktop: boolean
  isOpen: boolean
  link?: string
}>()

const refImg = ref()
const appStore = useAppStore()
const dockStore = useDockStore()
const { width: winWidth } = useWindowSize()
function useDockHoverAnimation() {
  const [dockSize, dockMag] = [dockStore.size, dockStore.mag]
  const distanceLimit = dockSize * 6
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / (dockMag * 0.65),
    -distanceLimit / (dockMag * 0.85),
    0,
    distanceLimit / (dockMag * 0.85),
    distanceLimit / (dockMag * 0.65),
    distanceLimit,
  ]
  const widthOutput = [
    dockSize,
    dockSize * (dockMag * 0.55),
    dockSize * (dockMag * 0.75),
    dockSize * dockMag,
    dockSize * (dockMag * 0.75),
    dockSize * (dockMag * 0.55),
    dockSize,
  ]
  const beyondTheDistanceLimit = distanceLimit + 1

  const distance = ref(beyondTheDistanceLimit)
  const getWidthFromDistance = interpolate(distanceInput, widthOutput)
  const widthPX = reactive({
    width: getWidthFromDistance(distance.value),
  })
  const { set } = useSpring(widthPX, {
    stiffness: 1700,
    damping: 90,
  })
  const width = computed(() => `${widthPX.width / 16}rem`)

  useRafFn(() => {
    const el = refImg.value
    if (el && props.mouseX !== null) {
      const rect = el.getBoundingClientRect()
      const imgCenterX = rect.left + rect.width / 2
      const distanceDelta = props.mouseX - imgCenterX
      distance.value = distanceDelta
    } else {
      distance.value = beyondTheDistanceLimit
    }
    set({ width: getWidthFromDistance(distance.value) })
  }, { immediate: true })
  return width
}

const width = useDockHoverAnimation()
function click() {
  if (props.desktop || props.id === 'launchpad') {
    appStore.openApp(props.id)
  }
}
</script>

<template>
  <li
    :id="`dock-${props.id}`"
    hstack flex-col justify-end mb1
    transition duration-150 ease-in origin-bottom
    @click="click"
  >
    <p class="tooltip absolute px-3 py-1 rounded-md text-sm c-text-black c-bg-300/80">
      {{ title }}
    </p>
    <a v-if="props.link" :href="props.link" target="_blank" rel="noreferrer">
      <img
        ref="refImg"
        w12
        :src="props.img"
        :alt="props.title"
        :title="props.title"
        :draggable="false"
        :style="winWidth < 640 ? {} : { width, willChange: 'width' }"
      >
    </a>
    <img
      v-else
      ref="refImg"
      w12
      :src="props.img"
      :alt="props.title"
      :title="props.title"
      :draggable="false"
      :style="winWidth < 640 ? {} : { width, willChange: 'width' }"
    >
    <div
      :class="`h1 w1 m0 rounded-full c-bg-800 ${
        isOpen ? '' : 'invisible'
      }`"
    />
  </li>
</template>
