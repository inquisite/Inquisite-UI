import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from './Home.vue'
Vue.component('home', Home)

import Signup from './Signup.vue'
Vue.component('signup', Signup)

import Login from './Login.vue'
Vue.component('login', Login)

import App from './App.vue'

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
