const tailwindcss = require('tailwindcss');
module.exports = {
	plugins: [tailwindcss('./tailwind.js'), require('autoprefixer')],
	theme: {
		extend: {
			gridColumn: {
				'span-16': 'span 16 / span 16'
			}
		}
	}
};
