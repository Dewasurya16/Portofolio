'use client'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'

const links = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Kontak', href: '#contact' },
]

const socials = [
  { icon: Github, href: '#', label: 'GitHub', color: '#8B5CF6' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#22D3EE' },
  { icon: Mail, href: 'mailto:nama@email.com', label: 'Email', color: '#F43F5E' },
]

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-14 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="font-display font-bold text-2xl">
              <span className="gradient-text">YN</span>
              <span className="text-white/20">.</span>
            </a>
            <p className="text-text-faint text-sm mt-3 max-w-xs leading-relaxed">
              Merancang antarmuka yang memukau dan membangun aplikasi web berkinerja tinggi.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs text-text-faint uppercase tracking-widest mb-4 font-semibold">Navigasi</p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-sm text-text-faint hover:text-violet-light transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs text-text-faint uppercase tracking-widest mb-4 font-semibold">Temukan Saya</p>
            <div className="flex gap-3 mb-6">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center border border-white/5 transition-all"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.borderColor = color + '40' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)' }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 text-xs text-text-faint hover:text-violet-light transition-colors"
            >
              <ArrowUp size={13} /> Kembali ke Atas
            </motion.a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-faint">
            © {new Date().getFullYear()} Dewa Sinar Surya,S.Kom. Semua Hak Dilindungi.
          </p>
          <p className="text-xs text-text-faint flex items-center gap-1.5">
            Dibangun dengan <Heart size={11} className="text-rose fill-rose" /> menggunakan Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
