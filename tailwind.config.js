// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
