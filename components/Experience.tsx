'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'

interface TimelineEntry {
  type: string; period: string; location: string; desc: string; skills: string[]; title: string; subtitle: string
}

const experiences: TimelineEntry[] = [
  {
    type: 'work', title: 'Pranata Komputer Ahli Pertama', subtitle: 'Instansi Pemerintah',
    location: 'Makassar, Sulawesi Selatan', period: '2022 — Sekarang',
    desc: 'Merancang dan mengembangkan sistem informasi pemerintah, melakukan analisis kebutuhan, serta memastikan kualitas dan keamanan perangkat lunak yang dikembangkan.',
    skills: ['Next.js', 'TypeScript', 'Figma', 'REST API'],
  },
  {
    type: 'work', title: 'UI/UX Designer & Front-End Developer', subtitle: 'Startup Teknologi',
    location: 'Remote', period: '2021 — 2022',
    desc: 'Merancang antarmuka pengguna untuk aplikasi SaaS, berkolaborasi dengan tim produk, dan mengimplementasikan desain menggunakan React dan TypeScript.',
    skills: ['React', 'Figma', 'Tailwind CSS', 'User Research'],
  },
  {
    type: 'work', title: 'Junior Web Developer', subtitle: 'Digital Agency',
    location: 'Makassar', period: '2020 — 2021',
    desc: 'Membangun landing page dan website perusahaan, mengoptimalkan performa, dan memastikan responsivitas di berbagai perangkat.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'WordPress'],
  },
]

const educations: TimelineEntry[] = [
  {
    type: 'edu', title: 'S1 Ilmu Komputer', subtitle: 'Universitas Hasanuddin',
    location: 'Makassar', period: '2016 — 2020',
    desc: 'Fokus pada rekayasa perangkat lunak dan sistem informasi. Aktif di organisasi mahasiswa bidang teknologi.',
    skills: ['Algoritma', 'OOP', 'Database', 'Jaringan'],
  },
  {
    type: 'edu', title: 'Sertifikasi UI/UX Design', subtitle: 'Google — Coursera',
    location: 'Online', period: '2022',
    desc: 'Menyelesaikan program sertifikasi Google UX Design dengan predikat distinction.',
    skills: ['UX Research', 'Wireframing', 'Usability Testing'],
  },
]

function TimelineItem({ item, index, inView, accent }: { item: TimelineEntry; index: number; inView: boolean; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      {/* Line */}
      <div className="absolute left-3 top-8 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, ${accent}60, transparent)` }} />
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-4 w-6 h-6 rounded-lg flex items-center justify-center"
        style={{ background: `${accent}20`, border: `2px solid ${accent}60` }}
      >
        <div className="w-2 h-2 rounded-sm" style={{ background: accent }} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 4 }}
        className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${accent}15` }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
      >
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
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="blob-rose w-[400px] h-[400px] top-0 left-1/2 opacity-20" />

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)' }}>
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
