<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label="ID" width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column label="用户名">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column label="年龄">
				<template slot-scope="scope">
					{{ scope.row.age }}
				</template>
			</el-table-column>
			<el-table-column label="住址">
				<template slot-scope="scope">
					{{ scope.row.city }}
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="状态" width="110" align="center">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status?'success':'danger'" effect="dark">{{scope.row.status?'已录入':'未录入'}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="time" label="创建时间" width="200">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.time }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="showDialog=true">编辑</el-button>
					<el-button type="text" v-if="scope.row.status" @click="deleteRow(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="false" :total="total"  :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
		<dialogExample :dialog-visible="showDialog" @dialog-cancel="showDialog=false"></dialogExample>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import dialogExample from '@/components/Dialog'
import { getList } from "@/api/table";

export default {
	components: {
		Pagination,
		dialogExample
	},
	data() {
		return {
			showDialog:false,
			total: 0, // 审计列表总数
			listQuery: { // 获取审计列表传参集合
				page: 1,
				limit: 20,
			},
			tableData: [],
			listLoading: true
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.listLoading = true;
			getList().then(response => {
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
