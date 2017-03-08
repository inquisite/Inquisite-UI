// Vue Store

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  logged_in: false,
  username: '',
  user_id: '',
  token: '',
  user: {},
  active_repo: {},
  repositories: []
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

if(module.hot) {

  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {

    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })

  })
}

export default store
