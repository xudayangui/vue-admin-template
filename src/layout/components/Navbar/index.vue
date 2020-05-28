<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<span @click="handleFullScreen" class="fullScreen">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="el-icon-full-screen"></i>
				</el-tooltip>
			</span>
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					{{name}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="toPerson">
						个人信息
					</el-dropdown-item>
					<el-dropdown-item>
						<a href="https://github.com/xudayangui/vue-admin-template" target="view_window">项目仓库</a>
					</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
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
	 data() {
        return {
            fullscreen: false,
        };
    },
	components: {
		Breadcrumb,
		Hamburger
	},
	computed: {

		...mapGetters([
			'sidebar','name'
		])
	},
	methods: {
		toPerson() {
			this.$router.push({ name: "personal" });
		},
		toggleMsgShow(){},
		//伸缩
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		},
		//全屏
		handleFullScreen(){
			let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
		},
		//退出
		async logout() {
			this.$confirm('是否退出?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			 }).then(async() => {
				await this.$store.dispatch('user/logout')
				this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			}).catch(() => {

			});
		}
	}
}
</script>

<style lang="scss" scoped>
.fullScreen {
	padding-right:10px;
	cursor: pointer;
}
.el-dropdown-link {
    cursor: pointer;
	color: #409EFF;
	display: inline-block;
	line-height: 30px;
	padding: 10px;
	&:hover {
		background: rgba(0, 0, 0, .025)
	}
}
.el-icon-arrow-down {
    font-size: 12px;
}
.conUl {
	li {
		height: 50px;
		line-height: 50px;
		list-style-type:none;
		.conUl_link {
			display: block;
			height: 100%;
			margin: 0 20px 0 0;
			border-bottom: 1px solid #e4e4e4;
		}
		.conUl_sp0 {
			font-size: 14px;
		}
		.conUl_sp1 {
			font-size: 12px;
			color: #b3b3b3;
			float: right;
		}
	}
}
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0,21,41,.08);

	.hamburger-container {
		line-height: 50px;
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
		margin-right: 10px;

		&:focus {
			outline: none;
		}
	}
	.el-badge {
		cursor: pointer;

	}
}
</style>
