export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transformOrigin: {
        center: 'center',
      },
      keyframes: {
        popin: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.8) rotate(-20deg)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1) rotate(-20deg)',
          },
        },
      },
      animation: {
        popin: 'popin 0.3s cubic-bezier(.4, 2, .6, 1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
        '.transform-style': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      })
    },
  ],
}
