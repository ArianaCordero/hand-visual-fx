import { BaseFilter } from './BaseFilter'

const CHARS = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' ']

export class AsciiFilter extends BaseFilter {
  get name() { return 'ASCII' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    const cellSize = 10
    const cols = Math.floor(canvasWidth / cellSize)
    const rows = Math.floor(canvasHeight / cellSize)

    const offscreen = document.createElement('canvas')
    offscreen.width = cols
    offscreen.height = rows
    const off = offscreen.getContext('2d')
    off.drawImage(sourceVideo, 0, 0, cols, rows)
    const data = off.getImageData(0, 0, cols, rows).data

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.font = `bold ${cellSize}px monospace`
    ctx.textBaseline = 'top'

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = (row * cols + col) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
        const char = CHARS[Math.floor(brightness * (CHARS.length - 1))]

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillText(char, col * cellSize, row * cellSize)
      }
    }
  }
}