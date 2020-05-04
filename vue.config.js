'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

//如果您的端口设置为80，
//使用管理员权限执行命令行。
//例如，Mac：sudo npm run
//您可以通过以下方法更改端口：
// port = 9528 npm run dev或npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

//所有配置项说明都可以在https://cli.vuejs.org/config/中找到
module.exports = {
	publicPath: '/',  //默认'/'，部署应用包时的基本 URL
	outputDir: 'dist', // 输出文件目录
	assetsDir: 'static', // 静态文件目录
	lintOnSave: false,   // eslint-loader 是否在保存的时候检查
	productionSourceMap: false,// 生产环境的 source map
	devServer: {
		port: port, //端口
		open: true,  // 是否打开浏览器
		overlay: {   // 让浏览器 overlay 同时显示警告和错误
			warnings: false,
			errors: true
		},
		// 配置 proxy 代理解决跨域问题
		proxy: {
			"/api": {
				target:"https://www.fastmock.site/mock/dc7443a19584b44d30f08d682225761c/api", // 目标代理接口地址
				secure: false,
				changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
				// ws: true, // 是否启用websockets
				pathRewrite: {
					"^/api": "/"
				}
			}
		},
		// before: require('./mock/mock-server.js')
	},
	configureWebpack: {
		name: name,
		resolve: {
			// 添加别名 alias
			alias: {
				'@': resolve('src')
			}
		}
	},
	// webpack配置
	chainWebpack(config) {
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		// set preserveWhitespace
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()

		config
			// https://webpack.js.org/configuration/devtool/#development
			.when(process.env.NODE_ENV === 'development',
				config => config.devtool('cheap-source-map')
			)

		config
			.when(process.env.NODE_ENV !== 'development',
				config => {
					config
						.plugin('ScriptExtHtmlWebpackPlugin')
						.after('html')
						.use('script-ext-html-webpack-plugin', [{
							// `runtime` must same as runtimeChunk name. default is `runtime`
							inline: /runtime\..*\.js$/
						}])
						.end()
					config
						.optimization.splitChunks({
							chunks: 'all',
							cacheGroups: {
								libs: {
									name: 'chunk-libs',
									test: /[\\/]node_modules[\\/]/,
									priority: 10,
									chunks: 'initial' // only package third parties that are initially dependent
								},
								elementUI: {
									name: 'chunk-elementUI', // split elementUI into a single package
									priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
									test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
								},
								commons: {
									name: 'chunk-commons',
									test: resolve('src/components'), // can customize your rules
									minChunks: 3, //  minimum common number
									priority: 5,
									reuseExistingChunk: true
								}
							}
						})
					config.optimization.runtimeChunk('single')
				}
			)
	}
}
