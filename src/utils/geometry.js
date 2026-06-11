const FINGER_PAIRS = [
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 20],
]

export function landmarksToCanvas(landmarks, canvasWidth, canvasHeight) {
  return landmarks.map(p => ({
    x: (1 - p.x) * canvasWidth,
    y: p.y * canvasHeight,
  }))
}

export function sortHandsByPosition(landmarks) {
  if (landmarks.length < 2) return landmarks
  const centerA = landmarks[0].reduce((sum, p) => sum + p.x, 0) / landmarks[0].length
  const centerB = landmarks[1].reduce((sum, p) => sum + p.x, 0) / landmarks[1].length
  return centerA > centerB ? [landmarks[0], landmarks[1]] : [landmarks[1], landmarks[0]]
}

export function getFingerZones(leftHand, rightHand, canvasWidth, canvasHeight) {
  const left = landmarksToCanvas(leftHand, canvasWidth, canvasHeight)
  const right = landmarksToCanvas(rightHand, canvasWidth, canvasHeight)

  return FINGER_PAIRS.map(([a, b]) => [
    right[a],
    right[b],
    left[b],
    left[a],
  ])
}

export function polygonArea(points) {
  let area = 0
  const n = points.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += points[i].x * points[j].y
    area -= points[j].x * points[i].y
  }
  return Math.abs(area / 2)
}