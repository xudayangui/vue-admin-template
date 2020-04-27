<template>
	<section class="wrapper">
		<div class="login-wrapper">
			<el-form v-model="accountForm" class="mar-t-30">
				<div class="mar-b-30 form-item">
					<label class="icon-box">
					<i class="iconfont icon-f-user"></i>
					</label>
					<el-input v-model="accountForm.account" placeholder="输入账号" clearable></el-input>
				</div>
				<div class="mar-b-30 form-item form-item-code">
					<label class="icon-box">
					<i class="iconfont icon-f-password"></i>
					</label>
					<el-input v-model="accountForm.password" type="password" @keyup.enter.native="accountLoginHandle" placeholder="密码" clearable></el-input>
				</div>
				<div class="mar-b-15 text-center">
					<el-button @click="accountLoginHandle()" :loading="accountLoadingBtn" type="primary" style="width: 100%">登录</el-button>
				</div>
			</el-form>
		</div>
	</section>
</template>

<script>
export default {
  	name: "login",
	data () {
		return {
			SUCCESS_CODE: 1, //请求成功的值
			accountLoadingBtn: false, //账号密码登录按钮loading
			accountForm: {
				//账号表单
				account: "admin",
				password: "111111"
			}
		}
	},
	mounted() {},
	created () {
		//针对点击浏览器的回退按钮时，若回退到的当前页面是登录页面，则清空localStorage的数据
		//window.location.href.indexOf('login') !=-1
		if (this.$route.path === '/login') {
			localStorage.removeItem('token')
			localStorage.removeItem('userInfo')
			localStorage.removeItem('functions')
		}
	},
	methods: {
		//账号密码登录
		accountLoginHandle () {
			// 登录成功
			this.$message.success('登录成功')
			// 跳转到首页
			this.$router.push("/summarys/index")
			return 
			//验证账号密码
			if (this.accountForm.account === "" || this.accountForm.password === "") {
				this.$message.error("账号或者密码不能为空")
				return false
			} else {
				//如果本地有token，则先清除token再登录
				if (localStorage.token) {
					localStorage.removeItem("token")
				}
				//请求登录参数
				let params = {
					account: this.accountForm.account, //账号
					password: this.accountForm.password, //密码
				}
				this.successFunc(params) //执行验证通过函数
			}
		},
		//验证通过函数
		successFunc (params) {
			this.accountLoadingBtn = true //账号登录按钮loading
		//请求登录接口
			this.$api.systemModule.login(params).then(res => {
				if (res.data.retcode === this.SUCCESS_CODE) {
					const token = res.data.data.phSessionToken //获取token
					localStorage.setItem("token", token) //把token存储到localStorage
					let params = {phSessionToken: token}
					// 登录成功
					this.$message.success('登录成功')
					// 跳转到首页
					this.$router.push("/summarys/index")

				} else {
					this.$message.error(res.data.retmsg)
					this.accountLoadingBtn = false //账号登录按钮loading
					}
				}).catch(err => {
					console.error(err)
					this.accountLoadingBtn = false //账号登录按钮loading
				})
			}
	}
}
</script>
<style scoped>
.wrapper {
	min-height: 100%;
	width: 100%;
	background-color: #222C3A;
	overflow: hidden;
}
.login-wrapper {
	position: relative;
	width: 400px;
	max-width: 100%;
	padding: 35px 35px 0;
	margin: 250px auto 0 auto;
	overflow: hidden;
	z-index: 2;
}
.form-wrapper {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	width: 100%;
	height: 100%;
	z-index: 100;
	background: rgba(0, 0, 0, 0.8);
}
.form-container {
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 100;
	transform: translate(-50%, -50%);
	padding: 10px 30px 20px;
	background: #fff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 6px;
	box-sizing: border-box;
}
</style>
