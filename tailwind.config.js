/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
   safeList: ["h-60", "h-80"],
   mode: "jit",
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         screens: {
            xs: "360px",
            "3xl": "1870px",
         },
         fontSize: {
            xs: "10px",
            sm: "12px",
            md: "14px",
         },
         backgroundImage: {
				'blue-img': 'url("https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=460&h=340&q=100")',
				'green-img': 'url("https://images.unsplash.com/photo-1488330890490-c291ecf62571?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=460&h=340&q=100")',
				'purple-img': 'url("https://images.unsplash.com/photo-1511800453077-8c0afa94175f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=460&h=340&q=100")',
				'red-img': 'url("https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=460&h=340&q=100")',
				'yellow-img': 'url("https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=460&h=340&q=100")'
			},
			colors: {
				gray: {
					'900': '#0f1011'
				}
			},
			minHeight: {
				'14': '3.5rem'
			},
			minWidth: {
				'14': '3.5rem'
			},
			transitionTimingFunction: {
				'in-out': 'cubic-bezier(0.2, 1, 0.25, 1)'
			}
      },
      fontFamily: {
         sans: ['"Poppins"', "sans-serif"],
         logo: ["Yellowtail", "cursive"],
         heroTitle: ["Preahvihear", "sans-serif"],
         desc: ["Montserrat", "sans-serif"],
      },
   },
   darkMode: "class",
   plugins: [
      nextui({
         themes: {
            dark: {
               extend: "dark", // <- inherit default values from dark theme
               colors: {
                  background: "#0D001A",
                  foreground: "#0f0f0f",
                  base: '#000000',
                  fontBase: '#919191',
                  fontHeader: 'rgb(156 163 175)',
                  darkBase: '#2E2E30', 
                  primary: {
                     50: "#3B096C",
                     100: "#520F83",
                     200: "#7318A2",
                     300: "#9823C2",
                     400: "#c031e2",
                     500: "#DD62ED",
                     600: "#F182F6",
                     700: "#FCADF9",
                     800: "#FDD5F9",
                     900: "#FEECFE",
                     DEFAULT: "#DD62ED",
                     foreground: "#ffffff",
                  },
                  focus: "#F182F6",
               },
               layout: {
                  disabledOpacity: "0.3",
                  borderWidth: {
                     small: "1px",
                     medium: "2px",
                     large: "3px",
                  },
               },
            },
            light:{
               extend: "light", // <- inherit default values from dark theme
               colors: {
                  background: "#0D001A",
                  backgroundd: "#0f0f0f",
                  foreground: "#ffffff",
                  base: '#f5f8fa',
                  fontBase: '#919191',
                  fontHeader: 'rgb(156 163 175)',
                  primary: {
                     50: "#3B096C",
                     100: "#520F83",
                     200: "#7318A2",
                     300: "#9823C2",
                     400: "#c031e2",
                     500: "#DD62ED",
                     600: "#F182F6",
                     700: "#FCADF9",
                     800: "#FDD5F9",
                     900: "#FEECFE",
                     DEFAULT: "#DD62ED",
                     foreground: "#ffffff",
                  },
                  focus: "#F182F6",
               },
               layout: {
                  disabledOpacity: "0.3",
                  borderWidth: {
                     small: "1px",
                     medium: "2px",
                     large: "3px",
                  },
               },
            },
            
         },
      }),
   ],
};
