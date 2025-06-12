/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        slideLeft: "slideLeft 1s ease-in-out forwards",
        slideRight: "slideRight 1s ease-in-out forwards",
      },
      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100vw)" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      fontFamily: {
        lato: ['"Lato"', "sans-serif"],
        lora: ['"Lora"', "serif"],
        mulish: ['"Mulish"', "sans-serif"],
        prompt: ['"Prompt"', "sans-serif"],
      },
      colors: {
        orange100: "#FFC295",
        orange200: "#F28738",
        orange400: "#CD5C08",
        orange600: "#93440A",
        sage200: "#CEE5D0",
        sage400: "#B0D2B3",
        sage600: "#6E9371",
        teal200: "#9AC6B5",
        teal400: "#6A9C89",
        teal600: "#30624F",
        cream200: "#FFF8ED",
        cream400: "#FFF5E4",
        cream600: "#F3DDB8",
        "cold-grey200": "#B7C8C2",
        "cold-grey400": "#8DA19A",
        "cold-grey600": "#202523",
        "warm-grey200": "#CCC7C3",
        "warm-grey400": "#908985",
        "warm-grey600": "#282624",
        green: "#48CC54",
        red: "#E71D35",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-img": "url('/hero-img.png')",
        "gradient-1":
          "linear-gradient(239deg, #F28738 -15.88%, #CD5C08 95.28%)",
        "gradient-2":
          "linear-gradient(140deg, #E1FAE3 -8.21%, #6E9371 119.15%)",
        "gradient-3": "linear-gradient(212deg, #9AC6B5 2.39%, #30624F 129.28%)",
        "gradient-4": "linear-gradient(156deg, #F3DDB8 3.19%, #FFF8ED 125.24%)",
      },
    },
  },
  plugins: [],
};
