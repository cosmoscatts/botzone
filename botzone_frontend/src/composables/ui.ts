import type { GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { commonDark, commonLight } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
// import { createPrimaryColor } from '~/utils'
// import { APP_LAYOUT_PARAMS } from '~/shared'

// ----- Theme -----

const THEME_MODE_KEY = 'THEME_MODE'
localStorage.setItem(THEME_MODE_KEY, 'light')
export const isDark = useDark({
  storageKey: THEME_MODE_KEY,
  valueDark: 'dark',
  valueLight: 'light',
})
export const toggleDark = useToggle(isDark)

// ----- 响应式 -----

export function useResponsive() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const isPC = breakpoints.greaterOrEqual('sm')
  const labelHidden = breakpoints.smaller('md') // 隐藏 [form label]
  return {
    breakpoints,
    isMobile,
    isPC,
    labelHidden,
  }
}

// ----- Color -----

const colorPropertyMap: { [key: string]: string } = {
  primaryColor: '--primary-color',
  primaryColorHover: '--primary-color-hover',
  primaryColorPressed: '--primary-color-pressed',
  primaryColorSuppl: '--primary-color-suppl',
  infoColor: '--info-color',
  infoColorHover: '--info-color-hover',
  infoColorPressed: '--info-color-pressed',
  infoColorSuppl: '--info-color-suppl',
  warningColor: '--warning-color',
  warningColorHover: '--warning-color-hover',
  warningColorPressed: '--warning-color-pressed',
  warningColorSuppl: '--warning-color-suppl',
  errorColor: '--error-color',
  errorColorHover: '--error-color-hover',
  errorColorPressed: '--error-color-pressed',
  errorColorSuppl: '--error-color-suppl',
  successColor: '--success-color',
  successColorHover: '--success-color-hover',
  successColorPressed: '--success-color-pressed',
  successColorSuppl: '--success-color-suppl',
}

export function writeThemeColorsToBody() {
  // const overrides = createPrimaryColor(APP_LAYOUT_PARAMS.primaryColor)

  const colors: ThemeCommonVars = isDark.value
    ? commonDark
    : commonLight
  const mergedColors = {
    ...colors,
    // ...overrides,
  }
  Object.entries(colorPropertyMap).forEach(([key, value]) => {
    document.body.style.setProperty(value, mergedColors[key as keyof ThemeCommonVars])
  })
}

watch(isDark, writeThemeColorsToBody)

// ----- Content Height -----

// const { navHeight, footHeight, contentPadding } = APP_LAYOUT_PARAMS
// export const diffHeight = computed(() => navHeight + footHeight + contentPadding * 2 + 1 + 1 + 3)
