import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/CeShi',
    component: () => import('../views/CeShi.vue')
  }
  ,
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component:Home,
    children: [
      {
        path: '',
        redirect: 'goods'
      },
      {
        path: 'goods',
        component: () => import('../views/Goods.vue')
      },
      {
        path: 'evaluate',
        component: () => import('../views/Evaluate.vue')
      },
      {
        path: 'business',
        component: () => import('../views/Business.vue')
      },
    ]
  },
  {
    path: '/details',
    component: () => import('../views/Details.vue')
  }
]
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
