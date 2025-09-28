import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", 
      " coffee" ,      // thème clair
      "dark",           // thème sombre
      "cupcake",        // thème coloré sympa
      "dracula",        // thème sombre violet
      "business",
      "forest"  , 
        // thème pro
      // Tu peux ajouter d'autres thèmes disponibles ici
    ],
    darkTheme: "coffee",  // thème à utiliser pour le mode sombre
  },
};
