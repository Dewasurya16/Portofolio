'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import StarField from './StarField'
import { MapPin, Calendar, Coffee, Code2, Download, ArrowRight } from 'lucide-react'

function AnimatedNumber({ target, suffix = '', inView }: { target: number | string; suffix?: string; inView: boolean }) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView || typeof target !== 'number') { setDisplay(String(target)); return }
    const duration = 1800
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplay(String(Math.floor(progress * target)) + suffix)
      if (progress < 1) requestAnimationFrame((ts) => step(ts, startTime))
      else setDisplay(String(target) + suffix)
    }
    requestAnimationFrame((ts) => step(ts, ts))
  }, [inView, target, suffix])
  return <span>{display}</span>
}

const stats = [
  { icon: Calendar, label: 'Tahun Pengalaman', numValue: 3, suffix: '+', display: '3+', color: '#8B5CF6' },
  { icon: Code2, label: 'Proyek Selesai', numValue: 20, suffix: '+', display: '20+', color: '#22D3EE' },
  { icon: Coffee, label: 'Kopi per Hari', numValue: 0, suffix: '∞', display: '∞', color: '#F43F5E' },
  { icon: MapPin, label: 'Kota', numValue: 0, suffix: 'Makassar', display: 'Makassar', color: '#A78BFA' },
]

const traits = ['Problem Solver', 'Detail-Oriented', 'Creative Thinker', 'Team Player', 'Fast Learner']



/* Shooting stars */
function ShootingStars() {
  const meteors = [
    { top: '5%', left: '10%', len: 100, delay: 2, repeatDelay: 12, dur: 1.0 },
    { top: '60%', left: '80%', len: 130, delay: 7, repeatDelay: 15, dur: 1.2 },
    { top: '35%', left: '50%', len: 80, delay: 14, repeatDelay: 18, dur: 0.9 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((m, i) => (
        <motion.div key={i} className="absolute" style={{ top: m.top, left: m.left }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, m.len * 1.8, m.len * 2.4], y: [0, 0, m.len * 0.9, m.len * 1.2] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, repeatDelay: m.repeatDelay, ease: 'easeIn' }}>
          <div style={{
            width: `${m.len}px`, height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85))',
            transform: 'rotate(28deg)', transformOrigin: 'left center',
            boxShadow: '0 0 4px rgba(255,255,255,0.4)',
          }} />
        </motion.div>
      ))}
    </div>
  )
}

/* Circular orbiting stars around photo */
const ORBITAL_STARS = [
  { radius: 118, angle: 0, speed: 14, size: 6, color: '#8B5CF6', blur: 4 },
  { radius: 124, angle: 72, speed: 20, size: 4, color: '#22D3EE', blur: 3 },
  { radius: 112, angle: 144, speed: 10, size: 5, color: '#F43F5E', blur: 3 },
  { radius: 130, angle: 216, speed: 18, size: 3, color: '#A78BFA', blur: 2 },
  { radius: 108, angle: 288, speed: 12, size: 4, color: '#ffffff', blur: 2 },
]

