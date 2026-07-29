'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import StarField from '@/components/StarField'
import Particles from '@/components/Particles'
import ProjectCard from '@/components/ProjectCard'
import { projects, categories } from '@/data/projects'

export default function ProjectsPage() {
  const [active, setActive] = useState('Semua')
  const filtered = active === 'Semua' ? projects : projects.filter((p) => p.category === active)

  return (
    <main className="min-h-screen bg-dark noise py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <StarField count={60} />
      <Particles count={25} />
      
      {/* Glow blobs */}
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[600px] h-[600px] top-20 left-10 opacity-20 pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="blob-cyan w-[400px] h-[400px] bottom-20 right-10 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/#projects" className="inline-flex text-sm text-text-muted hover:text-violet-light transition-colors font-medium">
            <motion.span whileHover={{ x: -4 }} className="inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Kembali ke Beranda
            </motion.span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-4">
            Semua <span className="gradient-text">Proyek</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-text-muted max-w-2xl text-lg">
            Eksplorasi koleksi lengkap karya saya, mulai dari pengembangan web app hingga desain sistem dan landing page.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActive(cat)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active === cat ? 'btn-glow text-white' : 'glass border border-white/6 text-text-muted hover:border-violet/30 hover:text-text-main'}`}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}
