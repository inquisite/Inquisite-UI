import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);

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
    console.log('calling userStore')
    store.default.getters.get_token
  }
})
