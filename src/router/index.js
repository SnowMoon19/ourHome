import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import FirstRecord from '@/views/function/record/firstRecord/FirstRecord.vue';
import LoginPage from '@/views/login/LoginPage.vue';
import AlbumList from "@/views/function/record/photos/AlbumList";
import AlbumShow from "@/views/function/record/photos/AlbumShow";
import {getToken} from "@/myConfig/auth";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/firstRecord',
    name: 'FirstRecord',
    component: FirstRecord,
  },
  {
    path: '/albumList',
    name: 'AlbumList',
    component: AlbumList,
    children: [
      {
        path: '/albumShow', // 子路径在父路径基础上叠加 todo 没生效
        name: 'AlbumShow',
        component: AlbumShow,
      },
    ]
  },
  {
    path: '/albumList/albumShow',
    name: 'AlbumShow',
    component: AlbumShow,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // 获取token
  const token = getToken();
  // 有token
  if (token) {
    // 直接放行
    next();
  } else {  // 否则是没有
    // 如果去的是登录页
    if (to.path === '/') {
      // 直接放行
      next();
    } else {
      // 如果去的是其他页,跳转到登录页
      // todo 做个提示框 Message.error('请登录以后再操作！')
      // 跳转到登录页
      return next({ "path": "/" })
    }
  }
})

export default router
