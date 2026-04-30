# 🎨 Portfolio — Pranata Komputer

Portfolio pribadi modern dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Framer Motion.

## ✨ Fitur

- **Animasi halus** menggunakan Framer Motion (scroll reveal, floating elements, transitions)
- **Tema Light & Clean** dengan palet warna cream + gold yang elegan
- **Fully Responsive** — mobile, tablet, dan desktop
- **Komponen lengkap:** Hero, About, Skills, Projects, Experience, Contact, Footer
- **Dark Navbar** yang berubah saat scroll
- **Filter Proyek** dengan animasi layout
- **Form Kontak** interaktif
- **Performa tinggi** dengan Next.js App Router

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) — React Framework
- [TypeScript](https://www.typescriptlang.org/) — Type Safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animasi
- [Lucide React](https://lucide.dev/) — Icons

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18.17+ 
- npm / yarn / pnpm

### Instalasi

```bash
# Clone atau ekstrak folder portfolio
cd portfolio

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Folder

```
portfolio/
├── app/
│   ├── globals.css       # Global styles + custom CSS
│   ├── layout.tsx        # Root layout + fonts
│   └── page.tsx          # Main page
├── components/
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills & stack
│   ├── Projects.tsx      # Projects showcase
│   ├── Experience.tsx    # Timeline pengalaman
│   ├── Contact.tsx       # Form kontak
│   └── Footer.tsx        # Footer
├── public/               # Static assets
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Kustomisasi

### Ganti Nama & Info Pribadi
Edit file komponen berikut:
- `components/Hero.tsx` — Nama, deskripsi, link sosial
- `components/About.tsx` — Bio, statistik
- `components/Experience.tsx` — Pengalaman kerja & pendidikan
- `components/Projects.tsx` — Daftar proyek
- `components/Contact.tsx` — Info kontak
- `components/Footer.tsx` — Nama & links

### Ganti Warna
Edit `tailwind.config.ts` — ubah nilai warna `gold`, `cream`, `ink`, dll.

## 📦 Build Production

```bash
npm run build
npm start
```

## 🌐 Deploy ke Vercel

```bash
npm install -g vercel
vercel
```

---

Made with ❤️ di Makassar, Sulawesi Selatan
