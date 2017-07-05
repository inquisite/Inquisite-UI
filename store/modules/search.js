import api from '../api.js'
import store from '../store.js'
import { apiHeaders } from '../../lib/utils.js'

// initial state
const state = {
  history: [],
  results: []
}

// getters
const getters = {
     getResults: state => { return state.results; },
     getHistory: state => { return state.history; }
}

// actions
const actions = {
    /**
     *
     */
    quick: function(context, q) {
        if(!context.rootState.token) return false;

        return api.get('/search?q=' + escape(q), {headers: apiHeaders({"auth": false, "form": true})})
            .then(function(response) { 
                context.commit('QUICK_SEARCH', response) 
            }).catch(function(error) { context.commit('API_FAILURE', error, {'root': true }) })
    }
}

// mutations
const mutations = {
    QUICK_SEARCH: function(state, response) { 
        state.results = [];
        if (response.count > 0) {
             console.log("GOTxx IT", response);
            state.results = response.results;
            if (state.history.search(response.expression) !== false) { state.history.push(response.expression); }
        }
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}