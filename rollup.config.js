import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const formats = ["cjs", "es"];
export default formats.map(format => ({
	input: 'src/index.js',
	output: {
		file: `dist/${format}/index.js`,
		format
	},
	external: ['react', 'react-dom', 'prop-types'],
	plugins: [
		babel({
			exclude: "node_modules/**",
			presets: [
				[
					"env",
					{
						modules: false
					}
				],
				"react"
			],
			plugins: [
				"transform-class-properties",
				"transform-object-rest-spread",
				"external-helpers"
			],
			babelrc: false
		}),
		commonjs(),
		resolve()
	]
}));