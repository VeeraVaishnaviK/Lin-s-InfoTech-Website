import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    red: '#E3000F',
                    redHover: '#FF2D3A',
                    darkBg: '#0A0A0A',
                    card: '#111111',
                    border: '#1F1F1F',
                },
            },
        },
    },
    plugins: [],
};
export default config;
