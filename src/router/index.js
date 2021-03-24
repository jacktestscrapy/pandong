import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/register',
    name: 'Register',

    component: ()=>import(/* webpackChunkName: "register" */ '../views/register/Register.vue'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({name:'Login'}):next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import(/* webpackChunkName: "register" */ '../views/login/Login.vue'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin?next({name:'Home'}):next()
    }
  },
  {
    path: '/shop/:id',
    name: 'ShopDetail',
    component: ()=>import(/* webpackChunkName: "shop" */ '../views/shop/ShopDetail.vue'),

  },
  {
    path: '/orderConfirmation/:id/:addressId?',
    name: 'OrderConfirmation',
    component: ()=>import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation.vue'),

  },
  {
    path: '/choseAddressList/:shopId',
    name: 'ChoseAddressList',
    component: ()=>import(/* webpackChunkName: "chooseAddressList" */ '../views/choseAddressList/ChoseAddressList.vue'),

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
 // 解构赋值
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' });
})

export default router
