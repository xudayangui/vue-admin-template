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
	publicPath: process.env.NODE_ENV === "production" ? "/vue-admin-template/" : "/", //默认'/'，部署应用包时的基本 URL
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
		}
	},
	configureWebpack: {
		name: name,
		performance: {
			hints:false // 取消打包文件过大的警告
		},
		resolve: {
			// 添加别名 alias
			alias: {
				'@': resolve('src')
			}
		}
	},
	// webpack配置
	chainWebpack(config) {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true //保留元素之间空格
				return options
			})
			.end()

		config
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
							// `runtime`必须与runtimeChunk名称相同。默认是“runtime”
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
									chunks: 'initial' // 仅打包最初依赖的第三方
								},
								elementUI: {
									name: 'chunk-elementUI', // 将elementUI拆分为一个包
									priority: 20, // 大小需要大于libs和app，否则将打包到libs或app中
									test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
								},
								commons: {
									name: 'chunk-commons',
									test: resolve('src/components'), // 可以自定义您的规则
									minChunks: 3, //  最小共同数
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
