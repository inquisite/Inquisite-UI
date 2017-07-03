import api from '../api.js'
import store from '../store.js'
import { apiHeaders } from '../../lib/utils.js'

// initial state
const state = {
  data_types: []
}

// getters
const getters = {
     getDataTypes: state => { return state.data_types; }
}

// actions
const actions = {
    /**
     *
     */
    getDataTypes: function(context, repository_id) {
        if(!context.rootState.token) return false;

        return api.get('schema/getTypes/' + repository_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('GET_DATA_TYPES', response) })
            .catch(function(error) { context.commit('API_FAILURE', error, {'root': true }) })
    }
}

// mutations
const mutations = {
    GET_DATA_TYPES: function(state, response) { 
        console.log("got types", response);
      state.data_types = response.types;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}