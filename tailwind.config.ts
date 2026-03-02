import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#2563eb", // blue-600
                    hover: "#1d4ed8", // blue-700
                },
                secondary: {
                    DEFAULT: "#f3f4f6", // gray-100
                    foreground: "#111827", // gray-900
                }
            },
        },
    },
    plugins: [],
};
export default config;
