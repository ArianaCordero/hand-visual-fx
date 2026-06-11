import { BaseFilter } from './BaseFilter'

export class PunkFilter extends BaseFilter {
  constructor() {
    super()
    this.tick = 0
  }

  get name() { return 'Punk' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    this.tick++

    ctx.filter = 'grayscale(1) contrast(4) brightness(0.8)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.globalCompositeOperation = 'multiply'
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
    gradient.addColorStop(0, '#ff006e')
    gradient.addColorStop(0.5, '#8338ec')
    gradient.addColorStop(1, '#ffbe0b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.globalCompositeOperation = 'source-over'

    if (this.tick % 3 === 0) {
      const lineCount = Math.floor(Math.random() * 6) + 3
      for (let i = 0; i < lineCount; i++) {
        const y = Math.random() * canvasHeight
        const h = Math.random() * 4 + 1
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`
        ctx.fillRect(0, y, canvasWidth, h)
      }
    }

    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = 0.08
    for (let y = 0; y < canvasHeight; y += 3) {
      ctx.fillStyle = y % 6 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      ctx.fillRect(0, y, canvasWidth, 1)
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}