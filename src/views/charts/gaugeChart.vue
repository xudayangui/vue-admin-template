<template>
  <ve-gauge :data="chartData" height="550px" style="margin-top:30px;"></ve-gauge>
</template>

<script>
    export default {
        data() {
            return {
                chartData: {
                    columns: ['type', 'a', 'b', 'value'],
                    rows: [{ type: '速度', value: 80, a: 1, b: 2 }]
                }
            }
        }
    }
</script>
