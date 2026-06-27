import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14213d",
        saffron: "#fca311",
        leaf: "#2a9d8f",
        paper: "#f8f7f3"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(20, 33, 61, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
