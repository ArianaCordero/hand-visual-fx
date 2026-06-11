import { useEffect, useRef } from 'react'

export function useCamera() {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream

    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return videoRef
}