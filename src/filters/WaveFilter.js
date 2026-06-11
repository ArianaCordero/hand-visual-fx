import { BaseFilter } from './BaseFilter'

export class WaveFilter extends BaseFilter {
  constructor() {
    super()
    this.tick = 0
  }

  get name() { return 'Wave' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    this.tick += 0.04
    const steps = 12
    const sliceH = canvasHeight / steps

    ctx.filter = 'saturate(3) hue-rotate(180deg)'

    for (let i = 0; i < steps; i++) {
      const offsetX = Math.sin(i * 0.8 + this.tick) * 18
      const sy = i * sliceH
      ctx.drawImage(
        sourceVideo,
        0, sy, canvasWidth, sliceH,
        offsetX, sy, canvasWidth, sliceH
      )
    }

    ctx.filter = 'none'
  }
}