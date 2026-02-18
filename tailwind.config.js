/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF", // System Blue
        background: "#F2F2F7", // System Grouped Background
        card: "#FFFFFF",
        text: "#000000",
        secondary: "#8E8E93", // System Gray
        success: "#34C759", // System Green
        warning: "#FF9500", // System Orange
        danger: "#FF3B30", // System Red
      },
      fontFamily: {
        sans: ["System"], // Use system font stack for simplicity and platform-native feel
      },
    },
  },
  plugins: [],
};
