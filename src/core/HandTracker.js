import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export class HandTracker {
  constructor() {
    this.landmarker = null
    this.ready = false
  }

  async init() {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    )

    this.landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.7,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    this.ready = true
  }

  detect(videoElement) {
    if (!this.ready) return []
    const results = this.landmarker.detectForVideo(videoElement, performance.now())
    return results.landmarks ?? []
  }

  destroy() {
    this.landmarker?.close()
  }
}