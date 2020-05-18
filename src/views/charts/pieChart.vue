<template>
    <ve-pie :data="chartData" height="800px" :settings="chartSettings" style="margin-top:150px;"></ve-pie>
</template>

<script>
    export default {
        data() {
            this.chartSettings = {
                radius: 300,
                offsetY: 400
            }
            return {
                chartData: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                }
            }
        }
    }
</script>