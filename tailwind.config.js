/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./source/**/*.{html,js,css}",
            "!./source/css/ownInputs.css"],
  theme: {
    fontFamily: {
      'Montserrat' : 'Montserrat'
    },
    fontSize: {
      'title' : '10vh',
      'subtitle' : '6vh',
      'info' : '4vh',
    },
    cursor: {
      'own' : 'url(utils\Cursors\cursor.cur), auto'
    },
    extend: {},
  },
  plugins: [],
}
