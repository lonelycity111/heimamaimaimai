import Vue from 'vue' 
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件
import index from '../components/index.vue'
import detail from '../components/02.detail.vue'
import userRoot from '../components/03.userRoot.vue'
import userCenter from '../components/04.userCenter.vue'
import userOrder from '../components/05.userOrder.vue'
import userDetail from '../components/06.userDetail.vue'
// 写规则匹配
let routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:id',
    component: detail
  },
  {
    path: '/user',
    component: userRoot,
    children: [{
      path: '', // /user/center
      redirect: 'center'
    },
    {
      path: 'center', // /user/center
      component: userCenter
    },
    {
      path: 'order', // /user/order
      component: userOrder
    },
    {
      path: 'detail', // /user/detail
      component: userDetail
    }
    ]
  }
]

let router = new VueRouter({
  routes
})

export default router;