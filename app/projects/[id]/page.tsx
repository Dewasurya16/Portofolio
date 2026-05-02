'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import StarField from '@/components/StarField'
import Particles from '@/components/Particles'
import { projects } from '@/data/projects'
import { SpaceThumbnail } from '@/components/ProjectCard'
import { useEffect, useState } from 'react'

export default function ProjectDetail() {
  const params = useParams()
  // Hydration safety for params
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const id = Number(params.id)
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Proyek tidak ditemukan</h1>
          <Link href="/projects" className="text-violet hover:underline">Kembali ke Daftar Proyek</Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark noise py-24 relative overflow-hidden text-text-main">
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <StarField count={100} />
      <Particles count={20} />

      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[800px] h-[800px] top-0 left-0 opacity-15 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link href="/projects" passHref legacyBehavior>
            <motion.a whileHover={{ x: -4 }} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-violet-light transition-colors font-medium cursor-pointer">
              <ArrowLeft size={16} /> Kembali ke Proyek
            </motion.a>
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}>
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted font-medium">
              <Calendar size={14} /> {project.year}
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl lg:text-6xl leading-tight mb-6">{project.title}</h1>
          <p className="text-lg text-text-muted leading-relaxed mb-10">{project.description}</p>
        </motion.div>

        {/* Image Mockup / Space Thumbnail Large */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-3xl overflow-hidden glass border border-white/10 mb-12 relative" style={{ aspectRatio: '16/9' }}>
          {/* We scale the thumbnail slightly to fit nicely without breaking */}
          <div className="absolute inset-0 flex items-center justify-center transform scale-150 origin-center pointer-events-none">
             <SpaceThumbnail project={project} />
          </div>
          {/* Shadow inner overlay */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
        </motion.div>

        {/* Details & Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="md:col-span-2 space-y-8">
            <section>
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-2">
                <span style={{ color: project.accent }}>✦</span> Tentang Proyek
              </h2>
              <p className="text-text-muted leading-relaxed">
                Ini adalah halaman detail untuk proyek <strong>{project.title}</strong>. Saat ini halaman menggunakan deskripsi dasar: {project.description}
                <br /><br />
                Di masa mendatang, Anda dapat menambahkan narasi yang lebih komprehensif tentang latar belakang, masalah yang dipecahkan, solusi desain, dan proses pengerjaan dari proyek ini ke dalam file data.
              </p>
            </section>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold text-sm text-text-faint uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag size={14} /> Teknologi
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <a href={project.link} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all text-white"
                 style={{ background: project.accent, boxShadow: `0 4px 20px ${project.accent}40` }}>
                <ExternalLink size={18} /> Kunjungi Website
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <Github size={18} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  )
}
