export interface HTMLAudioState {
  volume: number
  playing: boolean
}

export interface HTMLAudioProps {
  src: string
  autoReplay?: boolean
}

export function useAudio(props: HTMLAudioProps) {
  const element = new Audio(props.src)
  const refEl = ref<HTMLAudioElement>(element)

  const state = reactive<HTMLAudioState>({
    volume: 1,
    playing: false,
  })

  const controls = {
    play: (): Promise<void> | void => {
      const el = refEl.value
      if (el) {
        state.playing = true
        return el.play()
      }
    },

    pause: (): Promise<void> | void => {
      const el = refEl.value
      if (el) {
        state.playing = false
        return el.pause()
      }
    },

    toggle: (): Promise<void> | void => {
      const el = refEl.value
      if (el) {
        const promise = state.playing ? el.pause() : el.play()
        state.playing = !state.playing
        return promise
      }
    },

    volume: (value: number): void => {
      const el = refEl.value
      if (el) {
        value = Math.min(1, Math.max(0, value))
        el.volume = value
        state.volume = value
      }
    },
  }

  const handler = () => {
    if (props.autoReplay) controls.play()
  }
  watch(() => props.autoReplay, () => element.addEventListener('ended', handler))
  onUnmounted(() => element.removeEventListener('ended', handler))

  watch(() => props.src, () => {
    const el = refEl.value
    if (!el) return
    state.volume = el.volume
    state.playing = !el.paused
  })

  return [element, state, controls, refEl] as const
}
