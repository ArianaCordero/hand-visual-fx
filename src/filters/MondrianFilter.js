import { BaseFilter } from './BaseFilter'

export class MondrianFilter extends BaseFilter {
  constructor() {
    super()
    this.blocks = null
    this.lastGenerated = 0
  }

  get name() { return 'Mondrian' }

  generateBlocks(canvasWidth, canvasHeight) {
    const blocks = []
    const cols = 6
    const rows = 4
    const w = canvasWidth / cols
    const h = canvasHeight / rows

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const span = Math.random() > 0.7 ? 2 : 1
        blocks.push({
          x: col * w,
          y: row * h,
          w: w * span,
          h: h * (Math.random() > 0.6 ? 2 : 1),
          srcX: Math.random() * canvasWidth * 0.5,
          srcY: Math.random() * canvasHeight * 0.5,
        })
      }
    }
    return blocks
  }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    const now = Date.now()
    if (!this.blocks || now - this.lastGenerated > 800) {
      this.blocks = this.generateBlocks(canvasWidth, canvasHeight)
      this.lastGenerated = now
    }

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    this.blocks.forEach(block => {
      ctx.drawImage(
        sourceVideo,
        block.srcX, block.srcY, block.w, block.h,
        block.x, block.y, block.w, block.h
      )
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 4
      ctx.strokeRect(block.x, block.y, block.w, block.h)
    })

    ctx.globalCompositeOperation = 'multiply'
    ctx.globalAlpha = 0.3
    const colors = ['#ff0000', '#0000ff', '#ffff00']
    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(
        (canvasWidth / 3) * i, 0,
        canvasWidth / 3, canvasHeight
      )
    })
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}