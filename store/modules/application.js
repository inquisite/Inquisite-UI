import store from '../store.js'

// initial state
const state = {
  publication_statuses: [{'name':'Private', 'value': 0}, {'name': 'Published', 'value': 1}],
  licences: [
      {'name': 'Not set', 'value': ''},
      {'name': 'Public Domain', 'value': 'PD'},
      {'name': 'Open Database License', 'value': 'ODbL'},
      {'name': 'CC0', 'value': 'CC0'},
      {'name': 'Attribution CC BY', 'value': 'CC-BY'},
      {'name': 'Attribution-NonCommercial CC BY-NC', 'value': 'CC-BY-NC'},
      {'name': 'Attribution-ShareAlike CC BY-SA', 'value': 'CC-BY-SA'},
      {'name': 'Attribution-NoDerivs CC BY-ND', 'value': 'CC-BY-ND'},
      {'name': 'Attribution-NonCommercial-NoDerivs CC BY-NC-ND', 'value': 'CC-BY-NC-ND'}
  ]
}

// getters
const getters = {
     getPublicationStatuses: state => { return state.publication_statuses; },
     getLicenses: state => { return state.licences; }
}

// actions
const actions = {
    
}

// mutations
const mutations = {
    
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}