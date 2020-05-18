<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20">
                    <div class="user-info">
                        <img src="../../assets/logo/logo.png" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{formatLocalTime(new Date())}}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>北京</span>
                    </div>
                </el-card>
                <el-card shadow="hover" >
                    <div slot="header" class="clearfix">
                        <span>分布</span>
                    </div>
					北京
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
					上海
                    <el-progress :percentage="44.1" color="#f1e05a"></el-progress>
					广州
                    <el-progress :percentage="55.8"></el-progress>
					杭州
                    <el-progress :percentage="60" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">2450</div>
                                    <div>充值金额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:388px;"  class="mgb20">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">
									{{scope.row.title}}
								</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <span class="btn"><i class="el-icon-edit"></i></span>
								<span class="btn"><i class="el-icon-delete"></i></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
			<el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:600px;">
					<ve-line :data="chartData" height="400px" style="margin-top:100px;"></ve-line>
                </el-card>
            </el-col>
			<el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:600px;">
					<ve-histogram :data="chartData" height="400px" style="margin-top:100px;"></ve-histogram>
                </el-card>
            </el-col>
			<el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:600px;">
					<ve-pie :data="pieData" height="400px" :settings="chartSettings" style="margin-top:100px;"></ve-pie>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils'
export default {
    name: 'Dashboard',
    data() {
		this.chartSettings = {
			radius: 130,
			offsetY: 180
		}
        return {
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
            },
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: true
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true
                }
            ]
        };
    },
    computed: {
		...mapGetters([
			'name'
		]),
        role() {
            return this.name === 'Admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
		formatLocalTime(val){
			return formatTime(val)
		}
    }
};
</script>


<style scoped>
.btn {
	cursor: pointer;
}
.el-row {
    margin-bottom: 20px;
}
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}
.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}
.grid-num {
    font-size: 30px;
    font-weight: bold;
}
.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}
.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
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
.todo-item {
    font-size: 14px;
}
.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>