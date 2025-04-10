import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    // 默认路由
    path: '/',
    // 可以根据自己要调试的页面修改默认路由
    redirect: '/setting', // 首页定位到 账户中心
    // redirect: '/login', // 首页定位到 登录
    // component: HomeView,
    // meta: { transition: 'slide' }
  },
  {
    // excel表格
    path: '/excel',
    name: 'excel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ExcelView.vue')
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserLogin.vue')
  },
  {
    // 登录
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingViewTemp.vue')
  },
  {
    // 工作空间主页
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue'),
    children: [
      // 默认子路由
      {
        path: '',
        redirect: { name: 'formula' }
      },
      // 公式页面
      {
        path: 'formula',
        name: 'formula',
        component: () => import('@/views/subpages/FormulaView.vue')
      },
      // 项目页面
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/subpages/Projects.vue')
      },
      // 最近公式
      {
        path: 'recent-formula',
        name: 'recent-formula',
        component: () => import('@/views/subpages/RecentFormula.vue')
      },
      // 模板社区
      {
        path: 'template-community',
        name: 'template-community',
        component: () => import('@/views/subpages/TemplateCommunity.vue')
      }
    ]
  }
  //仿照添加主页MainPage的router
  /*,
  {
    path: '/main',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue')
  }*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
