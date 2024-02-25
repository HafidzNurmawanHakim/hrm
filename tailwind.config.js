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
                  backgroundd: "#0f0f0f",
                  foreground: "#ffffff",
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
                  // radius: {
                  // 	small: "4px",
                  // 	medium: "6px",
                  // 	large: "8px",
                  // },
                  borderWidth: {
                     small: "1px",
                     medium: "2px",
                     large: "3px",
                  },
               },
            },
            light: {
               layout: {},
               colors: {
                  base: "#f5f8fa",
               },
            },
            // dark: {
            //    layout: {},
            //    colors: {
            //       primary: "#0A2647",
            //    },
            // },
         },
      }),
   ],
};
