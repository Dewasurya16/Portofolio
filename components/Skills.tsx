'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import StarField from './StarField'
import BackgroundRockets from './Rocket'

const categories = [
  { title: 'Design', icon: '🎨', color: '#8B5CF6', skills: [{ name: 'Figma', level: 92 }, { name: 'UI/UX Design', level: 90 }, { name: 'Prototyping', level: 88 }, { name: 'Design System', level: 85 }, { name: 'User Research', level: 80 }] },
  { title: 'Front-End', icon: '⚡', color: '#22D3EE', skills: [{ name: 'React.js', level: 88 }, { name: 'Next.js', level: 85 }, { name: 'TypeScript', level: 82 }, { name: 'Tailwind CSS', level: 90 }, { name: 'Framer Motion', level: 78 }] },
  { title: 'Tools & Lainnya', icon: '🛠', color: '#F43F5E', skills: [{ name: 'Git & GitHub', level: 85 }, { name: 'REST API', level: 80 }, { name: 'Vercel / Netlify', level: 82 }, { name: 'Notion / Jira', level: 75 }, { name: 'Agile / Scrum', level: 78 }] },
]

const techBadges = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Figma', 'Tailwind CSS', 'Framer Motion', 'Git', 'REST API', 'Vercel', 'HTML5', 'CSS3', 'Node.js']



/* Shooting Stars */
function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { top: '10%', left: '5%',  len: 110, delay: 3,  repeatDelay: 14, dur: 1.1 },
        { top: '75%', left: '60%', len: 90,  delay: 9,  repeatDelay: 18, dur: 0.9 },
        { top: '45%', left: '85%', len: 140, delay: 16, repeatDelay: 20, dur: 1.3 },
      ].map((m, i) => (
        <motion.div key={i} className="absolute" style={{ top: m.top, left: m.left }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, m.len * 1.8, m.len * 2.4], y: [0, 0, m.len * 0.85, m.len * 1.15] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, repeatDelay: m.repeatDelay }}>
          <div style={{
            width: `${m.len}px`, height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85))',
            transform: 'rotate(28deg)', transformOrigin: 'left center',
          }} />
        </motion.div>
      ))}
    </div>
  )
}

/* Constellation connecting badge nodes */
function ConstellationBadges({ inView }: { inView: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.12 }}>
      <defs>
        <linearGradient id="skillConGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Static decorative constellation lines in background */}
      {[
        { x1: '5%', y1: '20%', x2: '20%', y2: '35%' },
        { x1: '80%', y1: '10%', x2: '95%', y2: '30%' },
        { x1: '10%', y1: '70%', x2: '25%', y2: '85%' },
        { x1: '75%', y1: '75%', x2: '90%', y2: '60%' },
      ].map((l, i) => (
        <motion.line key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="url(#skillConGrad)" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: [0, 0.5, 0.2] } : {}}
          transition={{ delay: 0.5 + i * 0.3, duration: 1.5, ease: 'easeOut', opacity: { repeat: Infinity, duration: 5, repeatType: 'reverse' } }}
        />
      ))}
    </svg>
  )
}

/* Planet ring decoration */
function PlanetRing({ color, size, x, y, tilt }: { color: string; size: number; x: string; y: string; tilt: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    >
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        border: `1px solid ${color}30`,
        transform: `rotateX(${tilt}deg)`,
        boxShadow: `0 0 10px ${color}15`,
      }} />
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 space-dot-pattern opacity-70" />
      <StarField count={40} />
      <BackgroundRockets />
      <ShootingStars />
      <ConstellationBadges inView={inView} />

      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[600px] h-[600px] top-0 right-0 opacity-30" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="blob-cyan w-[500px] h-[500px] bottom-0 left-0 opacity-25" />
      <motion.div animate={{ scale: [1, 1.25, 1], rotate: [0, -180, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-rose w-[250px] h-[250px] top-1/2 left-1/2 opacity-15" />

      {/* Decorative planet rings */}
      <PlanetRing color="#8B5CF6" size={200} x="-5%" y="10%" tilt={70} />
      <PlanetRing color="#22D3EE" size={150} x="92%" y="60%" tilt={65} />
      <PlanetRing color="#F43F5E" size={120} x="45%" y="85%" tilt={75} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <div className="flex justify-center mb-6"><div className="section-tag">Keahlian</div></div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-4">
            Stack &amp; <span className="gradient-text">Kemampuan</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">Teknologi dan alat yang saya kuasai untuk menghadirkan produk digital berkualitas tinggi.</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {categories.map((cat, ci) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-2xl p-7 border border-white/5 transition-all duration-400 group relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${cat.color}22, 0 0 0 1px ${cat.color}20`
                e.currentTarget.style.borderColor = `${cat.color}35`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
              }}>

              {/* Cosmic card background shimmer */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${cat.color}08 0%, transparent 60%)` }} />

              {/* Shimmer sweep */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />

              {/* Spinning mini orbit in corner */}
              <motion.div
                className="absolute top-4 right-4 rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ width: 40, height: 40, border: `1px dashed ${cat.color}50` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
                  style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
              </motion.div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }} transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}>
                  {cat.icon}
                </motion.div>
                <span className="font-display font-bold text-text-main">{cat.title}</span>
                <motion.div className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: ci * 0.5 }} />
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {cat.skills.map(({ name, level }, i) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-text-muted font-medium">{name}</span>
                      <motion.span className="font-bold text-xs" style={{ color: cat.color }}
                        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: ci * 0.15 + i * 0.1 + 0.6 }}>
                        {level}%
                      </motion.span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}}
                        transition={{ delay: ci * 0.15 + i * 0.12 + 0.4, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: `linear-gradient(90deg, ${cat.color}40, ${cat.color})` }}>
                        {/* Shimmer inside bar */}
                        <motion.div animate={{ x: ['-100%', '250%'] }} transition={{ duration: 2.5, repeat: Infinity, delay: ci * 0.5 + i * 0.2 + 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        {/* Glow head */}
                        <div className="absolute right-0 top-0 bottom-0 w-3 rounded-full"
                          style={{ background: `radial-gradient(circle, ${cat.color}, transparent)`, filter: 'blur(2px)' }} />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {techBadges.map((tech, i) => (
            <motion.span key={tech}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.14, y: -5, borderColor: 'rgba(139,92,246,0.7)', color: '#A78BFA', boxShadow: '0 0 16px rgba(139,92,246,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 glass rounded-full text-sm text-text-muted border border-white/6 cursor-default transition-all duration-200 font-medium">
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}