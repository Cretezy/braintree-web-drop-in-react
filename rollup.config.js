import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from "./package.json";

export default [{
	input: 'src/index.js',
	output: [{
		file: pkg.module,
		format: "es"
	}, {
		file: pkg.main,
		format: "cjs"
	}],
	external: ['react', 'react-dom', 'prop-types', 'braintree-web-drop-in'],
	plugins: [
		babel({
			sourceMap: true,
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
				"external-helpers",
				"transform-runtime"
			],
			babelrc: false,
			runtimeHelpers: true
		}),
		commonjs(),
		resolve()
	]
}]
