import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  history: [],
  results: {},
  counts: {},
  count: 0
}

// getters
const getters = {
     getResults: state => { return state.results; },// results per-type
     getCounts: state => { return state.counts; },  // counts per-type
     getCount: state => { return state.count; },    // total number of results across all types
     getHistory: state => { return state.history; },
     getLastSearch: state => { 
        return state.history[state.history.length - 1]; 
    }
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
                context.commit('QUICK_SEARCH', response);
                return true;
            }).catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    }
}

// mutations
const mutations = {
    QUICK_SEARCH: function(state, response) { 
        state.results = [];
        if (response.count > 0) {
            state.results = response.results;
            state.counts = response.counts;
            state.count = response.count;
            if (state.history.indexOf(response['expression']) === -1) { 
                state.history.push(response['expression']); 
            }
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