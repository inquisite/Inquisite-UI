import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(Vuex);

// Load template components
import Home from './Home.vue'
Vue.component('home', Home)

import Signup from './Signup.vue'
Vue.component('signup', Signup)

import Login from './Login.vue'
Vue.component('login', Login)

import App from './App.vue'


// Setup Vuex Store
const store = new Vuex.Store({
  state: {
    logged_in: false
  },
  mutations: {

  }
});

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login }
  ]
});

inquisite = new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
