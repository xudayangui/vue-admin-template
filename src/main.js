import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置 css 样式

import ElementUI from 'element-ui'  //引进element ui
import 'element-ui/lib/theme-chalk/index.css' //引进element ui css

import '@/styles/index.scss' // 全局 css

import App from './App'  //挂载 vue
import store from './store'  //引进vuex
import router from './router' //引进路由

import '@/icons' // 图标
import '@/permission' // permission control

/**
 * 如果您不想使用模拟服务器
 * 您想将MockJs用于模拟api
 * 您可以执行：mockXHR（）
 *
 * 目前，MockJs将用于生产环境，
 * 请在上网之前将其删除！ ！ ！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
