import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login";
import Home from "@/components/Home/Home";


const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  //to 将要访问的路径
  //from 从哪个路径来
  //next 函数 放行
  if(to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

