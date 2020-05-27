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
		<pagination v-show="false" :total="total"  :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
		<dialogExample :dialog-visible="showDialog" @dialog-cancel="showDialog=false" :copyModel="copyModel"></dialogExample>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import dialogExample from './index.dlg.vue'
import { permissionList } from "@/api/setting";

export default {
	components: {
		Pagination,
		dialogExample
	},
	data() {
		return {
			copyModel:{},
			showDialog:false,
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
			this.copyModel = row
			this.showDialog = true
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
