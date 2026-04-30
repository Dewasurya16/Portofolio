'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Calendar, Coffee, Code2, Download, ArrowRight } from 'lucide-react'

// Animated count-up number
function AnimatedNumber({ target, suffix = '', inView }: { target: number | string; suffix?: string; inView: boolean }) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView || typeof target !== 'number') { setDisplay(String(target)); return }
    let start = 0
    const duration = 1800
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const val = Math.floor(progress * target)
      setDisplay(String(val) + suffix)
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

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 bg-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[500px] h-[500px] -top-40 -left-20 opacity-40" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="blob-cyan w-[400px] h-[400px] -bottom-20 -right-20 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Visual */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -50, rotateY: 10 }} animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="relative mb-6">
              <div className="w-full aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden gradient-border">
                <div className="w-full h-full bg-gradient-to-br from-violet/20 via-dark-3 to-cyan/10 flex items-center justify-center relative">
                  <motion.span animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
                    className="font-display text-9xl font-bold gradient-text select-none">YN</motion.span>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-6 rounded-full border border-violet/10" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-12 rounded-full border border-cyan/10" />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-20 rounded-full border border-dashed border-rose/10" />
                </div>
              </div>
              {/* Glowing corner accents */}
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-violet/60 rounded-tl-lg" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-cyan/60 rounded-br-lg" />
            </div>

            {/* Animated stat grid */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
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
                  <div>
                    <p className="font-display font-bold text-xl text-text-main leading-none">
                      {numValue > 0
                        ? <AnimatedNumber target={numValue} suffix="+" inView={inView} />
                        : display}
                    </p>
                    <p className="text-[11px] text-text-faint mt-0.5">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text */}
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
                'Saya adalah seorang Pranata Komputer yang bersemangat menciptakan antarmuka digital yang indah dan fungsional. Dengan pengalaman lebih dari 3 tahun, saya menggabungkan desain estetis dengan implementasi teknis yang solid.',
                'Keahlian utama saya meliputi desain UI/UX menggunakan Figma, pengembangan front-end dengan React, Next.js, dan TypeScript. Saya percaya desain yang baik bukan hanya tentang tampilan, tapi juga fungsi dan pengalaman pengguna.',
                'Saat tidak coding atau mendesain, saya senang mengeksplorasi tren teknologi terbaru dan berkontribusi pada komunitas developer lokal di Makassar.',
              ].map((text, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}>
                  {i === 0 ? <><strong className="text-text-main font-semibold">Pranata Komputer</strong>{text.replace('Saya adalah seorang Pranata Komputer', ' yang bersemangat')}</> : text}
                </motion.p>
              ))}
            </div>

            {/* Traits */}
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
