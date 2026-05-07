module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1B4332', light: '#2D6A4F' },
        lime: { DEFAULT: '#74C69D', light: '#95D5B2' },
        gold: { DEFAULT: '#FFD700', dim: '#F2C94C' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 5px rgba(255,215,0,0.3)' }, '50%': { boxShadow: '0 0 20px rgba(255,215,0,0.6)' } },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
