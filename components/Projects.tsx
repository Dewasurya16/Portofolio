'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const categories = ['Semua', 'UI/UX', 'Web App', 'Landing Page']

const projects = [
  { id: 1, title: 'Dashboard Analytics', category: 'Web App', tags: ['Next.js', 'TypeScript', 'Tailwind'], description: 'Dashboard analitik real-time dengan visualisasi data interaktif, sistem filter canggih, dan tampilan responsif.', gradient: 'from-violet/30 to-violet-dark/20', accent: '#8B5CF6', year: '2024', link: '#', github: '#' },
  { id: 2, title: 'E-Commerce Redesign', category: 'UI/UX', tags: ['Figma', 'User Research', 'Prototyping'], description: 'Redesain lengkap platform e-commerce dengan fokus peningkatan konversi dan pengalaman belanja yang mulus.', gradient: 'from-cyan/20 to-cyan/10', accent: '#22D3EE', year: '2024', link: '#', github: '#' },
  { id: 3, title: 'Sistem Manajemen Dokumen', category: 'Web App', tags: ['React', 'TypeScript', 'REST API'], description: 'Aplikasi manajemen dokumen pemerintah dengan pencarian cepat, kategorisasi otomatis, dan audit trail.', gradient: 'from-rose/20 to-rose/10', accent: '#F43F5E', year: '2023', link: '#', github: '#' },
  { id: 4, title: 'Portfolio Design System', category: 'UI/UX', tags: ['Figma', 'Design System', 'Components'], description: 'Design system komprehensif dengan komponen reusable, panduan tipografi, dan dokumentasi lengkap.', gradient: 'from-violet-light/20 to-violet/10', accent: '#A78BFA', year: '2024', link: '#', github: '#' },
  { id: 5, title: 'Company Profile Landing', category: 'Landing Page', tags: ['Next.js', 'Framer Motion', 'Tailwind'], description: 'Landing page perusahaan dengan animasi scroll elegan, performa tinggi, dan SEO optimal.', gradient: 'from-emerald-400/15 to-emerald-600/10', accent: '#34D399', year: '2023', link: '#', github: '#' },
  { id: 6, title: 'Mobile App UI Kit', category: 'UI/UX', tags: ['Figma', 'Mobile Design', 'iOS/Android'], description: 'UI kit mobile lengkap dengan 200+ komponen, 20+ template layar, dan panduan implementasi.', gradient: 'from-amber-400/15 to-amber-600/10', accent: '#F59E0B', year: '2023', link: '#', github: '#' },
]

// 3D tilt card
function TiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const resetTilt = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.2 } }}
      className="h-full"
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${accent}25` }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; resetTilt() }}>
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('Semua')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const filtered = active === 'Semua' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-28 bg-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[500px] h-[500px] -bottom-32 -right-20 opacity-25" />

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
                <TiltCard accent={project.accent}>
                  <article className="glass rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full transition-all duration-300">
                    {/* Thumbnail */}
                    <div className={`h-44 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 grid-pattern opacity-30" />
                      <motion.div className="text-center z-10" style={{ transform: 'translateZ(20px)' }}>
                        <motion.div whileHover={{ rotate: 10, scale: 1.15 }}
                          className="w-14 h-14 mx-auto mb-2 glass rounded-2xl flex items-center justify-center border"
                          style={{ borderColor: `${project.accent}40` }}>
                          <span className="font-display text-xl font-bold" style={{ color: project.accent }}>
                            {project.title.charAt(0)}
                          </span>
                        </motion.div>
                        <span className="text-xs font-semibold" style={{ color: project.accent }}>{project.category}</span>
                      </motion.div>
                      {/* Animated corner dot */}
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute top-3 left-3 w-2 h-2 rounded-full" style={{ background: project.accent }} />
                      <span className="absolute top-3 right-3 text-xs text-text-faint glass px-2 py-0.5 rounded-full border border-white/5">{project.year}</span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-lg text-text-main mb-2 group-hover:text-violet-light transition-all">{project.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <motion.span key={tag} whileHover={{ scale: 1.1 }} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <motion.a href={project.link} whileHover={{ x: 3 }} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors font-medium">
                          <ExternalLink size={13} /> Live Demo
                        </motion.a>
                        <motion.a href={project.github} whileHover={{ x: 3 }} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors">
                          <Github size={13} /> Source
                        </motion.a>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <motion.a href="#" whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-violet-light transition-colors font-medium group">
            Lihat Semua Proyek <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
