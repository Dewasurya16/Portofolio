'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import StarField from './StarField'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'

interface TimelineEntry {
  type: string; period: string; location: string; desc: string; skills: string[]; title: string; subtitle: string
}

const experiences: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Pranata Komputer Ahli Pertama',
    subtitle: 'Kejaksaan Republik Indonesia · Penuh waktu',
    location: 'Sulawesi Selatan · On-site',
    period: 'Mei 2025 — Sekarang',
    desc: 'Menjalankan tugas sebagai Pranata Komputer Ahli Pertama di lingkungan Kejaksaan Republik Indonesia.',
    skills: ['Teknologi Informasi', 'Sistem Informasi', 'Pelayanan Publik'],
  },
  {
    type: 'work',
    title: 'Pengawas Tempat Pemungutan Suara',
    subtitle: 'Bawaslu RI · Paruh waktu',
    location: 'Temanggung, Jawa Tengah · On-site',
    period: 'Okt 2024 — Nov 2024',
    desc: 'Mengawasi pelaksanaan pemungutan dan penghitungan suara serta memastikan proses berjalan sesuai ketentuan.',
    skills: ['Team Leadership', 'Pengawasan', 'Komunikasi'],
  },
  {
    type: 'work',
    title: 'Generasi GIGIH Fullstack Engineer',
    subtitle: 'GoTo Group · Apprenticeship',
    location: 'Jakarta, Indonesia · Remote',
    period: 'Jul 2023 — Des 2023',
    desc: 'Mempelajari MERN Stack melalui program Generasi GIGIH, meningkatkan kemampuan komunikasi bahasa Inggris, dan berkolaborasi dalam tim beranggotakan empat orang untuk mengembangkan web “CAREPAL”.',
    skills: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'CSS'],
  },
  {
    type: 'work',
    title: 'Data Scientist',
    subtitle: 'Udinus Center of Excellence · Magang',
    location: 'Semarang, Jawa Tengah · On-site',
    period: 'Mar 2023 — Jul 2023',
    desc: 'Mengerjakan proyek kolaboratif chatbot berbasis NLP, membantu petani melalui solusi informasi, serta mempelajari dan menerapkan pemrosesan bahasa alami.',
    skills: ['Python', 'Natural Language Processing', 'Data Science', 'Chatbot'],
  },
  {
    type: 'work',
    title: 'Machine Learning Research Assistant',
    subtitle: 'Bengkel Koding · Kontrak',
    location: 'Semarang, Jawa Tengah · On-site',
    period: 'Sep 2022 — Jan 2023',
    desc: 'Menjadi asisten pengajar machine learning, membantu mahasiswa menyelesaikan kendala teknis dan riset, serta membuat modul Sentiment Algorithm, workshop machine learning, dan materi klasifikasi maupun clustering.',
    skills: ['PyTorch', 'Machine Learning', 'Sentiment Analysis', 'Research'],
  },
]

const educations: TimelineEntry[] = [
  {
    type: 'edu',
    title: 'S1 Teknik Informatika',
    subtitle: 'Universitas Dian Nuswantoro',
    location: 'Semarang, Jawa Tengah',
    period: 'Agu 2019 — Agu 2023',
    desc: 'Bachelor of Technology bidang Teknik Informatika dengan IPK 3,50 dari 4,00.',
    skills: ['Teamwork', 'Communication', 'Information Technology'],
  },
  {
    type: 'edu',
    title: 'Ilmu Pengetahuan Alam',
    subtitle: 'SMA Negeri 1 Mertoyudan',
    location: 'Magelang, Jawa Tengah',
    period: '2017 — 2019',
    desc: 'Menyelesaikan pendidikan menengah atas pada jurusan Ilmu Pengetahuan Alam.',
    skills: ['Natural Sciences', 'Teamwork'],
  },
  {
    type: 'edu',
    title: 'Microsoft Azure for Beginner',
    subtitle: 'Fresh Graduate Academy · Digital Talent Scholarship',
    location: 'Semarang, Jawa Tengah · Online',
    period: 'Jul 2022 — Agu 2022',
    desc: 'Mempelajari konsep cloud computing dan layanan Microsoft Azure, termasuk Infrastructure as a Service, Platform as a Service, dan Software as a Service melalui materi, virtual lab, dan sesi bersama instruktur.',
    skills: ['Microsoft Azure', 'Cloud Computing', 'IaaS', 'PaaS', 'SaaS'],
  },
  {
    type: 'edu',
    title: 'Artificial Intelligence Mastery Program',
    subtitle: 'Orbit Future Academy',
    location: 'Jakarta, Indonesia · Online',
    period: 'Mar 2022 — Jul 2022',
    desc: 'Mempelajari data science, computer vision, natural language processing, dan reinforcement learning, sekaligus mengembangkan kemampuan public speaking serta project leadership.',
    skills: ['Artificial Intelligence', 'Python', 'Computer Vision', 'NLP', 'Project Management'],
  },
  {
    type: 'edu',
    title: 'Studi Independen Pengembangan Game',
    subtitle: 'Agate Academy',
    location: 'Bandung, Jawa Barat · Online',
    period: 'Agu 2021 — Jan 2022',
    desc: 'Mempelajari pengembangan game dengan fokus pada game programming dan membangun mini game melalui logika pemrograman.',
    skills: ['Game Development', 'C#', 'Game Programming', 'Problem Solving'],
  },
]



