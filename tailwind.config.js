/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        customThin: ['Thin'],
        customXLight: ['Xlight'],
        customLight: ['Light'],
        customMedium: ['Medium'],
        customRegular: ['Regular'],
        customSemiBold: ['SemiBold'],
        customBold: ['Bold'],
        customXBold: ['XBold'],
        customBlack: ['Black'],
        customHeavy: ['Heavy'],
        customItalic: ['Italic']
      },
      colors: {
        blackMain: '#1A1A1A',
        // gray
        grey100: '#FCFCFC',
        grey200: '#F2F2F2',
        grey500: '#f5f5f5',
        grey999: '#999999',
        greyLighter: '#D1D1D6',
        greyLight: '#F8F8F9',
        greyMain: '#F6F6F7',
        // blue
        blueMain: '#5495FC',
        blueDark: '#007AFF',
        // green
        greenLighter: '#00CA39',
        greenLight: '#31D366',
        greenMain: '#60EC8E',
        // green neon
        greenNeonMain: '#06D7A0',
        // orange
        orangeMain: '#FF9900',
        // yellow
        yellowMain: '#FFD020',
        // red
        redMain: '#E33E3E',
        // purple
        purpleMain: '#9A3EE3',
        //pink
        pinkMain: '#F04770'
      },
      backgroundImage: {
        'today-vistor-card': "url('/src/assets/bg/bg-vistor-card.png')",
        earth: "url('/src/assets/bg/bg-earth.png')",
        // linear
        'ln-grey-to-b': 'linear-gradient(0deg, #F2F3F5 0%, rgba(242, 243, 245, 0) 105.07%)',
        'ln-white': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'ln-white-2': 'linear-gradient(180deg, #F6F9FF 0%, rgba(246, 249, 255, 0) 100%)',
        'ln-grey-white': 'linear-gradient(174.32deg, #F8F8F9 -0.3%, rgba(255, 255, 255, 0) 107.82%)',
        'ln-blue-green': 'linear-gradient(225deg, #60EC8E 0%, #5495FC 100%)'
      }
    },
    screens: {
      xs: { max: '639px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    boxShadow: {
      's-1': '0px 0px 80px 0px #1A1A1A0D',
      's-2': '0px 2.58px 26.67px 0px #0000000D',
      's-3': '0px 0px 64px 0px #1A1A1A14'
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1440px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      })
    })
  ]
}
