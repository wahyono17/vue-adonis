import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'products',
    component: Products,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
  },
]

const router = new VueRouter({
  routes
})

export default router
