import { BaseFilter } from './BaseFilter'

export class ThermalFilter extends BaseFilter {
  get name() { return 'Thermal' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    ctx.filter = 'saturate(0) contrast(1.5) brightness(1.1)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = '#00ff44'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = 0.5
    ctx.filter = 'saturate(0) contrast(3) brightness(2)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}