import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置 css 样式

import ElementUI from 'element-ui';//按需引进element ui
import 'element-ui/lib/theme-chalk/index.css' //引进element ui css

import VCharts from 'v-charts' //引进v-charts

import '@/styles/index.scss' // 全局 css

import App from './App'  //挂载 vue
import store from './store'  //引进vuex
import router from './router' //引进路由
import './icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters

Vue.use(ElementUI)
// 注册全局实用程序过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
