import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(95% 0.04 270)',
          100: 'oklch(90% 0.06 270)',
          200: 'oklch(80% 0.12 270)',
          300: 'oklch(70% 0.16 270)',
          400: 'oklch(62% 0.2 270)',
          500: 'oklch(55% 0.22 270)',
          600: 'oklch(48% 0.2 270)',
          700: 'oklch(42% 0.18 270)',
          800: 'oklch(35% 0.14 270)',
          900: 'oklch(28% 0.1 270)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
