'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Project } from '@/data/projects'

/* 3D Tilt card */
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
    <motion.div ref={ref} onMouseMove={handleMouse}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.2 } }}
      className="h-full cursor-pointer"
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 25px 70px ${accent}30, 0 0 0 1px ${accent}15` }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; resetTilt() }}>
      {children}
    </motion.div>
  )
}

/* Space thumbnail for project card */
export function SpaceThumbnail({ project }: { project: Project }) {
  return (
    <div className={`h-44 relative flex items-center justify-center overflow-hidden w-full`}
      style={{ background: `radial-gradient(ellipse at 30% 40%, ${project.nebula} 0%, rgba(5,5,10,0.95) 70%)` }}>
      {/* Star mini field in thumbnail */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: Math.random() > 0.7 ? 2 : 1, height: Math.random() > 0.7 ? 2 : 1,
            background: '#ffffff', opacity: 0.4 + Math.random() * 0.4,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 3, repeat: Infinity }} />
      ))}

      {/* Nebula swirl */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160, height: 80,
          background: `radial-gradient(ellipse, ${project.accent}25 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
        animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Icon */}
      <motion.div className="text-center z-10" style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          whileHover={{ rotate: 15, scale: 1.2 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 mx-auto mb-2 glass rounded-2xl flex items-center justify-center border"
          style={{ borderColor: `${project.accent}50`, boxShadow: `0 0 20px ${project.accent}30` }}>
          <span className="text-2xl">{project.icon}</span>
        </motion.div>
        <span className="text-xs font-semibold" style={{ color: project.accent }}>{project.category}</span>
      </motion.div>

      {/* Orbit ring around icon */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 80, height: 80, borderRadius: '50%', border: `1px dashed ${project.accent}40` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
          style={{ background: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
      </motion.div>

      {/* Animated corner dot */}
      <motion.div animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-3 left-3 w-2 h-2 rounded-full"
        style={{ background: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
      <span className="absolute top-3 right-3 text-xs text-text-faint glass px-2 py-0.5 rounded-full border border-white/5">{project.year}</span>
    </div>
  )
}

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/projects/${project.id}`)} className="block h-full">
      <TiltCard accent={project.accent}>
        <article className="glass rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full transition-all duration-300 group">
          <SpaceThumbnail project={project} />
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-display font-bold text-lg text-text-main mb-2 group-hover:text-violet-light transition-colors">{project.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
              <motion.a href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors font-medium">
                <ExternalLink size={13} /> Live Demo
              </motion.a>
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors">
                <Github size={13} /> Source
              </motion.a>
            </div>
          </div>
        </article>
      </TiltCard>
    </div>
  )
}
