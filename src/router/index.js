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
		breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
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
		component: () => import('@/views/404'),
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
			meta: { title: '首页' }
		}]
	},

	{
		path: '/example',
		component: Layout,
		redirect: '/example/table',
		name: 'Example',
		meta: { title: '综合实例', icon: 'example' },
		children: [
		{
			path: 'table',
			name: 'Table',
			component: () => import('@/views/table/index'),
			meta: { title: '表格' }
		},
		{
			path: 'tree',
			name: 'Tree',
			component: () => import('@/views/tree/index'),
			meta: { title: '树形' }
		}
		]
	},

	{
		path: '/form',
		component: Layout,
		children: [
		{
			path: 'index',
			name: 'Form',
			component: () => import('@/views/form/index'),
			meta: { title: '表单'}
		}
		]
	},

	{
		path: '/nested',
		component: Layout,
		redirect: '/nested/menu1',
		name: 'Nested',
		meta: {title: '嵌套菜单'},
		children: [
			{
				path: 'menu1',
				component: () => import('@/views/nested/menu1/index'), // Parent router-view
				name: 'Menu1',
				meta: { title: '一级嵌套' },
				children: [
				{
					path: 'menu1-1',
					component: () => import('@/views/nested/menu1/menu1-1'),
					name: 'Menu1-1',
					meta: { title: '二级' }
				},
				{
					path: 'menu1-2',
					component: () => import('@/views/nested/menu1/menu1-2'),
					name: 'Menu1-2',
					meta: { title: '二级嵌套' },
					children: [
						{
							path: 'menu1-2-1',
							component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
							name: 'Menu1-2-1',
							meta: { title: '三级' }
						},
						{
							path: 'menu1-2-2',
							component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
							name: 'Menu1-2-2',
							meta: { title: '三级' }
						}
					]
				}
			]
		},
		{
			path: 'menu2',
			component: () => import('@/views/nested/menu2/index'),
			meta: { title: '一级' }
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
