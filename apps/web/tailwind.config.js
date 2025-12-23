// /** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      ProximaRegular: ["ProximaNova Regular"],
      ProximaBold: ["ProximaNova Bold"],
    },
    screens: {
      mobile: {
        min: "100px",
        max: "550px",
      },
      tablet: {
        min: "550px",
        max: "750px",
      },
      "mini-laptop": {
        min: "750px",
        max: "874px",
      },
      laptop: {
        min: "874px",
        max: "1280px",
      },
      desktop: {
        min: "1280px",
      },
    },
    borderWidth: {
      DEFAULT: "0.5px",
    },

    extend: {
      // Colores personalizados para el modo oscuro
      colors: {
        darkBackground: '#121212',
        darkText: '#ffffff',
        lightBackground: '#ffffff',
        lightText: '#000000',
      },
      // Agregar transición suave para animaciones
      transitionDuration: {
        200: '200ms',
      },
      // Hacer que las imágenes tengan transición al cambio de estado
      transitionProperty: {
        'transform': 'transform',
        'opacity': 'opacity',
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
  },
};
