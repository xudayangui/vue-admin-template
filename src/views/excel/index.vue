<template>
	<div class="app-container">
        <el-form ref="form" :inline="true" class="demo-form-inline" :model="form">
             <el-form-item label="文件名称">
                <el-input size="small" v-model="form.filename" placeholder="文件名称" style="width:200px;" prefix-icon="el-icon-document" />
            </el-form-item>
             <el-form-item label="单元格自动宽度">
                <el-radio-group size="small" v-model="form.autoWidth">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="导出类型">
                <el-select size="small" v-model="form.bookType" style="width:100px;">
                    <el-option label="xlsx" value="xlsx"/>
                    <el-option label="csv" value="csv"/>
                    <el-option label="txt" value="txt"/>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button size="small" :loading="downloadLoading"  type="primary" icon="el-icon-document" @click="handleDownload">
                    导出全部
                </el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button size="small" :loading="downloadSelectLoading"  type="success" icon="el-icon-document-checked" @click="handleSelectionDownload">
                    导出选中
                </el-button>
            </el-form-item>
        </el-form>
		<el-table ref="multipleTable" @selection-change="handleSelectionChange" v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column type="selection" align="center" />
            <el-table-column align="center" label="编号" width="95">
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
		</el-table>
        <pagination  :total="total"  :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="fetchData" />
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from "@/api/table";
import { parseTime } from '@/utils'
export default {
    components: {
		Pagination,
	},
	data() {
		return {
            multipleSelection:[],
            downloadLoading:false,
            downloadSelectLoading:false,
            importExcelLoading:false,
            form:{
                bookType:"xlsx",
                filename:"表格",
                autoWidth:true
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
		fetchData() {
			this.listLoading = true;
			getList(this.listQuery).then(response => {
				this.listLoading = false;
                this.tableData = response.data.list;
                this.total = response.data.count
			});
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        exportExcel(type,Header,filterVal,list){
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = Header
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: this.form.filename,
                    autoWidth: this.form.autoWidth,
                    bookType: this.form.bookType
                })
                if(type=='all'){
                    this.downloadLoading = false
                }else{
                    this.downloadSelectLoading = false
                    this.$refs.multipleTable.clearSelection()
                }
            })
        },
        //导出全部
        handleDownload(){
            this.downloadLoading = true
            const Header = ['编号', '用户名', '年龄', '住址', '状态','创建时间']
            const filterVal = ['id', 'name', 'age', 'city', 'status', 'time']
            this.exportExcel('all',Header,filterVal,this.tableData)

        },
        //导出选中
        handleSelectionDownload(){
            if (this.multipleSelection.length) {
                this.downloadSelectLoading = true
                const Header = ['编号', '用户名', '年龄', '住址', '状态','创建时间']
                const filterVal = ['id', 'name', 'age', 'city', 'status', 'time']
                this.exportExcel('select',Header,filterVal,this.multipleSelection)
            } else {
                this.$message({
                    message: '请选择要导出的内容',
                    type: 'warning'
                })
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(i => filterVal.map(element => {
                if (element === 'timestamp') {
                    return parseTime(i[element])
                } else {
                    return i[element]
                }
            }))
        }
	}
};
</script>
