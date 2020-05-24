<template>
    <div>
        <el-row :gutter="20" class="mgl20 mgr20">
            <el-col :span="24" class="mgt20">
                <el-row :gutter="20">
                    <el-col :span="screenWidth>1200?4:8">
                        <el-card shadow="hover"  :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
					<el-col :span="screenWidth>1200?4:8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-shopping-cart-2 grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户下单量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="screenWidth>1200?4:8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-check grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>下单成功量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="screenWidth>1200?4:8" :class="screenWidth>1200?'':'mgt10'">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">2450</div>
                                    <div>下单金额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
					<el-col :span="screenWidth>1200?4:8" :class="screenWidth>1200?'':'mgt10'">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-warning grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">2450</div>
                                    <div>异常订单</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
					<el-col :span="screenWidth>1200?4:8" :class="screenWidth>1200?'':'mgt10'">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-4" >
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
			<el-col :span="24" class="mgt20">
				<el-row :gutter="20" >
                    <el-col :span="12">
                        <el-card shadow="hover" style="height:450px;" >
							<div slot="header" class="clearfix">
								<span>异常订单</span>
							</div>
							<el-table  :data="orderList" style="width:100%;" height="400" :size="screenWidth>1200?'':'mini'">
								<el-table-column label="下单时间" min-width="130">
									<template slot-scope="scope">
										{{scope.row.datetime}}
									</template>
								</el-table-column>
								<el-table-column label="下单数量">
									<template slot-scope="scope">
										{{scope.row.order}}
									</template>
								</el-table-column>
								<el-table-column label="下单金额">
									<template slot-scope="scope">
										{{scope.row.money}}
									</template>
								</el-table-column>
							</el-table>
						</el-card>
                    </el-col>
					<el-col :span="12">
                        <el-card shadow="hover" style="height:450px; ">
							<div slot="header" class="clearfix">
								<span>异常登录</span>
							</div>
							<el-table :data="loginlist" style="width:100%;" height="400" :size="screenWidth>1200?'':'mini'">
								<el-table-column label="登录时间" >
									<template slot-scope="scope">
										{{scope.row.datetime}}
									</template>
								</el-table-column>
								<el-table-column label="登录地点" >
									<template slot-scope="scope">
										{{scope.row.city}}
									</template>
								</el-table-column>
								<!-- <el-table-column label="登录IP" min-width="120px">
									<template slot-scope="scope">
										{{scope.row.ip}}
									</template>
								</el-table-column> -->
							</el-table>
						</el-card>
                    </el-col>
                </el-row>
			</el-col>
			<el-col :span="12" class="mgt20">
                <el-card shadow="hover"  style="min-height:400px;">
					<ve-line :data="chartData" height="400px" style="margin-top:100px;"></ve-line>
                </el-card>
            </el-col>
			<el-col :span="12" class="mgt20">
                <el-card shadow="hover"  style="min-height:400px;">
					<ve-histogram :data="chartData" height="400px" style="margin-top:100px;"></ve-histogram>
                </el-card>
            </el-col>
			<!-- <el-col :span="8">
                <el-card shadow="hover"  style="min-height:400px;">
					<ve-pie :data="pieData" height="400px" :settings="chartSettings" style="margin-top:100px;"></ve-pie>
                </el-card>
            </el-col> -->
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils'
import { getAbnormalList } from "@/api/table";
export default {
    name: 'Dashboard',
    data() {
		this.chartSettings = {
			radius: 130,
			offsetY: 180
		}
        return {
            screenWidth: document.body.clientWidth,
			orderList:[],
			loginlist:[],
			chartData: {
				columns: ['日期', '访问用户', '下单用户', '下单率'],
				rows: [
					{ 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
					{ 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
					{ 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
					{ 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
					{ 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
					{ 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
				]
			},
			pieData: {
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
        };
    },
    watch :{
       screenWidth(val){
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!this.timer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    console.log(that.screenWidth)
                    that.timer = false
                },400)
            }
        }
    },
    computed: {
		...mapGetters([
			'name'
		]),
        role() {
            return this.name === 'Admin' ? '超级管理员' : '普通用户';
        }
	},
	created() {
		this.fetchData();
	},
    methods: {
		fetchData() {
			getAbnormalList().then(response => {
				this.orderList = response.data.orderList;
				this.loginlist = response.data.loginlist;
			});
		},
		formatLocalTime(val){
			return formatTime(val)
		}
    },
    mounted () {
        let that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
    }
};
</script>


<style scoped>
.el-col {
    border-radius: 5px;
  }
.btn {
	cursor: pointer;
}
.grid-content {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100px;
}
.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
}
.grid-num {
    font-size: 20px;
    font-weight: bold;
}
.grid-con-icon {
    font-size: 30px;
    text-align: center;
    color: #fff;
    margin-left: 10px;
}
.grid-con-1 .grid-con-icon {
    color: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
    color: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    color: #E6A23C
}
.grid-con-3 .grid-num {
    color: #E6A23C
}
.grid-con-4 .grid-con-icon {
    color: #999
}
.grid-con-4 .grid-num {
    color: #999
}
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}
.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}
.user-info-list span {
    margin-left: 70px;
}
.mgb20 {
    margin-bottom: 20px;
}
.mgt20 {
    margin-top: 20px;
}
.mgt10 {
    margin-top: 10px;
}
.mgl20 {
    margin-left: 20px !important;
}
.mgr20 {
    margin-right: 20px !important;
}
.todo-item {
    font-size: 14px;
}
.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
