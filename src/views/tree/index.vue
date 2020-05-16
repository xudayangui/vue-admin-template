<template>
	<div class="app-container">
		<el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
		<el-tree ref="tree2" :data="treeList" :props="defaultProps" :highlight-current="true" :filter-node-method="filterNode" class="filter-tree" :default-expand-all="false"/>
	</div>
</template>

<script>
import { treeList } from "@/api//tree";
export default {
  	data() {
		return {
			filterText: '',
			treeList:[],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
  	},
	watch: {
		filterText(val) {
			this.$refs.tree2.filter(val)
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		filterNode(value, data) {
			if (!value) {
				return true
			}else{
				return data.label.indexOf(value) !== -1
			}
		},
		fetchData() {
			this.listLoading = true;
			treeList().then(response => {
				this.listLoading = false;
				this.treeList = response.data.list;
			});
		}
	},	
}
</script>

