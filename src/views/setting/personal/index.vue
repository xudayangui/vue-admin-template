<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="用户名：">
				<span>{{name}}</span>
			</el-form-item>
			<el-form-item label="昵称：">
				<el-input style="width: 32%;" v-model="form.name" />
			</el-form-item>
			<el-form-item label="密码：">
				<el-input style="width: 32%;" v-model="form.passWord" />
			</el-form-item>
			<el-form-item label="状态：">
				<el-radio-group v-model="form.type">
					<el-radio label="0" name="type">在线</el-radio>
					<el-radio label="1" name="type">忙碌</el-radio>
					<el-radio label="2" name="type">离开</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'personal',
    computed: {
		...mapGetters([
			'name'
		])
	},
	data() {
		return {
			form: {
				name: '',
				passWord: '',
				type: "0",
			}
		}
    },
	methods: {
		onSubmit() {
			this.$message.success('提交成功!')
		}
	}
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

