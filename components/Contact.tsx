'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || ''
const contactInfo = [
  ...(contactEmail
    ? [{ icon: Mail, label: 'Email', value: contactEmail, href: `mailto:${contactEmail}`, color: '#8B5CF6' }]
    : []),
  { icon: MapPin, label: 'Lokasi', value: 'Magelang, Jawa Tengah', color: '#F43F5E' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!contactEmail) {
      setFormError('Alamat email kontak belum dikonfigurasi oleh pemilik situs.')
      return
    }

    const subject = encodeURIComponent(form.subject.trim() || `Pesan portofolio dari ${form.name.trim()}`)
    const body = encodeURIComponent(
      `Nama: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`,
    )
    window.location.assign(`mailto:${contactEmail}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
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
            {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => {
              const content = (
                <>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-text-faint mb-0.5 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-text-main">{value}</p>
                  </div>
                </>
              )

              return href ? (
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
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 glass rounded-2xl p-5 border border-white/5"
                >
                  {content}
                </motion.div>
              )
            })}

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
                <h3 className="font-display font-bold text-2xl text-text-main mb-2">Aplikasi Email Dibuka</h3>
                <p className="text-text-muted">Periksa dan kirim pesan melalui aplikasi email Anda.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Nama</label>
                    <input id="contact-name" name="name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      maxLength={100} autoComplete="name" className="input-dark" placeholder="Nama lengkap" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Email</label>
                    <input id="contact-email" name="email" type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={254} autoComplete="email" className="input-dark" placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Subjek</label>
                  <input id="contact-subject" name="subject" type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    maxLength={150} className="input-dark" placeholder="Topik diskusi" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-text-faint mb-2 uppercase tracking-wider">Pesan</label>
                  <textarea id="contact-message" name="message" required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={3000} className="input-dark resize-none" placeholder="Ceritakan proyek atau ide Anda..." />
                </div>
                {formError && (
                  <p role="alert" className="text-sm text-rose-300">{formError}</p>
                )}
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
