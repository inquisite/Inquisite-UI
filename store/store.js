// Vue Store

import Vue from 'vue'
import Vuex from 'vuex'
import {getters, mutations, actions} from './root'
import people from './modules/people'
import repos from './modules/repos'
import data from './modules/data'

Vue.use(Vuex)

const state = {
  msg: '',                      // flash message
  logged_in: false,             // user is logged in
  loading: true,                // loading data flag
  token: '',                    // current JWT token
  refresh: '',                  // JWT refresh token
  teaser: '... uploading file', // for data component
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    people,
    repos,
    data
  }
})

if(module.hot) {

  module.hot.accept([
    './root'
  ], () => {

    store.hotUpdate({
      getters: require('./root'),
      actions: require('./root'),
      mutations: require('./root')
    })

  })
}