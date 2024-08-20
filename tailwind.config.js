const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["index.html","./src/**/*.{html,js,jsx,tx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
    extend: {},
  },
  plugins: [],
})

