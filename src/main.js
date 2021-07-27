import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from "components/common/toast/index.js"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"
Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
