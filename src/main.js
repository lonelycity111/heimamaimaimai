import Vue from 'vue'
import App from './App.vue'

// 导入Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



Vue.config.productionTip = false

// 导入全局样式
import './assets/statics/site/css/style.css'



import myhttp from './libs/myhttp'
Vue.use(myhttp)

// 导入时间格式化插件 mommit
import moment from 'moment'
Vue.filter('formatTime', (value, fmtStr) => {
  if (fmtStr) {
    return moment(value).format(fmtStr);
  } else {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

})

import router from './libs/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
