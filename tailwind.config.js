/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "xxs": "360px",
      'xs': "375px",
      'xs1': "390px",
      'xs2': "410px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      "laptop": "1366px"
    },
    extend: {

      fontFamily: {
        telenor: ["Telenor", "sans-serif"],
      },

      borderWidth: {
        1: "1px",
      },

      fontSize: {
        "xxs": ".63rem"
      },

      container: {
        screens: {
          lg: "1100px"
        }
      },

      spacing: {

      },

      colors: {
        minutes: "#ee395a",
        sms: "#4abbc3",
        bioscope: "#c34ab7",
        validity: "#76c779",
        internet: "#76c779",
        disabled: "#f5f5f5",
        description: "#767676"
      }
    },
  },
  plugins: [],
}
