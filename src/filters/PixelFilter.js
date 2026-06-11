import { BaseFilter } from './BaseFilter'

export class PixelFilter extends BaseFilter {
  get name() { return 'Pixel' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    const size = 16
    const w = canvasWidth / size
    const h = canvasHeight / size

    ctx.filter = 'saturate(2) contrast(1.3)'
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(sourceVideo, 0, 0, w, h)
    ctx.drawImage(ctx.canvas, 0, 0, w, h, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'
    ctx.imageSmoothingEnabled = true
  }
}