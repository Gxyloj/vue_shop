import {createRouter, createWebHistory} from 'vue-router'
import Login from "../views/Login";
import Home from "@/views/Home/Home";
import Welcome from "@/views/Welcome";
import User from "@/views/User/User";
import Rights from "@/views/Power/Rights";
import Roles from "@/views/Power/Roles";
import Category from "@/views/Category/Category";


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Category
      }
    ]
  },
  {

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径来
  //next 函数 放行
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

