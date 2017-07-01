import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import ClickConfirm from 'click-confirm'

Vue.use(VueRouter, Vuex, axios);

const routes = require('./routes.js')
const App = require('./components/App.vue')
const store = require('./store/store.js')

const router = new VueRouter({
  routes: routes.default
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  http: {
    root: '.'
  },
  created: function() {
    store.default.getters.getToken
  },
  store
})
Vue.component('clickConfirm', ClickConfirm);
Vue.component('autocomplete',require('./components/ui/Autocomplete.vue'));

export default store