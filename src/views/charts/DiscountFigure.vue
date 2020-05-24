<template>
    <div>
        <ve-line :data="chartData" :data-zoom="dataZoom" :toolbox="toolbox" height="550px" style="margin-top:30px;"></ve-line>
    </div>
</template>

<script>
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'
export default {
	data: function() {
		this.dataZoom = [
			{
				type: 'slider',
				start: 0,
				end: 100
			}
		]
		this.toolbox = {
			feature: {
				magicType: {type: ['line', 'bar']},
				saveAsImage: {}
			}
		}
		return {
			chartData: {
				columns: ['日期', '访问用户', '下单用户', '下单率'],
				rows: [
					{ 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.9 },
					{ 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
					{ 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
					{ 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
					{ 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
					{ 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
				]
			}
		}
	}
}
</script>
