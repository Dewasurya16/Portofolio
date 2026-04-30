/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      colors: {
        dark: '#05050A',
        'dark-2': '#0C0C16',
        'dark-3': '#111120',
        violet: '#8B5CF6',
        'violet-light': '#A78BFA',
        'violet-dark': '#6D28D9',
        cyan: '#22D3EE',
        'cyan-light': '#67E8F9',
        rose: '#F43F5E',
        'surface-1': 'rgba(255,255,255,0.03)',
        'surface-2': 'rgba(255,255,255,0.06)',
        'border-1': 'rgba(255,255,255,0.06)',
        'border-2': 'rgba(255,255,255,0.12)',
        'text-main': '#F1F5F9',
        'text-muted': '#94A3B8',
        'text-faint': '#475569',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #8B5CF620 0px, transparent 50%), radial-gradient(at 80% 0%, #22D3EE18 0px, transparent 50%), radial-gradient(at 0% 50%, #F43F5E15 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(139,92,246,0.3)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.3)',
        'glow-rose': '0 0 40px rgba(244,63,94,0.2)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

module.exports = config
