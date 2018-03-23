// Vue Store

import Vue from 'vue'
import Vuex from 'vuex'
import {getters, mutations, actions} from './root'
import people from './modules/people'
import repos from './modules/repos'
import data from './modules/data'
import schema from './modules/schema'
import search from './modules/search'
import admin from './modules/admin'
import export_data from './modules/export_data'
import application from './modules/application'

Vue.use(Vuex)

const state = {
  message: '',                  // flash message
  showMessage: false,           // flash message
  logged_in: false,             // user is logged in
  loading: true,                // loading data flag
  token: '',                    // current JWT token
  refresh: ''                   // JWT refresh token
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    people,
    repos,
    data,
    schema,
    search,
    admin,
    application,
    export_data
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
