import { BaseFilter } from './BaseFilter'

export class PixelSortFilter extends BaseFilter {
  get name() { return 'PixelSort' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    const size = 14

    ctx.imageSmoothingEnabled = false

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = Math.floor(canvasWidth / size)
    tempCanvas.height = Math.floor(canvasHeight / size)
    const tempCtx = tempCanvas.getContext('2d')
    tempCtx.imageSmoothingEnabled = false
    tempCtx.drawImage(sourceVideo, 0, 0, tempCanvas.width, tempCanvas.height)

    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvasWidth, canvasHeight)

    ctx.imageSmoothingEnabled = true
  }
}