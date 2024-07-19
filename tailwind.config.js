/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "discord":"#2e3035",
        "project":"#3b444b",
        "endpoint":"#2b2d31",
        "succes":"#49af41",
        "post":"#61affe",
        "delete":"#f93e3e",
        "put":"#fca130",
        "nb":"#171717"

      }
    },
  },
  plugins: [],
}

