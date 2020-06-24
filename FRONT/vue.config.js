const path = require('path')

module.exports = {
	publicPath: '/',
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				"views": path.resolve(__dirname, 'src/views/'),
			}
		}
	},
	devServer: {
		port: "9526",
		proxy: {
			'/api': {
				target: 'http://localhost:3526/',
				pathRewrite: {
					'^/api': '',
				}
			},
		}
	},
}