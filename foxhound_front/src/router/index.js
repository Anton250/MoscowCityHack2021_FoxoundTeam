import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

let opts = {
  routes: [
    {
      path: "/",
      component: () => import('../components/Params.vue'),
      name: "Home",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/map",
      name: "map",
      component: () => import('../components/Map.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/team",
      name: "team",
      component: () => import('../components/Team.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/algo",
      name: "algo",
      component: () => import('../components/AlgoInfo.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../components/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
  ],
  linkExactActiveClass: 'active'
};
const router = new VueRouter(opts);

export default router
