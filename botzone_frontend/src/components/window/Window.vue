<script setup lang="ts">
const props = defineProps<{
  id: string
  max: boolean
  min: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  title: string
  z: number
}>()

const [MIN_MARGIN_X, MIN_MARGIN_Y] = [100, 32]
const appStore = useAppStore()
const dockStore = useDockStore()
const { width: winWidth, height: winHeight } = useWindowSize()

const initWidth = Math.min(winWidth.value, props.width ? props.width : 640)
const initHeight = Math.min(winHeight.value, props.height ? props.height : 400)

const state = reactive({
  width: initWidth,
  height: initHeight,
  x: winWidth.value + Math.random() * (winWidth.value - initWidth),
  y: Math.random() * (winHeight.value - initHeight - MIN_MARGIN_Y),
})

const refEl = ref<HTMLElement | null>(null)
const refTrigger = ref<HTMLElement | null>(null)

function getPosition() {
  return [
    Math.min(
      winWidth.value * 2 - MIN_MARGIN_X,
      Math.max(
        winWidth.value - state.width + MIN_MARGIN_X,
        state.x,
      ),
    ),
    Math.min(
      winHeight.value - MIN_MARGIN_Y - (dockStore.size + 15 + MIN_MARGIN_Y),
      Math.max(0, state.y),
    ),
  ]
}
const [calcPosX, calcPosY] = getPosition()
const { x, y } = useDraggable(refEl, {
  initialValue: {
    x: calcPosX,
    y: calcPosY,
  },
  exact: true,
  preventDefault: true,
  handle: refTrigger,
})
watch(() => props.max, (val) => {
  x.value = val
    ? winWidth.value
    : calcPosX
  y.value = val
    ? -MIN_MARGIN_Y
    : calcPosY
})

// useResizeObserver(refEl, (entries) => {
//   const entry = entries[0]
//   const { width, height } = entry.contentRect
//   state.width = width
//   state.height = height
// })

watch([winWidth, winHeight], ([_width, _height]) => {
  state.width = Math.min(_width, state.width)
  state.height = Math.min(_height, state.height)
})

const round = computed(() => props.max ? 'rounded-none' : 'rounded-lg')
const minimized = computed(() => {
  return props.min
    ? 'op0 invisible transition-opacity duration-300'
    : ''
})
const border = computed(() => props.max ? '' : 'border border-gray-500/30')
const width = computed(() => props.max ? winWidth.value : state.width)
const height = computed(() => props.max ? winHeight.value : state.height)

function setWindowPosition(id: string): void {
  const r = document.querySelector(`#window-${id}`) as HTMLElement
  const rect = r.getBoundingClientRect()
  r.style.setProperty(
    '--window-transform-x',
    `${(window.innerWidth + rect.x).toFixed(1).toString()}px`,
  )
  r.style.setProperty(
    '--window-transform-y',
    `${(rect.y - MIN_MARGIN_Y).toFixed(1).toString()}px`,
  )
}

function setAppMax(id: string, target?: boolean) {
  const maxApps = appStore.maxApps
  if (target === undefined) target = !maxApps[id]
  maxApps[id] = target
  appStore.setMaxApps(maxApps)
  appStore.setHideDockAndTopbar(target)
}

function setAppMin(id: string, target?: boolean): void {
  const minApps = appStore.minApps
  if (target === undefined) target = !minApps[id]
  minApps[id] = target
  appStore.setMinApps(minApps)
  appStore.setHideDockAndTopbar(target)
}

function minimizeApp(id: string): void {
  setWindowPosition(id)

  let r = document.querySelector(`#dock-${id}`) as HTMLElement
  const dockAppRect = r.getBoundingClientRect()

  r = document.querySelector(`#window-${id}`) as HTMLElement
  const posY = window.innerHeight - r.offsetHeight / 2 - MIN_MARGIN_Y
  const posX = window.innerWidth + dockAppRect.x - r.offsetWidth / 2 + 25

  r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`
  r.style.transition = 'ease-out 0.5s'

  setAppMin(id, true)
}

function closeApp(id: string): void {
  setAppMax(id, false)
  const showApps = appStore.showApps
  showApps[id] = false
  appStore.setShowApps(showApps)
  appStore.setHideDockAndTopbar(false)
}
</script>

<template>
  <div
    :id="`window-${props.id}`"
    ref="refEl"
    :class="`absolute ${round} overflow-hidden bg-transparent wfull hfull ${border} shadow-lg shadow-black/30 ${minimized}`"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      minWidth: `${props.minWidth ?? 200}px`,
      minHeight: `${props.minHeight ?? 150}px`,
      zIndex: props.z,
      left: `${x}px`,
      top: `${y}px`,
    }"
    @mousedown="appStore.openApp(props.id)"
  >
    <div
      ref="refTrigger"
      class="window-bar relative h6 text-center c-bg-200"
      @doubleclick="() => setAppMax(props.id)"
    >
      <TrafficLights
        :id="props.id"
        :max="props.max"
        @set-max="setAppMax"
        @set-min="minimizeApp"
        @close="closeApp"
      />
      <span font-semibold c-text-700>{{ props.title }}</span>
    </div>
    <div class="inner-window w-full of-y-hidden">
      <slot />
    </div>
  </div>
</template>
