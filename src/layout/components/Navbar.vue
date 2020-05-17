<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<el-badge is-dot @click.native="toggleMsgShow" style="margin-right:10px;">
              	<i class="el-icon-message-solid"></i>
            </el-badge>
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					{{name}}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>github</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-drawer  title="消息中心" size="18%" :visible.sync="drawer"  >
				<ul class="conUl">
					<li v-for="item in msgList" :key="item.id">
					<router-link :to="item.link" class="conUl_link">
						<el-link class="conUl_sp0" :underline="false">{{ item.content }}</el-link>
						<span class="conUl_sp1">{{ item.time }}</span>
					</router-link>
					</li>
				</ul>
			</el-drawer>
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
			drawer: false,
			msgList: [
				{
					id: '1',
					content: '优惠券到期提醒',
					link: '',
					time: '2019-06-01'
				},
				{
					id: '2',
					content: '618大促，请查看活动具体信息',
					link: '',
					time: '2019-06-02'
				},
				{
					id: '3',
					content: '充值成功',
					link: '',
					time: '2019-07-02'
				},
				{
					id: '4',
					content: '密码充值成功！',
					link: '',
					time: '2019-07-02'
				}
			]
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
		toggleMsgShow(){
			this.drawer = true
		},
		//伸缩
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
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
		margin-right: 60px;

		&:focus {
			outline: none;
		}
	}
	.el-badge {
		cursor: pointer;
		
	}
}
</style>
