'use client'
import { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import StarField from './StarField'
import BackgroundRockets from './Rocket'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import { projects, categories } from '../data/projects'





/* Shooting stars */
function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { top: '8%',  left: '20%', len: 100, delay: 4,  repeatDelay: 13 },
        { top: '70%', left: '75%', len: 120, delay: 10, repeatDelay: 17 },
        { top: '40%', left: '5%',  len: 80,  delay: 17, repeatDelay: 22 },
      ].map((m, i) => (
        <motion.div key={i} className="absolute" style={{ top: m.top, left: m.left }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], x: [0, 0, m.len * 1.8, m.len * 2.4], y: [0, 0, m.len * 0.85, m.len * 1.1] }}
          transition={{ duration: 1.0, delay: m.delay, repeat: Infinity, repeatDelay: m.repeatDelay }}>
          <div style={{ width: `${m.len}px`, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85))', transform: 'rotate(28deg)', transformOrigin: 'left center' }} />
        </motion.div>
      ))}
    </div>
  )
}



export default function Projects() {
  const [active, setActive] = useState('Semua')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const filtered = active === 'Semua' ? projects.slice(0, 3) : projects.filter((p) => p.category === active).slice(0, 3)

  return (
    <section id="projects" className="py-28 bg-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <StarField count={40} />
      <BackgroundRockets />
      <ShootingStars />

      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[600px] h-[600px] -bottom-32 -right-20 opacity-28" />
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="blob-cyan w-[400px] h-[400px] -top-20 -left-20 opacity-22" />

      {/* Decorative orbit ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, border: '1px dashed rgba(139,92,246,0.1)', top: '50%', left: '-200px', marginTop: '-200px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="flex justify-center mb-6"><div className="section-tag">Proyek</div></div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-4">
            Karya <span className="gradient-text">Terpilih</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">Kumpulan proyek yang mencerminkan keahlian desain dan pengembangan saya.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActive(cat)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active === cat ? 'btn-glow text-white' : 'glass border border-white/6 text-text-muted hover:border-violet/30 hover:text-text-main'}`}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link href="/projects" passHref legacyBehavior>
            <motion.a whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-violet-light transition-colors font-medium group cursor-pointer">
              Lihat Semua Proyek <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}