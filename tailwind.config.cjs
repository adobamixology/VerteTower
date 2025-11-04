// tailwind.config.cjs
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#14532d',
      },
      fontFamily: {
        sans: ['Inter', 'Lexend', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-body': 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-leaf': 'pulseLeaf 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseLeaf: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'scale(1.2)',
            opacity: '1'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 0 8px rgba(34, 197, 94, 0)',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '300ms',
      },
      boxShadow: {
        'chart-glow': '0 4px 20px rgba(34, 197, 94, 0.1)',
        'chart-glow-hover': '0 8px 30px rgba(34, 197, 94, 0.15)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glass-strong': {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        },
        '.gradient-shimmer': {
          backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s infinite',
        },
        '.smooth-transition': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.chart-glow': {
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)',
          transition: 'box-shadow 0.3s ease',
        },
        '.chart-glow:hover': {
          boxShadow: '0 8px 30px rgba(34, 197, 94, 0.15)',
        },
        '.pulse-glow': {
          animation: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      })
    }),
  ],
}