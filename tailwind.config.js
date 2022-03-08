module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./containers/**/*.{html,js}"
        // , "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        screens: {
            '2xs': '320px',
            'xs': '560px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        }
    },
    plugins: [require("daisyui")]
};