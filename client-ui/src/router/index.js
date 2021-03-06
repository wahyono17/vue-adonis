import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'
import Yono from '../views/Yono.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'
import Projects from '../views/Projects.vue'
import Profile from '../views/Profile.vue'
import ListTest from '../views/ListTest'
import Basket from '../views/Basket.vue'
import Orders from '../views/Orders.vue'
import OrdersReady from '../views/OrdersReady.vue'
import Order from '../views/Order.vue'
import Accounts from '../views/Accounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/list',
    name: 'list',
    component: ListTest
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/orders/ready',
    name: 'orders/ready',
    component: OrdersReady
  },
  {
    path: '/order/:id',
    name: 'order',
    component: Order
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
  },
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
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/',
    name: 'main',
    component: Landing,
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    path: '/product/:id',
    name: 'productById',
    component: Product,
  },
  {
    path: '/yono',
    name: 'yono',
    component: Yono,
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
