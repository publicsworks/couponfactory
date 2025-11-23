/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1', // Indigo 500
                secondary: '#ec4899', // Pink 500
                dark: '#1f2937', // Gray 800
            }
        },
    },
    plugins: [],
}
