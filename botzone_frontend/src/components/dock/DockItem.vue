<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  img: string
  mouseX: number
  desktop: boolean
  openApp: (id: string) => void
  isOpen: boolean
  link?: string
  dockSize: number
  dockMag: number
}>()

const refImg = ref()

// const useDockHoverAnimation = (
//   mouseX: number,
//   ref: RefObject<HTMLImageElement>,
//   dockSize: number,
//   dockMag: number,
// ) => {
//   const distanceLimit = dockSize * 6
//   const distanceInput = [
//     -distanceLimit,
//     -distanceLimit / (dockMag * 0.65),
//     -distanceLimit / (dockMag * 0.85),
//     0,
//     distanceLimit / (dockMag * 0.85),
//     distanceLimit / (dockMag * 0.65),
//     distanceLimit,
//   ]
//   const widthOutput = [
//     dockSize,
//     dockSize * (dockMag * 0.55),
//     dockSize * (dockMag * 0.75),
//     dockSize * dockMag,
//     dockSize * (dockMag * 0.75),
//     dockSize * (dockMag * 0.55),
//     dockSize,
//   ]
//   const beyondTheDistanceLimit = distanceLimit + 1

//   const distance = useMotionValue(beyondTheDistanceLimit)
//   const widthPX = useSpring(
//     useTransform(distance, distanceInput, widthOutput),
//     {
//       stiffness: 1700,
//       damping: 90,
//     },
//   )

//   const width = useTransform(widthPX, width => `${width / 16}rem`)

//   useRaf(() => {
//     const el = ref.current
//     const mouseXVal = mouseX.get()
//     if (el && mouseXVal !== null) {
//       const rect = el.getBoundingClientRect()
//       const imgCenterX = rect.left + rect.width / 2
//       // difference between the x coordinate value of the mouse pointer
//       // and the img center x coordinate value
//       const distanceDelta = mouseXVal - imgCenterX
//       distance.set(distanceDelta)
//       return
//     }

//     distance.set(beyondTheDistanceLimit)
//   }, true)

//   return { width, widthPX }
// }

// const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag)
const width = ref(50)
const { width: winWidth } = useWindowSize()
const click = () => {
  if (props.desktop || props.id === 'launchpad') {
    props.openApp(props.id)
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
      {title}
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
