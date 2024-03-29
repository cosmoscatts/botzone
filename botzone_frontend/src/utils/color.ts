import { composite } from 'seemly'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

const ALPHA = 0.8

export type RGBA = [number, number, number, number]
export type RGB = [number, number, number]

export function createHoverColor(color: string | RGB | RGBA) {
  return composite(color, [255, 255, 255, 0.12])
}

export function createPressedColor(color: string | RGB | RGBA) {
  return composite(color, [0, 0, 0, 0.15])
}

export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

export function createPrimaryColor(primaryColor: string) {
  return {
    primaryColor,
    primaryColorHover: createHoverColor(primaryColor),
    primaryColorPressed: createPressedColor(primaryColor),
    primaryColorSuppl: addColorAlpha(primaryColor, ALPHA),
  }
}
