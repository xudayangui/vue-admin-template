<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="名称">
				<el-input style="width: 32%;" v-model="form.name" />
			</el-form-item>
			<el-form-item label="地址">
				<el-select v-model="form.region" placeholder="请选择">
					<el-option label="上海" value="1" />
				</el-select>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-col :span="11">
					<el-date-picker  start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" v-model="form.date" type="datetimerange" placeholder="请选择" style="width: 70%;" />
				</el-col>
			</el-form-item>
			<el-form-item label="类型">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="0" name="type">线上活动</el-checkbox>
					<el-checkbox label="1" name="type">推广活动</el-checkbox>
					<el-checkbox label="2" name="type">离线活动</el-checkbox>
					<el-checkbox label="3" name="type">品牌活动</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="理由">
				<el-radio-group v-model="form.resource">
					<el-radio label="成功" />
					<el-radio label="失败" />
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small"  @click="onSubmit">创建</el-button>
				<el-button @click="onCancel" size="small" >取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '美团外卖',
				region: '1',
				date: [new Date(1557132168000), new Date(1588754568000)],
				type: ["0","1"],
				resource: '成功',
			}
		}
  	},
	methods: {
		onSubmit() {
			this.$message.success('提交成功!')
		},
		onCancel() {
			this.$message.warning('取消!')
		}
	}
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

