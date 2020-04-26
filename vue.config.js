const webpack = require("webpack");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

let env = process.env.NODE_ENV;
module.exports = {
	// 基本路径,打包时加上.
	// 如果是hash模式
	publicPath: env !== "development" ? "./" : "/",
	
	// 如果是history模式
	// publicPath: env !== "development" ? "/" : "/",

	// 静态资源目录 (js, css, img, fonts)
	assetsDir: "assets",

	// 输出文件目录
	outputDir: "dist",

	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: env !== "development" ? false : true,

	//是否使用包含运行时编译器的 Vue 构建版本
	runtimeCompiler: true,

	// css相关配置
	css: {
		// extract: true, // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: true  // 开启 CSS source maps

	},

	//修改webpack-dev-server配置（尤其是跨域代理）
	devServer: {
		port: 8083, // 端口
		host: "0.0.0.0", // 允许外部ip访问
		hot: true, //热更新
		open: true, // 自动打开浏览器
		https: false, // 启用https
		// disableHostCheck: true, //绕过主机检查
		overlay: {
			warnings: true,
			errors: true
		},// 错误、警告在页面弹出
		proxy: {
			"/api": {
				target: "127.0.0.1", //对应跨域的接口
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	},
	// webpack配置项
	chainWebpack: config => {
		config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
	},
	//=>设置一些webpack配置项，用这些配置项和默认的配置项合并
	configureWebpack: config => {
		if (env !== "development") {
			// // 为开发环境修改配置... 配置打包 压缩js
			config.plugins.push(
				new CompressionWebpackPlugin({
					algorithm: "gzip",
					test: /\.js$|\.html$|.\css/, //匹配文件名
					threshold: 10240, //对超过10k的数据压缩
					deleteOriginalAssets: false, //不删除源文件
					minRatio: 0.8
				})
			);
		}else{
			// 为生产环境修改配置...
		}
		Object.assign(config, {
			// 开发生产共同配置
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components'),
					'@v': path.resolve(__dirname, './src/views')
				} // 别名配置
			}
		})
	}
};