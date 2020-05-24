<template>
  <ve-ring :data="chartData"  height="550px" :settings="chartSettings" style="margin-top:30px;"></ve-ring>
</template>

<script>
	export default {
		data() {
			this.chartSettings = {
				radius: [200,150],
				offsetY: 300
			}
			return {
				chartData: {
					columns: ['日期', '访问用户'],
					rows: [
						{ '日期': '4月1日', '访问用户': 1393 },
						{ '日期': '4月2日', '访问用户': 3530 },
						{ '日期': '4月3日', '访问用户': 2923 },
						{ '日期': '4月4日', '访问用户': 1723 },
						{ '日期': '4月5日', '访问用户': 3792 },
						{ '日期': '4月6日', '访问用户': 4593 }
					]
				}
			}
		}
	}
</script>
