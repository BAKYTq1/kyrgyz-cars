
import { useState, useEffect } from 'react'

export function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const d = Math.floor(timeLeft / 86400)
  const h = Math.floor((timeLeft % 86400) / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)
  const s = timeLeft % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1 text-sm font-semibold">
      <span>{d} d</span>
      <span className="text-gray-400">:</span>
      <span>{pad(h)} h</span>
      <span className="text-gray-400">:</span>
      <span>{pad(m)} min</span>
      <span className="text-gray-400">:</span>
      <span>{pad(s)} sec</span>
    </div>
  )
}