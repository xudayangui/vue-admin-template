<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="tableData" element-loading-text="加载中..." border fit highlight-current-row>
			<el-table-column label="用户名">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="权限类别"  align="center">
				<template slot-scope="scope">
                    <span>{{ permission[scope.row.status] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="time" label="创建时间">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.time }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="showDialog_cb(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" v-if="scope.row.status!==0" @click="deleteRow(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
			<div class="dialog-content">
				<el-form label-width="120px" ref="dlgform" :model="copyModel">
					<el-form-item  prop="name" label="用户名：">
						<el-input size="small" v-model="copyModel.name" class="wh200"></el-input>
					</el-form-item>
					<el-form-item prop="status" label="权限类别：">
						<el-select size="small" class="wh200" v-model="copyModel.status" >
							<el-option label="超级管理员" :value="0"/>
							<el-option label="管理员" :value="1"/>
							<el-option label="开发人员" :value="2"/>
							<el-option label="客服人员" :value="3"/>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible=false">取 消</el-button>
				<el-button size="small" type="primary">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { permissionList } from "@/api/setting";

export default {
	data() {
		return {
			copyModel:{
				userName:"",
                status:"",
			},
			dialogVisible:false,
			total: 0, // 审计列表总数
			listQuery: { // 获取审计列表传参集合
				page: 1,
				limit: 20,
			},
			tableData: [],
            listLoading: true,
            permission: ['超级管理员','管理员','开发人员','客服人员']
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		showDialog_cb(row){
			this.copyModel = Object.assign({},row)
			this.dialogVisible = true
		},
		fetchData() {
			this.listLoading = true;
			permissionList().then(response => {
				this.listLoading = false;
				this.tableData = response.data.list;
				this.total = this.tableData.length

			});
		},
		deleteRow(index, rows){
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				 rows.splice(index, 1);
				 this.$message.success('删除成功')
			}).catch(() => {
				this.$message.info('取消')
			});
		}
	}
};
</script>
<style scoped>
.wh200 {
	width: 200px;
}
</style>

