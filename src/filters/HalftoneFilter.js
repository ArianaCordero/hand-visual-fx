import { BaseFilter } from './BaseFilter'

export class HalftoneFilter extends BaseFilter {
  get name() { return 'Halftone' }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    const spacing = 18
    const offscreen = document.createElement('canvas')
    offscreen.width = canvasWidth
    offscreen.height = canvasHeight
    const off = offscreen.getContext('2d')

    off.filter = 'grayscale(1) contrast(1.4)'
    off.drawImage(sourceVideo, 0, 0, canvasWidth, canvasHeight)

    const data = off.getImageData(0, 0, canvasWidth, canvasHeight).data

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    for (let y = spacing / 2; y < canvasHeight; y += spacing) {
      for (let x = spacing / 2; x < canvasWidth; x += spacing) {
        const i = (Math.floor(y) * canvasWidth + Math.floor(x)) * 4
        const brightness = data[i] / 255
        const radius = (1 - brightness) * (spacing / 2) * 1.2

        if (radius > 0.5) {
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = '#cc0000'
          ctx.fill()
        }
      }
    }
  }
}