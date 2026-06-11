import { useEffect, useRef, useState } from 'react'
import { HandTracker } from '../core/HandTracker'

export function useHandPose(videoRef) {
  const canvasRef = useRef(null)
  const trackerRef = useRef(null)
  const animFrameRef = useRef(null)
  const [landmarks, setLandmarks] = useState([])

  useEffect(() => {
    const tracker = new HandTracker()
    trackerRef.current = tracker

    async function start() {
      console.log('Iniciando HandTracker...')
      await tracker.init()
      console.log('HandTracker listo!')

      function loop() {
        const video = videoRef.current
        if (video && video.readyState === 4) {
          const detected = tracker.detect(video)
          if (detected.length > 0) {
            console.log('Manos detectadas:', detected.length)
          }
          setLandmarks(detected)
        }
        animFrameRef.current = requestAnimationFrame(loop)
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    start()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      trackerRef.current?.destroy()
    }
  }, [videoRef])

  return { canvasRef, landmarks }
}