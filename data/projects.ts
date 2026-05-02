export const categories = ['Semua', 'UI/UX', 'Web App', 'Landing Page']

export const projects = [
  { id: 1, title: 'Dashboard Analytics', category: 'Web App', tags: ['Next.js', 'TypeScript', 'Tailwind'], description: 'Dashboard analitik real-time dengan visualisasi data interaktif, sistem filter canggih, dan tampilan responsif.', gradient: 'from-violet/30 to-violet-dark/20', accent: '#8B5CF6', nebula: 'rgba(109,40,217,0.5)', year: '2024', link: '#', github: '#', icon: '🌌' },
  { id: 2, title: 'E-Commerce Redesign', category: 'UI/UX', tags: ['Figma', 'User Research', 'Prototyping'], description: 'Redesain lengkap platform e-commerce dengan fokus peningkatan konversi dan pengalaman belanja yang mulus.', gradient: 'from-cyan/20 to-cyan/10', accent: '#22D3EE', nebula: 'rgba(6,182,212,0.4)', year: '2024', link: '#', github: '#', icon: '🪐' },
  { id: 3, title: 'Sistem Manajemen Dokumen', category: 'Web App', tags: ['React', 'TypeScript', 'REST API'], description: 'Aplikasi manajemen dokumen pemerintah dengan pencarian cepat, kategorisasi otomatis, dan audit trail.', gradient: 'from-rose/20 to-rose/10', accent: '#F43F5E', nebula: 'rgba(244,63,94,0.4)', year: '2023', link: '#', github: '#', icon: '🌠' },
  { id: 4, title: 'Portfolio Design System', category: 'UI/UX', tags: ['Figma', 'Design System', 'Components'], description: 'Design system komprehensif dengan komponen reusable, panduan tipografi, dan dokumentasi lengkap.', gradient: 'from-violet-light/20 to-violet/10', accent: '#A78BFA', nebula: 'rgba(167,139,250,0.4)', year: '2024', link: '#', github: '#', icon: '✨' },
  { id: 5, title: 'Company Profile Landing', category: 'Landing Page', tags: ['Next.js', 'Framer Motion', 'Tailwind'], description: 'Landing page perusahaan dengan animasi scroll elegan, performa tinggi, dan SEO optimal.', gradient: 'from-emerald-400/15 to-emerald-600/10', accent: '#34D399', nebula: 'rgba(52,211,153,0.4)', year: '2023', link: '#', github: '#', icon: '🌍' },
  { id: 6, title: 'Mobile App UI Kit', category: 'UI/UX', tags: ['Figma', 'Mobile Design', 'iOS/Android'], description: 'UI kit mobile lengkap dengan 200+ komponen, 20+ template layar, dan panduan implementasi.', gradient: 'from-amber-400/15 to-amber-600/10', accent: '#F59E0B', nebula: 'rgba(245,158,11,0.4)', year: '2023', link: '#', github: '#', icon: '🚀' },
]

export type Project = typeof projects[0]
