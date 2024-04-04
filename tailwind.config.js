/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkOnyx: '#313131',
        darkSlateGray: '#525252',
        darkCharcoal: '#414141',
        darkCrimsonRed: '#CA3E47'
      },
      padding: {
        safe: 'env(safe-area-inset-bottom)'
      }
    }
  }

  // corePlugins: {
  //   preflight: false
  // }
}
