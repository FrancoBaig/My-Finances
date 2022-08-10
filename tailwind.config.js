/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                xl: "24px",
            },
            colors: {
                primary: "#344154",
                "primary-hover": "#222b38",
            },
        },
    },
    plugins: [],
};
