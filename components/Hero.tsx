'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'

const roles = ['Pranata Komputer', 'UI/UX Designer', 'Front-End Developer', 'React & Next.js Dev']
const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:email@email.com', label: 'Email' },
]

// Floating particles component
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    color: ['#8B5CF6', '#22D3EE', '#F43F5E', '#A78BFA'][Math.floor(Math.random() * 4)],
    opacity: Math.random() * 0.5 + 0.1,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -80, 0], x: [0, Math.random() * 40 - 20, 0], opacity: [p.opacity, p.opacity * 1.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Word-by-word reveal
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.08, duration: 0.5, ease: 'easeOut' }}>
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Cursor glow that follows mouse
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`
        ref.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
      style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setRoleIdx((p) => (p + 1) % roles.length), 2800)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark noise">
      <CursorGlow />
      <div className="absolute inset-0 grid-pattern opacity-100" />
      <Particles />

      {/* Glow blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[700px] h-[700px] -top-32 -right-20 opacity-70" />
      <motion.div animate={{ scale: [1, 1.1, 1], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="blob-cyan w-[500px] h-[500px] bottom-0 -left-20 opacity-60" />
      <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="blob-rose w-[300px] h-[300px] top-1/3 left-1/3 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet/20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              <Sparkles size={13} className="text-violet" />
            </motion.div>
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">Available for work</span>
            <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </motion.div>

          {/* Heading */}
          <h1 className="font-display font-bold text-5xl lg:text-7xl xl:text-8xl text-text-main leading-[1.05] mb-4">
            <AnimatedText text="Halo, Saya" delay={0.2} />{' '}
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
              className="gradient-text block lg:inline">
              Nama Anda
            </motion.span>
          </h1>

          {/* Animated role with underline */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="h-10 mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p key={roleIdx} initial={{ y: 36, opacity: 0, filter: 'blur(8px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -36, opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-xl lg:text-2xl text-text-muted font-medium">
                {roles[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="text-text-muted text-base lg:text-lg leading-relaxed max-w-lg mb-10">
            Merancang antarmuka yang memukau dan membangun aplikasi web berkinerja tinggi menggunakan teknologi modern.
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            className="flex flex-wrap gap-4 mb-10">
            <motion.a href="#projects" whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(139,92,246,0.7)' }} whileTap={{ scale: 0.97 }}
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold">
              Lihat Proyek <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}><ArrowDown size={15} /></motion.span>
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.06, borderColor: 'rgba(139,92,246,0.6)' }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-text-main text-sm font-semibold transition-all duration-300">
              Kontak Saya
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }, i) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -4, scale: 1.2 }} whileTap={{ scale: 0.95 }}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-text-muted hover:text-violet-light border border-transparent hover:border-violet/30 transition-all duration-300"
                aria-label={label}>
                <Icon size={18} />
              </motion.a>
            ))}
            <span className="w-12 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-xs text-text-faint tracking-widest uppercase">Follow</span>
          </motion.div>
        </div>

        {/* Right — Card */}
        <motion.div initial={{ opacity: 0, x: 60, rotateY: -15 }} animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }} className="hidden lg:flex justify-center items-center">
          <div className="relative w-80 xl:w-96">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass-md rounded-3xl p-8 z-10 gradient-border">
              <div className="w-24 h-24 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/20 flex items-center justify-center border border-violet/20 relative overflow-hidden">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-2xl border-2 border-dashed border-violet/20" />
                <span className="font-display text-3xl font-bold gradient-text relative z-10">YN</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-text-main text-center mb-1">Nama Anda</h3>
              <p className="text-sm text-text-muted text-center mb-6">Pranata Komputer</p>
              <div className="space-y-4">
                {[
                  { skill: 'UI/UX Design', pct: 90, color: '#8B5CF6' },
                  { skill: 'React / Next.js', pct: 85, color: '#22D3EE' },
                  { skill: 'TypeScript', pct: 80, color: '#A78BFA' },
                  { skill: 'Figma', pct: 92, color: '#F43F5E' },
                ].map(({ skill, pct, color }, i) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-text-muted font-medium">{skill}</span>
                      <span style={{ color }} className="font-bold">{pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.9 + i * 0.15, duration: 1.4, ease: 'easeOut' }}
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}>
                        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 + i * 0.3 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating badges */}
            {[
              { value: '3+', label: 'Tahun Exp.', pos: { top: '-24px', right: '-16px' }, delay: 3 },
              { value: '20+', label: 'Proyek', pos: { bottom: '-24px', left: '-16px' }, delay: 5 },
              { value: '100%', label: 'Dedicated', pos: { top: '40%', left: '-64px' }, delay: 4 },
            ].map((badge, i) => (
              <motion.div key={badge.label}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
                className="absolute glass-md rounded-2xl px-4 py-3 text-center border border-white/10 shadow-card z-20"
                style={badge.pos}>
                <p className="font-display font-bold text-lg gradient-text">{badge.value}</p>
                <p className="text-[10px] text-text-faint">{badge.label}</p>
              </motion.div>
            ))}

            <div className="absolute -inset-4 rounded-[36px] border border-violet/10 -z-10" />
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-[44px] border border-dashed border-cyan/10 -z-10" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-faint hover:text-violet transition-colors">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-current rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full" />
        </motion.div>
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.a>
    </section>
  )
}
