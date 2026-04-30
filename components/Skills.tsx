'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const categories = [
  { title: 'Design', icon: '🎨', color: '#8B5CF6', skills: [{ name: 'Figma', level: 92 }, { name: 'UI/UX Design', level: 90 }, { name: 'Prototyping', level: 88 }, { name: 'Design System', level: 85 }, { name: 'User Research', level: 80 }] },
  { title: 'Front-End', icon: '⚡', color: '#22D3EE', skills: [{ name: 'React.js', level: 88 }, { name: 'Next.js', level: 85 }, { name: 'TypeScript', level: 82 }, { name: 'Tailwind CSS', level: 90 }, { name: 'Framer Motion', level: 78 }] },
  { title: 'Tools & Lainnya', icon: '🛠', color: '#F43F5E', skills: [{ name: 'Git & GitHub', level: 85 }, { name: 'REST API', level: 80 }, { name: 'Vercel / Netlify', level: 82 }, { name: 'Notion / Jira', level: 75 }, { name: 'Agile / Scrum', level: 78 }] },
]

const techBadges = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Figma', 'Tailwind CSS', 'Framer Motion', 'Git', 'REST API', 'Vercel', 'HTML5', 'CSS3', 'Node.js']

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[500px] h-[500px] top-0 right-0 opacity-25" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="blob-cyan w-[400px] h-[400px] bottom-0 left-0 opacity-20" />

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
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-7 border border-white/5 transition-all duration-400 group relative overflow-hidden"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 16px 48px ${cat.color}20`; e.currentTarget.style.borderColor = `${cat.color}30` }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}>
              {/* Shimmer sweep on hover */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }} transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}>
                  {cat.icon}
                </motion.div>
                <span className="font-display font-bold text-text-main">{cat.title}</span>
                <motion.div className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: cat.color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: ci * 0.5 }} />
              </div>

              {/* Skills with shimmer bars */}
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
                        style={{ background: `linear-gradient(90deg, ${cat.color}50, ${cat.color})` }}>
                        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, delay: ci * 0.5 + i * 0.2 + 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges — staggered */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {techBadges.map((tech, i) => (
            <motion.span key={tech}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.12, y: -4, borderColor: 'rgba(139,92,246,0.6)', color: '#A78BFA' }}
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
