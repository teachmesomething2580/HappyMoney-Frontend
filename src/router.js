import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import DetailSignView from './views/DetailSignView.vue'
import JoinStoreView from './views/JoinStoreView.vue'

import DetailSignIn from '@/components/sign/DetailSignIn.vue'
import DetailSignUp from '@/components/sign/DetailSignUp.vue'

import HappyJoinStore from '@/components/joinStore/HappyJoinStore.vue'
import Store from '@/components/joinStore/Store.vue'
import StoreDetail from '@/components/joinStore/StoreDetail.vue'

Vue.use(Router)

var router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sign',
      component: DetailSignView,
      children: [
        {
          path: 'in',
          name: 'login',
          component: DetailSignIn
        },
        {
          path: 'up',
          name: 'signup',
          component: DetailSignUp
        }
      ],
      meta: {
        authCantAccess: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/store',
      component: JoinStoreView,
      children: [
        {
          path: 'happyShopStore',
          component: HappyJoinStore
        },
        {
          path: 'onlineStore',
          component: Store,
        },
        {
          path: 'offlineStore',
          component: Store
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const now_auth = Vue.cookie.get('Authorization');
  // 로그인된상태에서 Login 페이지로 접근하려할 시

  if (to.matched.some(record => record.meta.authCantAccess)) {

    if (now_auth !== null) {

      if ( from.path === '/' ) {
        next(from.fullPath);
        console.log("루트에서 로그인한 사용자가 접근한다.")
        return false;
      } else {
        next(from.fullPath);
        console.log("어디선가 로그인한 사용자가 접근한다.")
        return false;
      }
    }
  }

  // authRequired는 Login을 필요로 하는 페이지 모두 Redirect 시킨다.
  if (to.matched.some(record => record.meta.authRequired)) {
    // 로그인이 되어있지 않다면 login 페이지로 리다이렉트

    if (now_auth === null) {
      console.log("로그인되지 않은 사용자가 로그인 페이지에 접근한다.")
      router.push({
        name: 'login',
        query: {
          nextUrl: to.fullPath
        }
      })
    }
  }

  // 정상 페이지 출력
  next();
});

export default router;
