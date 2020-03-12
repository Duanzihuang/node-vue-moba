import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// webpack打包 element
import './plugins/element'

// 处理axios
import http from './axios/index'
Vue.prototype.$http = http

Vue.config.productionTip = false

// 配置全局mixin
Vue.mixin({
  computed: {
    uploadUrl () {
      return http.defaults.baseURL + 'upload'
    }
  },
  methods: {
    getAuthHeader () {
      return {
        Authorization: localStorage.token
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
