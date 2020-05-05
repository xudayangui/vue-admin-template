<template>
	<div class="navbar">
		<!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<span style="display:block;cursor:pointer;font-size:15px; margin-right:25px;" @click.native="logout">
				<i class="el-icon-switch-button" style="margin-right:5px;"></i>退出
			</span>
		</div>
	</div>
</template>

<script>
//从vuex 引入 mapGetters 方法
import { mapGetters } from 'vuex'
//引入面包屑组件
import Breadcrumb from '@/components/Breadcrumb'
//引入展开 收缩菜单栏 组件
import Hamburger from '@/components/Hamburger'

export default {
	components: {
		Breadcrumb,
		Hamburger
	},
	computed: {
		...mapGetters([
			'sidebar',
			'avatar'
		])
	},
	methods: {
		//伸缩
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		},
		//退出
		async logout() {
			await this.$store.dispatch('user/logout')
			this.$router.push(`/login?redirect=${this.$route.fullPath}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0,21,41,.08);

	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background .3s;
		-webkit-tap-highlight-color:transparent;

		&:hover {
			background: rgba(0, 0, 0, .025)
		}
  	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}
	}
}
</style>
