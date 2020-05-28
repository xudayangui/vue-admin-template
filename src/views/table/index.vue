<template>
	<div class="app-container">
		<el-form ref="form" :inline="true" class="demo-form-inline" :model="form">
             <el-form-item label="" prop="userName">
                <el-input size="small" v-model="form.userName" placeholder="用户名" style="width:100px;" />
            </el-form-item>
			 <el-form-item label="" prop="age">
                <el-input size="small" v-model="form.age" placeholder="年龄" style="width:100px;"/>
            </el-form-item>
            <el-form-item label=""  prop="status">
				<el-select size="small" v-model="form.status" style="width:100px;" placeholder="状态">
					<el-option label="已录入" value="1"/>
					<el-option label="未录入" value="0"/>
				</el-select>
            </el-form-item>
			<el-form-item label="">
				<el-button size="small"  type="primary" icon="el-icon-search" @click="handleSearch">
                搜索
            	</el-button>
            </el-form-item>
			 <el-form-item label="">
				<el-button  size="small"  icon="el-icon-document" @click="handleReset('form')">
                重置
            	</el-button>
            </el-form-item>
        </el-form>
		<el-table v-loading="listLoading" :data="tableData" element-loading-text="加载中..." border fit highlight-current-row>
			<el-table-column align="center" label="ID" width="95">
				<template slot-scope="scope">
					{{ scope.row.id }}
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
					<el-tag :type="scope.row.status?'success':'danger'" size="mini" effect="dark">{{scope.row.status?'已录入':'未录入'}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="time" label="创建时间" width="200">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.time }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" class="btn">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="showDialog_cb(scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" v-if="scope.row.status" @click="deleteRow(scope.$index, tableData)">删除</el-button>
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
					<el-form-item prop="age" label="年龄：">
						<el-input size="small" v-model="copyModel.age" class="wh200"></el-input>
					</el-form-item>
					<el-form-item prop="city" label="住址：" >
						<el-input  size="small" v-model="copyModel.city" class="wh200"></el-input>
					</el-form-item>
					<el-form-item prop="status" label="状态：">
						<el-select size="small" class="wh200" v-model="copyModel.status" >
							<el-option label="已录入" :value="1"/>
							<el-option label="未录入" :value="0"/>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible=false">取 消</el-button>
				<el-button size="small" type="primary">确 定</el-button>
			</span>
		</el-dialog>
		<pagination  :total="total"  :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from "@/api/table";

export default {
	components: {
		Pagination,
	},
	data() {
		return {
			dialogVisible:false,
			form:{
                status:null,
                userName:"",
				age:"",
			},
			copyModel:{
				userName:"",
                age:"",
                adress:"",
                status:"",
                time:"",
			},
			total: 0, // 审计列表总数
			listQuery: { // 获取审计列表传参集合
				page: 1,
				pageSize: 20,
			},
			tableData: [],
			listLoading: true
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		handleSearch(){
			this.fetchData();
		},
		handleReset(formName){
			this.$refs[formName].resetFields();
			this.listQuery.page=1
			this.listQuery.pageSize=20
			this.fetchData();
		},
		showDialog_cb(row){
			this.copyModel = Object.assign({},row)
			this.dialogVisible = true
		},
		fetchData() {
			this.listLoading = true;
			getList(this.listQuery).then(response => {
				this.tableData = response.data.list;
				this.total = response.data.count
				this.listLoading = false;
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
.btn .el-button {
    padding-bottom: 0
}
.el-form {
	margin-bottom: 10px;
}
.el-form-item {
	margin-bottom: 0;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 5px 10px;
}
.wh200 {
	width: 200px;
}
</style>
