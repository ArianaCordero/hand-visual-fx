import { BaseFilter } from './BaseFilter'

export class GlitchFilter extends BaseFilter {
  get name() { return 'Glitch' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    ctx.filter = 'saturate(4) hue-rotate(80deg) contrast(2)'
    ctx.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'

    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = 0.6
    ctx.filter = 'saturate(5) hue-rotate(40deg) contrast(3) brightness(1.4)'
    ctx.drawImage(sourceVideo, Math.random() * 8 - 4, 0, canvasWidth, canvasHeight)
    ctx.filter = 'none'
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}