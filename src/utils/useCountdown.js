import { useEffect, useRef, useState } from 'react'

export default function useCountdown(minutes) {
  const total = minutes * 60
  const [left, setLeft] = useState(total)
  const raf = useRef()

  useEffect(() => {
    let start = Date.now()
    function loop() {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const next = Math.max(0, total - elapsed)
      setLeft(next)
      if (next > 0) raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [total])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return { left, display: `${mm}:${ss}` }
}
