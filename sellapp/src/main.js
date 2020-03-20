import Vue from 'vue'
import App from './App.vue'
import router from './router'

//axios默认路径端口
import'@/utils/axiosUtils'

//引入Vuex
import store from './store.js'

//重置样式
import '@/assets/style/reset.css'

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
