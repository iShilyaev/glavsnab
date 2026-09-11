import { useEffect, useState } from 'react'

export default function Odometer({ value, duration = 1400 }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    function frame(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <>{shown.toLocaleString('ru-RU')}</>
}
