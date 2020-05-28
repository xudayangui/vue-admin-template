<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="tableData" element-loading-text="加载中..." border fit highlight-current-row>
			<el-table-column label="角色名称">
				<template slot-scope="scope">
					{{ permission[scope.row.status] }}
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
		<el-dialog title="编辑" :visible.sync="dialogVisible">
			<div class="dialog-content">
				<el-form label-width="120px" ref="dlgform" :model="copyModel">
					<el-form-item  prop="name" label="角色名称：">
						<span>{{permission[copyModel.status]}}</span>
					</el-form-item>
					<el-form-item prop="status" label="权限列表：">
						<el-tree :data="treeData" show-checkbox :props="defaultProps" :default-expand-all="true" node-key="id" :default-checked-keys="[1,2,3]"></el-tree>
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
import { roleList,treeRoleList } from "@/api/role";
export default {
	data() {
		return {
			copyModel:{
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
			permission: ['超级管理员','管理员','开发人员','客服人员'],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			treeData:[],
			defaultCheckeKeys:[]

		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		treeRoleListhttp(){
			treeRoleList().then(response => {
				this.treeData = response.data.list;
				// this.parseTreeJson(this.treeData)
			});
		},
		//递归实现
		parseTreeJson (treeNodes) {
			if (!treeNodes || !treeNodes.length) return;

			for (let i = 0, len = treeNodes.length; i < len; i++) {
				this.defaultCheckeKeys.push(treeNodes[i].id)
				let childs = treeNodes[i].children;
				if (childs && childs.length > 0) {
					this.parseTreeJson(childs);
				}
			}
		},
		showDialog_cb(row){
			this.defaultCheckeKeys = []
			this.copyModel = Object.assign({},row)
			this.treeRoleListhttp()
			this.dialogVisible = true
		},
		fetchData() {
			this.listLoading = true;
			roleList().then(response => {
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
