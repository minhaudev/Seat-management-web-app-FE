import {nextui} from "@nextui-org/theme";
import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(spinner|popover).js"
    ],

    theme: {
        colors: {
            "secondary-hover": "#12BDFE",
            "primary-5-hover": "#0376D7",
            "warning-hover": "#F56569",
            "border-warning-hover": "#ED1E24",
            "text-1": "#87898D",
            text: "#3A3B3C",
            "text-light": "#4B5563",
            primary: "#01559B",
            secondary: "#00ADEF",
            stroke: "#E4E4E4",
            highlight: "#F2F5F8",
            white: "#FFFFFF",
            input: "#929292",
            unit: "#A2A5A9",
            green: "#69AA43",
            greenLight: "#70E28D",
            orange: "#ED8400",
            red: "#ED1E24",
            dangerous: "#FFF4F4",
            violet: "#A644F6",
            blue: "#5A92F7",
            pink: "#FFEDDF",
            yellow: "#F5BF00",

            gray: "#9A9C9F",
            "gray-1": "#FFFFFF",
            "gray-2": "#FAFAFA",
            "gray-3": "#F5F5F5",
            "gray-4": "#d9d9d9",
            "gray-5": "#FFFFFF",
            "gray-6": "#bfbfbf",
            "gray-7": "#8c8c8c",
            "gray-8": "#595959",
            "gray-9": "#434343",
            "gray-10": "#262626",
            "gray-11": "#1f1f1f",
            "gray-12": "#141414",
            "blue-bold": "#1E4D83",
            "primary-1": "#111D2C",
            "primary-2": "#112A45",
            "primary-3": "#15395B",
            "primary-4": "#164C7E",
            "primary-5": "#01559B",
            "primary-6": "#1765AD",
            "primary-7": "#177DDC",
            "primary-8": "#3C9AE8",
            "primary-9": "#65B7F3",
            "primary-10": "#65B7F3",
            "custom-light-blue": "#EDFAFF"
        },
        extend: {
            backgroundColor: {
                red: "#D6292E",
                gray: "#BBBBBC",
                black: "#3A3B3C",
                error: "#FFFBEB",
                normal: "#EDFAFF",
                success: "#D2E5F5",
                warning: "#FCE7E7",
                "red-bold": "#ED1E24",
                "red-light": "#FFEEEE",
                "gray-light": "#E9E9E9",
                "green-bold": "#69AA43",
                "green-light": "#F2FFEB",
                "yellow-light": "#FFFBEB"
            },
            backgroundImage: {
                "custom-gradient-cart":
                    "linear-gradient(56.43deg, #008ECF 0.8%, #0083C5 55.9%, #0088CA 72.63%, #0098D9 94.28%, #009DDE 99.2%)",
                "custom-gradient":
                    "linear-gradient(90deg, #00ADEE 0%, #0087CA 15%, #006CAF 29%, #005CA0 41%, #00569A 50%, #005CA0 59%, #006CAF 71%, #0087CA 85%, #00AEEF 100%)"
            },
            fontSize: {
                "title-20": "20pt",
                "title-16": "16pt",
                "body-14": "14pt",
                "body-13": "13pt",
                "body-12": "12pt",
                "captions-11": "11pt"
            },
            lineHeight: {
                "title-20": "1",
                "title-16": "1",
                "body-14": "1",
                "body-13": "1",
                "body-12": "1",
                "captions-11": "12pt"
            },
            fontWeight: {
                light: "300",
                regular: "400",
                medium: "500",
                semibold: "600",
                bold: "700"
            },
            borderRadius: {
                "custom-sm": "5px"
            },
            borderColor: {
                input: "#D0D5DD",
                normal: "#00ADEF",
                stroke: "#E4E4E4",
                warning: "#ED1E24",
                success: "#01559B"
            },
            maxWidth: {
                "custom-448": "448px"
            },
            keyframes: {
                fadeIn: {
                    "0%": {opacity: "0", transform: "translateY(-20px)"},
                    "100%": {opacity: "0.5", transform: "translateY(0)"}
                },
                fadeOut: {
                    "0%": {opacity: "0.5", transform: "translateY(0)"},
                    "100%": {opacity: "0", transform: "translateY(-20px)"}
                }
            },
            animation: {
                fadeIn: "fadeIn 1000ms ease-out",
                fadeOut: "fadeOut 1000ms ease-out",
                "spin-slow": "spin 5s linear infinite",
                wiggle: "wiggle 3s ease-in-out infinite"
            }
        },

        fontFamily: {
            "sf-ui-display": ["SF UI Display", "sans-serif"],
            "wendy-one": ["Wendy One", "sans-serif"]
        }
    },
    plugins: [nextui()]
};
export default config;
