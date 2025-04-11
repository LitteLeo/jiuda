import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 类型声明扩展（如果尚未添加）
declare module 'vue-router' {
  interface RouteMeta {
    title?: string    // 页面标题
    requiresAuth?: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    // 默认路由
    path: '/',
    // 可以根据自己要调试的页面修改默认路由
    // redirect: '/setting', // 首页定位到 账户中心
    redirect: '/login', // 首页定位到 登录
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
    component: () => import(/* webpackChunkName: "about" */ '../views/ExcelView.vue'),
    meta: {
      title: '匠模久 - 表格编辑'
    }
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserLogin.vue'),
    meta: {
      title: '匠模久 - 欢迎'
    }
  },
  {
    // 账户中心
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingView.vue'),
    meta: {
      title: '账户中心 - 匠模久'
    }
  },
  {
    // 工作空间主页
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue'),
    meta: { title: '匠模久 - 工作空间' },
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
        component: () => import('@/views/subpages/FormulaView.vue'),
        meta: { title: '我的算式' },
      },
      // 项目页面
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/subpages/Projects.vue'),
        meta: { title: '我的项目' }
      },
      // 最近公式
      {
        path: 'recent-formula',
        name: 'recent-formula',
        component: () => import('@/views/subpages/RecentFormula.vue'),
        meta: { title: '最近算式' }
      },
      // 模板社区
      {
        path: 'template-community',
        name: 'template-community',
        component: () => import('@/views/subpages/TemplateCommunity.vue'),
        meta: { title: '模版社区' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫处理标题
router.beforeEach((to, from, next) => {
  const defaultTitle = '匠模久 - 专业建模工具'
  const suffix = ' - 匠模久'

  // 组合标题逻辑
  if (to.meta.title) {
    document.title = to.meta.title.includes('匠模久')
        ? to.meta.title
        : `${to.meta.title}${suffix}`
  } else {
    document.title = defaultTitle
  }

  next()
})

export default router
