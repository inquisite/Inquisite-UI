import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

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
  created: function() {
    console.log('calling userStore')
    store.default.getters.get_token
  }
})
