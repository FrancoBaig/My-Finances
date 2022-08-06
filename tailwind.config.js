/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
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
