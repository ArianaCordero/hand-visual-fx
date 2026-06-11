import { BaseFilter } from './BaseFilter'

export class RingsFilter extends BaseFilter {
  constructor() {
    super()
    this.tick = 0
  }

  get name() { return 'Rings' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    this.tick += 0.08
    const cellSize = 22
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

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = (row * cols + col) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255

        const cx = col * cellSize + cellSize / 2
        const cy = row * cellSize + cellSize / 2
        const maxRadius = (cellSize / 2) * 0.95
        const rings = 3

        for (let ring = rings; ring >= 1; ring--) {
          const phase = this.tick + brightness * Math.PI * 2
          const pulse = Math.sin(phase + ring * 0.8) * 0.15 + 0.85
          const radius = (ring / rings) * maxRadius * brightness * pulse

          if (radius < 0.5) continue

          const hue = (r * 0.5 + g * 0.3 + b * 0.2 + this.tick * 30) % 360
          const lightness = 40 + brightness * 40

          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }
    }
  }
}