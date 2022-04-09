const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "375px",
      desktop: "1440px",
    },
    fontFamily: {
      sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      light: 300,
      semibold: 600,
      extrabold: 800,
    },
    colors: {
      white: "hsl(0, 0%, 100%)",
      blue: {
        700: "hsl(209, 23%, 22%)",
        800: "hsl(207, 26%, 17%)",
        900: "hsl(200, 15%, 8%)",
      },
      gray: {
        50: "hsl(0, 0%, 98%)",
        500: "hsl(0, 0%, 52%)",
      },
      extend: {},
    },
  },
  plugins: [],
};
