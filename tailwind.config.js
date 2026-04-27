/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D084',
        'primary-dark': '#00B872',
        'primary-light': '#33DAAA',
        surface: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E8ECF0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
      boxShadow: {
        'premium': '0 4px 40px -8px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 8px 60px -12px rgba(0, 0, 0, 0.12)',
        'premium-xl': '0 20px 80px -20px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 40px rgba(0, 208, 132, 0.15)',
        'glow-lg': '0 0 60px rgba(0, 208, 132, 0.2)',
      },
    },
  },
  plugins: [],
}