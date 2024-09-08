import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	colors: {
  		'red': '#ED1C24',
  		'dark-red': '#CC1B21',
  		'dark-gray': '#363739',
  		'gray': '#757678',
  		'white': '#F1F8FD',
  		'light-white': '#FCFEFF'
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		boxShadow: {
  			custom: '4px 4px 24px 0 rgba(14, 14, 14, 0.05)'
  		},
  		screens: {
  			xxs: '320px',
  			xs: '375px',
  			sm: '425px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px',
  			'4k': '3840px'
  		},
  		fontFamily: {
  			'open-sans': ['var(--font-open-sans)'],
  			'montserrat': ['var(--font-montserrat)']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config