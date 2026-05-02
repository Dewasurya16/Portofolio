'use client'
import { useState, useEffect } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  color: string
  opacity: number
}

export default function StarField({ count = 30 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 1.5 : 2.5,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        color:
          Math.random() > 0.75
            ? Math.random() > 0.5
              ? '#8B5CF6'
              : '#22D3EE'
            : '#ffffff',
        opacity: 0.25 + Math.random() * 0.55,
      }))
    )
  }, [count])

  if (stars.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full star-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: s.size > 1.5 ? `0 0 ${s.size * 3}px ${s.color}` : 'none',
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  )
}
