export class BaseFilter {
  apply(ctx, imageData, canvasWidth, canvasHeight) {
    throw new Error(`${this.constructor.name} debe implementar apply()`)
  }

  get name() {
    throw new Error(`${this.constructor.name} debe implementar name`)
  }
}