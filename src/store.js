// Vue Store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    username: ''
  },
  getters: {
    is_loggedin(state) {
      return state.logged_in;
    }
  },
  mutations: {
    login:  state => state.logged_in = true,
    logout: state => state.logged_in = false
  },
  actions: {
    login: context => context.commit('login'),
    logout: context => context.commit('logout')
  }
})

if(module.hot) {

  module.hot.accept(['./App.vue'], () => {
    const newApp = require('./App.vue').default

    store.hotUpdate({
      modules: { App: newApp}
    });
  })
}