function OrbitingStars({ inView }: { inView: boolean }) {
  return (
    <>
      {ORBITAL_STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: s.size,
            height: s.size,
            marginTop: -s.size / 2,
            marginLeft: -s.size / 2,
          }}
          animate={inView ? { rotate: 360 } : {}}
          transition={{ duration: s.speed, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
        >
          {/* The dot rides at radius distance from center */}
          <motion.div
            className="absolute rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            style={{
              width: s.size, height: s.size,
              background: s.color,
              boxShadow: `0 0 ${s.size * 3}px ${s.size}px ${s.color}80`,
              transform: `translateX(${s.radius}px) rotate(-${s.angle}deg)`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 bg-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <StarField count={90} />
      <ShootingStars />

      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[500px] h-[500px] -top-40 -left-20 opacity-40" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="blob-cyan w-[400px] h-[400px] -bottom-20 -right-20 opacity-30" />
      {/* Extra nebula */}
      <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-rose w-[300px] h-[300px] top-1/3 right-1/3 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Photo card ── */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}>

            {/* ── PHOTO: Smaller + triple ring ── */}
            <div className="relative mb-8" style={{ maxWidth: '230px', margin: '0 auto 2rem', marginLeft: undefined }}>
              <div className="mx-auto lg:mx-0" style={{ maxWidth: '230px' }}>

                {/* Nebula ambient glow */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute rounded-[3rem] blur-3xl pointer-events-none"
                  style={{ inset: '-24px', background: 'radial-gradient(ellipse at 40% 40%, #6D28D9 0%, #0C7389 50%, transparent 70%)' }}
                />

                {/* Ring 3 — outermost, slowest counter-spin */}
                <motion.div
                  className="absolute rounded-[40px] pointer-events-none"
                  style={{ inset: '-16px', border: '1px dashed rgba(34,211,238,0.25)' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Ring 2 — middle dashed */}
                <motion.div
                  className="absolute rounded-[34px] pointer-events-none"
                  style={{ inset: '-8px', border: '1px dashed rgba(139,92,246,0.35)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />

                {/* Orbiting stars */}
                <div className="absolute inset-0" style={{ top: '50%', left: '50%' }}>
                  <OrbitingStars inView={inView} />
                </div>

                {/* Main card — conic spinning border */}
                <div className="relative w-full rounded-3xl overflow-hidden"
                  style={{ aspectRatio: '3/4', isolation: 'isolate' }}>

                  {/* Inner spinning conic gradient (fast) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: 'conic-gradient(from 0deg, #8B5CF6 0%, #06B6D4 18%, #A78BFA 36%, transparent 50%, transparent 60%, #F43F5E 74%, #22D3EE 88%, #8B5CF6 100%)',
                      transformOrigin: '50% 50%',
                    }}
                  />

                  {/* Second counter-spin inner ring (slower, on the image edge) */}
                  <motion.div
                    className="absolute pointer-events-none"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{
                      inset: '3px',
                      borderRadius: '20px',
                      background: 'conic-gradient(from 90deg, transparent 0%, transparent 65%, rgba(244,63,94,0.7) 75%, rgba(34,211,238,0.5) 85%, transparent 95%)',
                    }}
                  />

                  {/* Inner card */}
                  <div
                    className="absolute overflow-hidden"
                    style={{ inset: '3px', borderRadius: '21px', background: '#07070E' }}
                  >
                    <img
                      src="/2.png"
                      alt="Dewa Sinar Surya"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Bottom name overlay */}
                    <div className="absolute bottom-0 inset-x-0 px-4 pt-12 pb-4"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }}>
                      <p className="font-display font-bold text-white text-sm leading-tight">Dewa Sinar Surya</p>
                      <p className="text-xs mt-0.5" style={{ color: '#22D3EE' }}>✦ Pranata Komputer·Kejaksaan RI</p>
                    </div>

                    {/* Inner star shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: [0, 0.08, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ background: 'conic-gradient(from 180deg, transparent, rgba(139,92,246,0.3), transparent)' }}
                    />
                  </div>
                </div>

                {/* Corner brackets */}
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2.5 -left-2.5 w-8 h-8 pointer-events-none"
                  style={{ borderTop: '2px solid #8B5CF6', borderLeft: '2px solid #8B5CF6', borderRadius: '8px 0 0 0', zIndex: 25 }} />
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-2.5 -right-2.5 w-8 h-8 pointer-events-none"
                  style={{ borderBottom: '2px solid #22D3EE', borderRight: '2px solid #22D3EE', borderRadius: '0 0 8px 0', zIndex: 25 }} />
                {/* Extra brackets */}
                <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 pointer-events-none"
                  style={{ borderTop: '1px solid rgba(244,63,94,0.5)', borderRight: '1px solid rgba(244,63,94,0.5)', zIndex: 25 }} />
                <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 2.3 }}
                  className="absolute -bottom-2.5 -left-2.5 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: '1px solid rgba(167,139,250,0.5)', borderLeft: '1px solid rgba(167,139,250,0.5)', zIndex: 25 }} />
              </div>
            </div>

            {/* ── Stat grid ── */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0 mt-4">
              {stats.map(({ icon: Icon, label, numValue, suffix, display, color }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.06, y: -3 }}
                  className="glass rounded-2xl p-4 flex items-center gap-3 border border-white/5 hover:border-white/12 transition-all cursor-default"
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 24px ${color}20` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-display font-bold text-text-main leading-none ${display.length > 5 ? 'text-base lg:text-lg' : 'text-xl'}`}>
                      {numValue > 0 ? <AnimatedNumber target={numValue} suffix="+" inView={inView} /> : display}
                    </p>
                    <p className="text-[11px] text-text-faint mt-0.5">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Text ── */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex justify-start mb-6">
              <div className="section-tag">Tentang Saya</div>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-6 leading-tight">
              Merancang Pengalaman,{' '}
              <span className="gradient-text">Membangun Solusi</span>
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed text-[15px]">
              {[
                '  Sebagai seorang Pranata Komputer dengan pengalaman lebih dari 2 tahun, saya fokus merancang produk digital yang tidak hanya enak dilihat, tapi juga nyaman digunakan. Saya terbiasa menjembatani desain UI/UX ke dalam eksekusi front-end yang solid.',
                'Dalam bekerja, saya mengandalkan Figma, React, Next.js, dan TypeScript. Selain dunia web development, saya juga seorang AI Enthusiast dan Researcher yang sangat tertarik meneliti bagaimana kecerdasan buatan bisa digabungkan dengan antarmuka yang intuitif.',
                'Bagi saya, aplikasi yang baik itu harus seimbang antara visual yang menarik, performa mulus, dan kecerdasan sistem. Saat sedang tidak coding atau riset AI, saya senang ngulik teknologi terbaru Dan Terus Bereksperimen Dan belajar Hal Baru.'
              ].map((text, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}>
                  {i === 0
                    ? <><strong className="text-text-main font-semibold">Pranata Komputer</strong>{text.replace('Saya adalah seorang Pranata Komputer', ' yang bersemangat')}</>
                    : text}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {traits.map((trait, i) => (
                <motion.span key={trait}
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 glass rounded-full text-xs text-text-muted font-medium border border-white/6 hover:border-violet/40 hover:text-violet-light transition-all cursor-default">
                  {trait}
                </motion.span>
              ))}
            </div>

            <motion.a href="/cv.pdf"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.3)' }} whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-text-main text-sm font-semibold hover:border-violet/40 transition-all duration-300 group">
              <Download size={15} className="text-violet" />
              Download CV
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-1">
                <ArrowRight size={13} className="text-violet" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}