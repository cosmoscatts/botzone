import type { Component } from 'vue'

export interface AppData {
  id: string
  title: string
  desktop: boolean
  img: string
  show?: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  content?: Component
  link?: string
}
