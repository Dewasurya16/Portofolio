'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #8B5CF6, #22D3EE, #F43F5E)' }}
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <motion.a href="#" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} className="font-display font-bold text-xl tracking-tight">
            <span className="gradient-text">Dewa Sinar Surya Porto</span><span className="text-white/30">.</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <motion.a key={link.href} href={link.href} onClick={() => setActive(link.href)}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -2 }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active === link.href ? 'text-violet-light' : 'text-text-muted hover:text-text-main'}`}
              >
                {link.label}
                <motion.span className="absolute inset-x-2 bottom-1 h-px rounded-full"
                  style={{ background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)' }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  animate={active === link.href ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </nav>
          <div className="hidden md:flex">
            <motion.a href="#contact" whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(139,92,246,0.6)' }} whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="btn-glow px-5 py-2 rounded-xl text-sm">
              Hubungi Saya
            </motion.a>
          </div>
          <motion.button whileTap={{ scale: 0.9 }}
            className="md:hidden w-9 h-9 glass rounded-lg flex items-center justify-center text-text-muted"
            aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}>
            <AnimatePresence mode="wait">
              {open
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={18} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={18} /></motion.div>}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            id="mobile-navigation"
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden">
            {links.map((link, i) => (
              <motion.a key={link.href} href={link.href} onClick={() => { setActive(link.href); setOpen(false) }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.08, x: 6 }}
                className="font-display text-3xl font-bold text-text-main">
                {link.label}
              </motion.a>
            ))}
            <motion.a href="#contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              onClick={() => setOpen(false)} whileHover={{ scale: 1.05 }} className="mt-4 btn-glow px-8 py-3 rounded-xl text-sm">
              Hubungi Saya
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
