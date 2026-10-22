/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine:      '#6B1F3A',
        burgundy:  '#4A0E22',
        rose:      '#C4748A',
        blush:     '#E8B4BC',
        cream:     '#F5EDE8',
        gold:      '#C9A84C',
        champagne: '#E8D5A0',
        dark:      '#0D0608',
        charcoal:  '#1A0C10',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
