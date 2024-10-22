/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}",],
  theme: {
    extend: {
      backgroundImage:{
           'yellow-gray': 'linear-gradient(to bottom, #FFD233,#C4C4C5)'
          //  7543FF
      }
    },
  },
  plugins: [],
}

