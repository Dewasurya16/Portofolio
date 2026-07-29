'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Loader2 } from 'lucide-react'
import Image from 'next/image'
import StarField from './StarField'
import Particles from './Particles'
import BackgroundRockets from './Rocket'

const roles = ['Pranata Komputer', 'UI/UX Designer', 'Front-End Developer', 'React & Next.js Dev']
const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:email@email.com', label: 'Email' },
]



/* ── Shooting Stars ── */
function ShootingStars() {
  const meteors = useMemo(() => [
    { top: '8%', left: '5%', len: 160, delay: 0, repeatDelay: 9, dur: 1.2 },
    { top: '22%', left: '55%', len: 120, delay: 3, repeatDelay: 11, dur: 1.0 },
    { top: '55%', left: '15%', len: 180, delay: 6, repeatDelay: 14, dur: 1.4 },
    { top: '70%', left: '70%', len: 100, delay: 1.5, repeatDelay: 10, dur: 0.9 },
    { top: '40%', left: '85%', len: 140, delay: 8, repeatDelay: 12, dur: 1.1 },
    { top: '15%', left: '35%', len: 90, delay: 12, repeatDelay: 16, dur: 0.8 },
  ], [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((m, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: m.top, left: m.left }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, m.len * 1.8, m.len * 2.5, m.len * 2.8], y: [0, 0, m.len * 0.9, m.len * 1.25, m.len * 1.4] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, repeatDelay: m.repeatDelay, ease: 'easeIn' }}
        >
          <div style={{
            width: `${m.len}px`, height: '1.5px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9) 60%, rgba(139,92,246,0.4))',
            transform: 'rotate(28deg)',
            transformOrigin: 'left center',
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.4)',
            borderRadius: '2px',
          }} />
          {/* Head glow */}
          <motion.div
            style={{
              position: 'absolute', top: '-2px', right: 0,
              width: 5, height: 5, borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 8px 3px rgba(139,92,246,0.8)',
              transform: 'rotate(28deg)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ── Constellation SVG ── */
function Constellation() {
  const nodes = useMemo(() => [
    { x: 75, y: 15 }, { x: 82, y: 28 }, { x: 70, y: 35 }, { x: 88, y: 42 },
    { x: 78, y: 55 }, { x: 65, y: 20 }, { x: 92, y: 20 }, { x: 85, y: 65 },
  ], [])
  const edges = [[0, 1], [1, 2], [1, 3], [3, 4], [0, 5], [3, 7], [1, 6]]

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18 }}>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
          x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
          stroke="url(#constellationGrad)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
          transition={{ delay: 1.5 + i * 0.2, duration: 1.5, ease: 'easeOut', opacity: { repeat: Infinity, duration: 4, repeatType: 'reverse' } }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={`${n.x}%`} cy={`${n.y}%`} r="1.5"
          fill="#8B5CF6"
          animate={{ opacity: [0.4, 1, 0.4], r: [1.5, 2.5, 1.5] }}
          transition={{ duration: 2.5 + i * 0.3, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <defs>
        <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  )
}



/* ── Cursor Glow ── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frameId = 0
    const move = (e: MouseEvent) => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        if (!ref.current) return
        ref.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', move)
    }
  }, [])
  return (
    <div ref={ref} className="pointer-events-none fixed z-0 hidden md:block"
      style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)', borderRadius: '50%', willChange: 'transform' }} />
  )
}

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

const ORBIT_DOTS = [
  { top: '-14px', left: '50%', tx: '-50%', color: '#8B5CF6', size: 8, dur: 4, del: 0 },
  { top: '50%', left: '100%', tx: '-50%', color: '#22D3EE', size: 6, dur: 5, del: 1 },
  { top: '100%', left: '30%', tx: '-50%', color: '#F43F5E', size: 7, dur: 4, del: 2 },
  { top: '20%', left: '-14px', tx: '0', color: '#A78BFA', size: 5, dur: 6, del: 0.5 },
  { top: '72%', left: '105%', tx: '-50%', color: '#8B5CF6', size: 4, dur: 5, del: 1.5 },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [aiGreeting, setAiGreeting] = useState<string | null>(null)
  const [isGeneratingGreeting, setIsGeneratingGreeting] = useState(false)

  const generateGreeting = async () => {
    if (isGeneratingGreeting) return;
    setIsGeneratingGreeting(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Berikan satu kalimat sapaan kreatif, keren, dan singkat (maksimal 15 kata) untuk menyambut pengunjung ke portofolio saya (Dewa Sinar Surya). Jangan gunakan tanda kutip.' }]
        })
      });
      const data = await response.json() as {
        data?: { message?: string }
      };
      if (response.ok && data.data?.message) {
        setAiGreeting(data.data.message.replace(/"/g, ''));
      }
    } catch {
      setAiGreeting(null)
    } finally {
      setIsGeneratingGreeting(false);
    }
  }

  useEffect(() => {
    const iv = setInterval(() => setRoleIdx((p) => (p + 1) % roles.length), 2800)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark noise">
      <CursorGlow />

      {/* Deep space background layers */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <StarField count={40} />
      <BackgroundRockets />
      <ShootingStars />
      <Constellation />
      <Particles count={15} />

      {/* Nebula blobs */}
      <motion.div animate={{ scale: [1, 1.18, 1], x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[800px] h-[800px] -top-40 -right-20 opacity-60" />
      <motion.div animate={{ scale: [1, 1.12, 1], y: [0, 35, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="blob-cyan w-[600px] h-[600px] bottom-0 -left-20 opacity-50" />
      <motion.div animate={{ scale: [1, 1.35, 1], rotate: [0, 180, 360] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="blob-rose w-[350px] h-[350px] top-1/3 left-1/3 opacity-30" />
      {/* Aurora blob — new */}
      <motion.div
        className="blob-aurora w-[600px] h-[300px] top-1/2 left-1/4 opacity-40 animate-nebula"
        style={{ transform: 'translateY(-50%)' }}
      />

      {/* Distant galaxy core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.04) 0%, rgba(34,211,238,0.03) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet/20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              <Sparkles size={13} className="text-violet" />
            </motion.div>
            <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">Available for work</span>
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 6px #34D399' }} />
          </motion.div>

          <h1 className="font-display font-bold text-4xl lg:text-6xl xl:text-7xl text-text-main leading-[1.1] mb-4">
            <AnimatedText text="Halo, Saya" delay={0.2} />{' '}
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
              className="gradient-text block lg:inline">
              Dewa Sinar Surya, S,Kom.
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="h-10 mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p key={roleIdx} initial={{ y: 36, opacity: 0, filter: 'blur(8px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -36, opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-xl lg:text-2xl font-medium"
                style={{ color: '#A78BFA' }}>
                ✦ {roles[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="text-text-muted text-base lg:text-lg leading-relaxed max-w-lg mb-10 relative">
            <AnimatePresence mode="wait">
              {aiGreeting ? (
                <motion.div key="ai" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl border border-violet/30 bg-violet/10 text-violet-light font-medium italic shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  ✨ {aiGreeting}
                </motion.div>
              ) : (
                <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Mengamankan jaringan dan infrastruktur IT di pagi hari, merakit aplikasi full-stack di malam hari. Passionate dalam merancang arsitektur database yang rapi dan antarmuka web yang memukau.
                </motion.p>
              )}
            </AnimatePresence>
            
            {!aiGreeting && (
              <button onClick={generateGreeting} disabled={isGeneratingGreeting} aria-label="Buat sapaan menggunakan AI" className="absolute -bottom-7 left-0 text-xs text-violet hover:text-violet-light flex items-center gap-1.5 transition-colors disabled:opacity-50">
                {isGeneratingGreeting ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                {isGeneratingGreeting ? 'Menghasilkan sapaan AI...' : 'Sapaan AI Magic'}
              </button>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            className="flex flex-wrap gap-4 mb-10">
            <motion.a href="#projects" whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(139,92,246,0.7)' }} whileTap={{ scale: 0.97 }}
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold">
              Lihat Proyek <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}><ArrowDown size={15} /></motion.span>
            </motion.a>
            <motion.a href="#contact"
              whileHover={{ scale: 1.06, borderColor: 'rgba(139,92,246,0.6)', boxShadow: '0 0 20px rgba(139,92,246,0.15)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold glass border border-white/8 text-text-main transition-all duration-300">
              Hubungi Saya
            </motion.a>
          </motion.div>

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

        {/* ── RIGHT: Floating profile card ── */}
        <motion.div initial={{ opacity: 0, x: 60, rotateY: -15 }} animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }} className="hidden lg:flex justify-center items-center">
          <div className="relative w-72 xl:w-80">

            {/* Slow orbit rings around card */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full border border-dashed pointer-events-none"
              style={{ inset: '-40px', borderColor: 'rgba(139,92,246,0.15)' }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full border border-dashed pointer-events-none"
              style={{ inset: '-70px', borderColor: 'rgba(34,211,238,0.1)' }} />

            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass-md rounded-3xl p-8 z-10 gradient-border">

              {/* Avatar */}
              <div className="relative mx-auto mb-5" style={{ width: 96, height: 96 }}>
                <motion.div
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.18, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-4 rounded-[2rem] blur-xl pointer-events-none"
                  style={{ background: 'conic-gradient(from 0deg, #8B5CF6, #22D3EE, #F43F5E, #8B5CF6)' }}
                />
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <motion.div className="absolute inset-0 pointer-events-none" animate={{ rotate: 360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    style={{ background: 'conic-gradient(from 0deg, #8B5CF6 0%, #22D3EE 28%, transparent 46%, transparent 56%, #F43F5E 74%, #A78BFA 88%, #8B5CF6 100%)' }} />
                  <div className="absolute overflow-hidden" style={{ inset: '2px', borderRadius: '14px', background: '#07070E' }}>
                    <Image
                      src="/portrait-hero.avif"
                      alt="Dewa Sinar Surya"
                      fill
                      sizes="96px"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                {ORBIT_DOTS.map((d, i) => (
                  <motion.span key={i}
                    animate={{ scale: [1, 2.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: d.dur, repeat: Infinity, delay: d.del, ease: 'easeInOut' }}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      top: d.top, left: d.left, transform: `translateX(${d.tx})`,
                      width: d.size, height: d.size,
                      background: d.color,
                      boxShadow: `0 0 ${d.size * 3}px ${d.size}px ${d.color}80`,
                      zIndex: 30,
                    }} />
                ))}
              </div>

              <h3 className="font-display text-2xl font-bold text-text-main text-center mb-1">Dewa Sinar Surya</h3>
              <p className="text-sm text-center mb-6" style={{ color: '#22D3EE' }}>✦ Pranata Komputer</p>
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

            {/* Floating stat badges */}
            {[
              { value: '3+', label: 'Tahun Exp.', pos: { top: '-24px', right: '-16px' }, delay: 3 },
              { value: '20+', label: 'Proyek', pos: { bottom: '-24px', left: '-16px' }, delay: 5 },
              { value: '100%', label: 'Dedicated', pos: { top: '40%', left: '-64px' }, delay: 4 },
            ].map((badge, i) => (
              <motion.div key={badge.label}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
                className="absolute glass-md rounded-2xl px-4 py-3 text-center border border-white/10 z-20"
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
