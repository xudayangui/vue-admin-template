<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
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
					<el-button type="text">编辑</el-button>
					<el-button type="text" v-if="scope.row.status">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination  :total="total"  :page.sync="listQuery.page"  :limit.sync="listQuery.limit" @pagination="fetchData" />
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from "@/api/table";

export default {
	components: {
		Pagination
	},
	data() {
		return {
			auditList: [],
			total: 0, // 审计列表总数
			listQuery: { // 获取审计列表传参集合
			queryPage: {
				pageNum: 1, // 当前页
				pageSize: 10 // 每页显示条数
				}
			},
			list: null,
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
				this.list = response.data.list;
				this.total = this.list.length
				
			});
		}
	}
};
</script>
