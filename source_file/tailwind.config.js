/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./func/*/*.{html,js,css}", "./func/ocr/ocr.html"],
  theme: {
    screens: {
      'sm': {'max': '1000px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '1000px', 'max': '1200px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1200px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
