'use client'
import { useState, useEffect } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
  opacity: number
}

export default function Particles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 8,
        color: ['#8B5CF6', '#22D3EE', '#F43F5E', '#A78BFA'][
          Math.floor(Math.random() * 4)
        ],
        opacity: Math.random() * 0.4 + 0.1,
      }))
    )
  }, [count])

  if (particles.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}80`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