/* Shooting star */
function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { top: '12%', left: '30%', len: 120, delay: 5, repeatDelay: 14 },
        { top: '65%', left: '70%', len: 90, delay: 12, repeatDelay: 18 },
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

function TimelineItem({ item, index, inView, accent }: { item: TimelineEntry; index: number; inView: boolean; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      {/* Cosmic timeline line — gradient with star dots */}
      <div className="absolute left-3 top-8 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, ${accent}70, ${accent}20, transparent)` }} />
      {/* Twinkling dots along the line */}
      {index < 2 && (
        <motion.div
          className="absolute left-[11px] rounded-full pointer-events-none"
          style={{ top: '60%', width: 3, height: 3, background: accent, boxShadow: `0 0 6px ${accent}` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        />
      )}

      {/* Timeline dot — cosmic orb */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-4 w-6 h-6 rounded-lg flex items-center justify-center"
        style={{ background: `${accent}20`, border: `2px solid ${accent}60`, boxShadow: `0 0 12px ${accent}30` }}
      >
        <motion.div className="w-2 h-2 rounded-sm"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 5 }}
        className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 40px ${accent}18, 0 0 0 1px ${accent}15`
        }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
      >
        {/* Nebula glow on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 0% 50%, ${accent}06 0%, transparent 60%)` }} />

        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-display font-bold text-base text-text-main">{item.title}</h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{item.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 glass px-2.5 py-1 rounded-full text-xs text-text-faint border border-white/5 mb-1">
              <Calendar size={10} /> {item.period}
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-text-faint">
              <MapPin size={10} /> {item.location}
            </div>
          </div>
        </div>
        <p className="text-sm text-text-muted leading-relaxed mb-3">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 space-dot-pattern opacity-50" />
      <StarField count={25} />
      <ShootingStars />

      <div className="blob-rose w-[450px] h-[450px] top-0 left-1/2 opacity-18" />
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="blob-violet w-[400px] h-[400px] bottom-0 right-0 opacity-20" />

      {/* Large orbit ring decoration */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, border: '1px dashed rgba(34,211,238,0.08)', top: '10%', right: '-250px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 300, height: 300, border: '1px dashed rgba(139,92,246,0.1)', bottom: '15%', left: '-150px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="section-tag">Perjalanan</div>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-4">
            Pengalaman &amp; <span className="gradient-text">Pendidikan</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', boxShadow: '0 0 12px rgba(139,92,246,0.2)' }}>
                <Briefcase size={15} className="text-violet" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-main">Pengalaman Kerja</h3>
            </motion.div>
            {experiences.map((exp, i) => (
              <TimelineItem key={i} item={exp} index={i} inView={inView} accent="#8B5CF6" />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', boxShadow: '0 0 12px rgba(34,211,238,0.2)' }}>
                <GraduationCap size={15} className="text-cyan" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-main">Pendidikan</h3>
            </motion.div>
            {educations.map((edu, i) => (
              <TimelineItem key={i} item={edu} index={i} inView={inView} accent="#22D3EE" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
