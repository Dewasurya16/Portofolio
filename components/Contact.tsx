'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'nama@email.com', href: 'mailto:nama@email.com', color: '#8B5CF6' },
  { icon: Phone, label: 'WhatsApp', value: '+62 812-XXXX-XXXX', href: 'https://wa.me/62812XXXXXXXX', color: '#22D3EE' },
  { icon: MapPin, label: 'Lokasi', value: 'Makassar, Sulawesi Selatan', href: '#', color: '#F43F5E' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 bg-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="blob-violet w-[500px] h-[500px] -top-20 -right-20 opacity-30" />
      <div className="blob-cyan w-[400px] h-[400px] -bottom-20 -left-20 opacity-25" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="section-tag">Kontak</div>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-main mb-4">
            Mari <span className="gradient-text">Berkolaborasi</span>
          </h2>
          <p className="text-text-muted max-w-md mx-auto">
            Punya proyek menarik? Saya selalu terbuka untuk diskusi dan peluang baru.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group"
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${color}18` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-text-faint mb-0.5 font-medium">{label}</p>
                  <p className="text-sm font-semibold text-text-main">{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-60" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-main">Tersedia untuk Proyek Baru</p>
                  <p className="text-xs text-text-faint">Respon dalam 24 jam</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 glass rounded-3xl p-8 border border-white/5 gradient-border"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-main mb-2">Pesan Terkirim!</h3>
                <p className="text-text-muted">Terima kasih, saya akan segera menghubungi Anda.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Nama</label>
                    <input type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-dark" placeholder="Nama lengkap" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Email</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-dark" placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Subjek</label>
                  <input type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input-dark" placeholder="Topik diskusi" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Pesan</label>
                  <textarea required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-dark resize-none" placeholder="Ceritakan proyek atau ide Anda..." />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-glow w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold"
                >
                  <Send size={15} />
                  Kirim Pesan
                  <Sparkles size={13} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
