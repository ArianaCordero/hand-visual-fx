import { BaseFilter } from './BaseFilter'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'

export class MatrixFilter extends BaseFilter {
  constructor() {
    super()
    this.columns = []
    this.initialized = false
    this.tick = 0
  }

  get name() { return 'Matrix' }

  init(canvasWidth, canvasHeight) {
    const cellSize = 14
    const cols = Math.floor(canvasWidth / cellSize)
    this.cellSize = cellSize
    this.columns = Array.from({ length: cols }, () => ({
      y: Math.random() * canvasHeight,
      speed: Math.random() * 3 + 1,
    }))
    this.initialized = true
  }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    if (!this.initialized) this.init(canvasWidth, canvasHeight)
    this.tick++

    ctx.filter = 'grayscale(1) brightness(0.4)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.font = `bold ${this.cellSize}px monospace`
    ctx.textBaseline = 'top'

    this.columns.forEach((col, i) => {
      const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
      const x = i * this.cellSize

      ctx.fillStyle = '#00ff41'
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 8
      ctx.fillText(char, x, col.y)

      ctx.fillStyle = '#ffffff'
      ctx.shadowBlur = 12
      ctx.fillText(char, x, col.y)

      col.y += col.speed * 2
      if (col.y > canvasHeight) {
        col.y = 0
        col.speed = Math.random() * 3 + 1
      }
    })

    ctx.shadowBlur = 0
  }
}