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
      },
      animation: {
        scale: 'scale 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
