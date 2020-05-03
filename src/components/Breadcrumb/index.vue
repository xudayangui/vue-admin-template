<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
				<span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
				<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp' //url 的正则表达式

export default {
	data() {
		return {
			levelList: null
		}
  	},
	watch: {
		$route() {
		this.getBreadcrumb()
		}
	},
	created() {
		this.getBreadcrumb()
	},
  methods: {
		getBreadcrumb() {
			// 仅显示带有meta.title的路线
			let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
			const first = matched[0]
			if (!this.isDashboard(first)) {
				matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
			}

			this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
		},
		// 是首页 返回 ture
		isDashboard(route) {
			const name = route && route.name
			if (!name) {
				return false
			}
			return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
		},
		pathCompile(path) {
			// 解决面包屑不支持 id
			const { params } = this.$route
			//快速填充 url 字符串的参数值
			var toPath = pathToRegexp.compile(path)
			return toPath(params)
		},
		// 点击面包屑
		handleLink(item) {
			const { redirect, path } = item
			if (redirect) {
				this.$router.push(redirect)
				return
			}
			this.$router.push(this.pathCompile(path))
		}
  	}
}
</script>

<style lang="scss" scoped>
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 8px;

		.no-redirect {
			color: #97a8be;
			cursor: text;
		}
	}
</style>
