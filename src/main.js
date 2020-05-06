import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置 css 样式

import ElementUI from 'element-ui'  //引进element ui
import 'element-ui/lib/theme-chalk/index.css' //引进element ui css

import '@/styles/index.scss' // 全局 css

import App from './App'  //挂载 vue
import store from './store'  //引进vuex
import router from './router' //引进路由

import '@/permission' // permission control

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
