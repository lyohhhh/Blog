const colors = require('tailwindcss/colors');
module.exports = {
	purge: [
		'./index.html',
		'./src/**/*.{vue,js,ts,tsx,jsx}', // 那些文件
	],
	darkMode: 'class', // or 'media' or 'class'
	content: [],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		colors: {
			...colors,
			themebgcolor: colors.gray,
			themetextcolor: colors.sky,
			themeerrorcolor: colors.red,
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
	variants: {},
};
