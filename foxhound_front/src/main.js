import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios';
import VueCookies from 'vue-cookies'
import { BootstrapVue,  BootstrapVueIcons} from 'bootstrap-vue'
import ErrorModal from './plugins/ErrorModal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';


Vue.use(ErrorModal)
Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
Vue.config.productionTip = false
store.dispatch('checkAuth').then(() => {
  new Vue({
    router,
    store: store,
    render: h => h(App)
  }).$mount('#app')
})
Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
Axios.defaults.headers.common['Content-Type'] = 'application/json';
