import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'river-adventurer': 'River Adventurer',
      },
      keyframes: {
        scale: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '1',
          },
        },

        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(90deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '75%': { transform: 'rotate(270deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        scale: 'scale 1.5s ease-in-out infinite',
        spin: 'spin 4s ease-in infinite',
      },
    },
  },
  plugins: [],
};

export default config;
