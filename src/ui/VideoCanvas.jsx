import { useEffect } from 'react'
import { useCamera } from '../hooks/useCamera'
import { useHandPose } from '../hooks/useHandPose'

export function VideoCanvas() {
  const videoRef = useCamera()
  const { canvasRef, landmarks } = useHandPose(videoRef)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    canvas.width = video.clientWidth
    canvas.height = video.clientHeight

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    landmarks.forEach(hand => {
      hand.forEach(point => {
        const x = (1 - point.x) * canvas.width
        const y = point.y * canvas.height

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = '#00ff88'
        ctx.fill()
      })
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