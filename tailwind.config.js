/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

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
