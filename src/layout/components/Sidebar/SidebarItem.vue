<template>
    <div v-if="!item.hidden">
		<template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
			<router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
					<i :class="onlyOneChild.meta.icon"></i>
					<span slot="title">{{onlyOneChild.meta.title}}</span>
				</el-menu-item>
			</router-link>
		</template>

		<el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
			<template slot="title">
				<i :class="item.meta.icon"></i>
				<span slot="title">{{item.meta.title}}</span>
			</template>
			<sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu"/>
		</el-submenu>
    </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
	name: 'SidebarItem',
	props: {
		item: {
			type: Object,
			required: true
		},
		isNest: {
			type: Boolean,
			default: false
		},
		basePath: {
			type: String,
			default: ''
		}
	},
	data() {
		// To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
		// 用渲染功能重构
		this.onlyOneChild = null
		return {}
	},
	methods: {
		hasOneShowingChild(children = [], parent) {
			const showingChildren = children.filter(item => {
				if (item.hidden) {
					return false
				} else {
					// 临时集（如果只有一个显示子级，将使用该集）
					this.onlyOneChild = item
					return true
				}
			})
			//当只有一个子路由器时，默认情况下会显示该子路由器
			if (showingChildren.length === 1) {
				return true
			}

			// 如果没有子路由器要显示，请显示父
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
				return true
			}

			return false
		},
		resolvePath(routePath) {
			if (isExternal(routePath)) {
				return routePath
			}
			if (isExternal(this.basePath)) {
				return this.basePath
			}
			//path.resolve 把一个路径或路径片段的序列解析为一个绝对路径
			return path.resolve(this.basePath, routePath)
		}
	}
}
</script>
