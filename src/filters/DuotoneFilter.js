import { BaseFilter } from './BaseFilter'

export class DuotoneFilter extends BaseFilter {
  get name() { return 'Duotone' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    ctx.filter = 'grayscale(1) contrast(1.3) brightness(0.9)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = '#0a3d8f'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.globalCompositeOperation = 'screen'
    ctx.fillStyle = '#e8f4ff'
    ctx.globalAlpha = 0.15
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}