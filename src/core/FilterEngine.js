import { HalftoneFilter } from '../filters/HalftoneFilter'
import { AsciiFilter } from '../filters/AsciiFilter'
import { PixelSortFilter } from '../filters/PixelSortFilter'
import { RingsFilter } from '../filters/RingsFilter'

const FILTERS = [
  new HalftoneFilter(),
  new AsciiFilter(),
  new PixelSortFilter(),
  new RingsFilter(),
]

export class FilterEngine {
  constructor(initialIndex = 0) {
    this.currentIndex = initialIndex
  }

  apply(ctx, sourceVideo, canvasWidth, canvasHeight) {
    FILTERS[this.currentIndex].apply(ctx, sourceVideo, canvasWidth, canvasHeight)
  }
}