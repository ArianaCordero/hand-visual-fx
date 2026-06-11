import { useEffect, useRef } from 'react'
import { useCamera } from '../hooks/useCamera'
import { useHandPose } from '../hooks/useHandPose'
import { getFingerZones, sortHandsByPosition, polygonArea } from '../utils/geometry'
import { FilterEngine } from '../core/FilterEngine'

const MIN_ZONE_AREA = 4000
const engines = [
  new FilterEngine(0),
  new FilterEngine(1),
  new FilterEngine(2),
  new FilterEngine(3),
]

export function VideoCanvas() {
  const videoRef = useCamera()
  const { canvasRef, landmarks } = useHandPose(videoRef)
  const offscreenRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const w = video.videoWidth || video.clientWidth
    const h = video.videoHeight || video.clientHeight

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement('canvas')
    }
    const offscreen = offscreenRef.current
    offscreen.width = w
    offscreen.height = h

    const offCtx = offscreen.getContext('2d')
    offCtx.translate(w, 0)
    offCtx.scale(-1, 1)
    offCtx.drawImage(video, 0, 0, w, h)
    offCtx.setTransform(1, 0, 0, 1, 0, 0)

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, w, h)

    if (landmarks.length < 2) return

    const sorted = sortHandsByPosition(landmarks)
    const zones = getFingerZones(sorted[0], sorted[1], w, h)

    zones.forEach((zone, i) => {
      const area = polygonArea(zone)
      if (area < MIN_ZONE_AREA) return

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(zone[0].x, zone[0].y)
      zone.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(offscreen, 0, 0, w, h)
      engines[i].apply(ctx, offscreen, w, h)

      ctx.restore()
    })

  }, [landmarks, canvasRef, videoRef])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}