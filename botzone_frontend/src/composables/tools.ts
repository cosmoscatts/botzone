import dayjs from 'dayjs'
import lodash from 'lodash'

import { G, R } from '~/utils'

const isDevelopment = import.meta.env.MODE === 'development'

export {
  dayjs,
  lodash,
  isDevelopment,
  R,
  G,
}

// ----- 格式化时间 -----

export function formatDate({
  date = new Date(),
  pattern = 'YYYY-MM-DD HH:mm:ss',
}: {
  date?: Date | string | number
  pattern?: string
}): string {
  return dayjs(date).format(pattern)
}

// ----- Confirm 确认框 -----

export function useConfirm(content: string, onPositiveClick: (e: MouseEvent) => unknown) {
  $dialog.warning({
    title: '警告',
    content,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick,
  })
}

// ----- Clone -----

export const useClone = <T = any>(data: T) => JSON.parse(JSON.stringify(data))
