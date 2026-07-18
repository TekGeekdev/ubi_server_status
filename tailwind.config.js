/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Valeurs définies en variables CSS dans index.css (mode jour/nuit)
      colors: {
        div2: {
          bg: 'rgb(var(--div2-bg) / <alpha-value>)',
          surface: 'rgb(var(--div2-surface) / <alpha-value>)',
          'surface-raised': 'rgb(var(--div2-surface-raised) / <alpha-value>)',
          border: 'rgb(var(--div2-border) / <alpha-value>)',
          orange: 'rgb(var(--div2-orange) / <alpha-value>)',
          'orange-light': 'rgb(var(--div2-orange-light) / <alpha-value>)',
          'orange-dark': 'rgb(var(--div2-orange-dark) / <alpha-value>)',
          red: 'rgb(var(--div2-red) / <alpha-value>)',
          green: 'rgb(var(--div2-green) / <alpha-value>)',
          yellow: 'rgb(var(--div2-yellow) / <alpha-value>)',
          blue: 'rgb(var(--div2-blue) / <alpha-value>)',
          purple: 'rgb(var(--div2-purple) / <alpha-value>)',
          text: 'rgb(var(--div2-text) / <alpha-value>)',
          muted: 'rgb(var(--div2-muted) / <alpha-value>)',
          heading: 'rgb(var(--div2-heading) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
