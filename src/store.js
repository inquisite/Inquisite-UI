// Vue Store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    username: '',
    user_id: ''
   
  },
  getters: {
    is_loggedin(state) {
      return state.logged_in;
    }
  },
  mutations: {
    login:  state => state.logged_in = true,
    logout: state => state.logged_in = false,
    setUsername(state, username) {
      state.username = username
    },
    setUserID(state, user_id) { 
      state.user_id = user_id
    }
  },
  actions: {
    login: context => context.commit('login'),
    logout: context => context.commit('logout'),
    setUsername(context, username) {
      context.commit('setUsername', username) 
    },
    setUserID(context, user_id) {
      context.commit('setUserID', user_id)
    }
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

