import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ClickConfirm from 'click-confirm'

Vue.use(VueRouter, axios);

const routes = require('./routes.js')
const App = require('./App.vue')
const store = require('./store.js')
const userStore = require('./store/user')

const router = new VueRouter({
  routes: routes.default
});

new Vue({
  store,
  el: '#app',
  render: h => h(App),
  router: router,
  http: {
    root: '../'
  },
  created: function() {
    store.default.getters.getToken
  }
})
Vue.component('clickConfirm', ClickConfirm);