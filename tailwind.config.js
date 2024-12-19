/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}",],
  theme: {
    extend: {
      backgroundImage:{
           'yellow-gray': 'linear-gradient(to bottom, #FFD233,#C4C4C5)',
           'createcars':"url('https://images.unsplash.com/photo-1480790846976-3aeb0c976d71?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          //  7543FF
      }
    },
  },
  plugins: [],
}

