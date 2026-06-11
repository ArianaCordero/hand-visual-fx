import { BaseFilter } from './BaseFilter'

export class ChromaFilter extends BaseFilter {
  constructor() {
    super()
    this.tick = 0
  }

  get name() { return 'Chroma' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    this.tick += 3

    ctx.filter = `hue-rotate(${this.tick}deg) saturate(4) contrast(1.4)`
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'
  }
}