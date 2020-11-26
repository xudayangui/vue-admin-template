import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 引入Layout 布局 */
import Layout from '@/layout'


/**
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 *
 * hidden: true                   当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               一直显示根路由 如果未设置为始终显示，则当项具有多个子路径时，它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           重定向地址，在面包屑中点击会重定向去的地址 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
		roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
		title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
		icon: 'svg-name'             设置该路由的图标
		breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示d
		activeMenu: '/example/list'  如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 */
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
    },
    {
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	},

	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import('@/views/dashboard/index'),
			meta: { title: '首页' , icon: 'el-icon-s-home'}
		}]
	},
	{
		path: '/example',
		component: Layout,
		redirect: '/example/table',
		name: 'Example',
		meta: { title: '综合',icon: 'el-icon-s-operation'},
		children: [
			{
				path: 'table',
				component: () => import('@/views/table/index'),
				meta: { title: '表格' }
			},
			{
				path: 'tree',
				component: () => import('@/views/tree/index'),
				meta: { title: '树形' }
			},
			{
				path: 'form',
				component: () => import('@/views/form/index'),
				name: 'Form',
				meta: { title: '表单'},
				children: [
					{
						path: 'basicForm',
						component: () => import('@/views/form/basicForm'),
						name: 'BasicForm',
						meta: { title: '基本表单' }
					},
					{
						path: 'editor',
						component: () => import('@/views/form/editor'),
						name: 'Editor',
						meta: { title: '富文本' }
					},
					{
						path: 'markdown',
						component: () => import('@/views/form/markdown'),
						name: 'Markdown',
						meta: { title: 'Markdown' }
					},
					{
						path: 'upLoad',
						component: () => import('@/views/form/upLoad'),
						name: 'UpLoad',
						meta: { title: '上传'}
					}
				]
			},
			{
				path: 'excel',
				component: () => import('@/views/excel/index'),
				meta: { title: 'Excel'}
			}
		]
	},
	{
		path: '/charts',
		component: Layout,
		redirect: '/charts/DiscountFigure',
		name: 'Charts',
		meta: { title: '图表',icon: 'el-icon-s-data'},
		children: [
			{
				path: 'DiscountFigure',
				component: () => import('@/views/charts/DiscountFigure'),
				meta: { title: '折线图' }
			},
			{
				path: 'columnar',
				component: () => import('@/views/charts/columnar'),
				meta: { title: '柱状图' }
			},
			{
				path: 'barGraph',
				component: () => import('@/views/charts/barGraph'),
				meta: { title: '条形图' }
			},
			{
				path: 'pieChart',
				component: () => import('@/views/charts/pieChart'),
				meta: { title: '饼图' }
			},
			{
				path: 'ringChart',
				component: () => import('@/views/charts/ringChart'),
				meta: { title: '环图' }
			},
			{
				path: 'waterfallCharts',
				component: () => import('@/views/charts/waterfallCharts'),
				meta: { title: '瀑布图' }
			},
			{
				path: 'funnelCharts',
				component: () => import('@/views/charts/funnelCharts'),
				meta: { title: '漏斗图' }
			},
			{
				path: 'radarCharts',
				component: () => import('@/views/charts/radarCharts'),
				meta: { title: '雷达图' }
			},
			{
				path: 'sankeyChart',
				component: () => import('@/views/charts/sankeyChart'),
				meta: { title: '桑基图' }
			},
			{
				path: 'heatmapChart',
				component: () => import('@/views/charts/heatmapChart'),
				meta: { title: '热力图' }
			},
			{
				path: 'scatterChart',
				component: () => import('@/views/charts/scatterChart'),
				meta: { title: '散力图' }
			},
			{
				path: 'candleChart',
				component: () => import('@/views/charts/candleChart'),
				meta: { title: 'K线图' }
			},
			{
				path: 'gaugeChart',
				component: () => import('@/views/charts/gaugeChart'),
				meta: { title: '仪表图' }
			},
			{
				path: 'treeChart',
				component: () => import('@/views/charts/treeChart'),
				meta: { title: '树图' }
			},
		]
	},
	{
		path: '/setting',
		component: Layout,
		redirect: '/setting/role',
		name: 'Setting',
		meta: {title: '设置',icon: 'el-icon-setting'},
		children: [
			{
				path: 'role',
				component: () => import('@/views/setting/role/index'),
				meta: { title: '角色设置' },
			},
			{
				path: 'permission',
				component: () => import('@/views/setting/permission/index'),
				meta: { title: '用户设置' }
			},
			{
				path: 'personal',
				name:'personal',
				component: () => import('@/views/setting/personal/index'),
				meta: { title: '个人信息' },
				hidden:true
			}
		]
	},
	// 404 page 必须放在随后
	{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
	// mode: 'history',
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // 重置路由
}

export default router
