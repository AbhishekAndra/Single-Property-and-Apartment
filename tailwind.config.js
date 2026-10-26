/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFCFA',
          100: '#F9F8F6',
          200: '#F3EFEA',
          300: '#E8E2D8',
          400: '#D5CDC0',
          500: '#B8ADA0',
        },
        bronze: {
          light: '#DFCFB7',
          DEFAULT: '#C5A880',
          dark: '#9A784E',
          deep: '#695133',
        },
        graphite: {
          50: '#F5F5F4',
          100: '#E7E6E4',
          300: '#B0AEA9',
          500: '#73706A',
          700: '#3D3B37',
          800: '#242321',
          900: '#141413',
          950: '#0A0A09',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'super-wide': '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinematic': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
}

