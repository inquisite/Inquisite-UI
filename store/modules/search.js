import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  history: [],
  results: {},
  counts: {},
  count: 0,
  total_counts: {},
  slices: {}
}

// getters
const getters = {
     getResults: state => { return state.results; },// results per-type
     getCounts: state => { return state.counts; },  // counts per-type
     getCount: state => { return state.count; },    // total number of results across all types
     getTotalCounts: state => { return state.total_counts; }, // total number of results found (not just this page)
     getSlices: state => { return state.slices; },
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
                return response;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    pagingSearch: function(context, qArray){
        if(!context.rootState.token) return false;
        var q = qArray[0];
        var node = qArray[1];
        var start = qArray[2];
        var end = qArray[3];
        return api.get('/pagingSearch?q=' + escape(q) + '&n=' + escape(node) + '&s=' + escape(start) + '&e=' + escape(end), {headers: apiHeaders({"auth": false, "form": true})})
            .then(function(response) {
                context.commit('PAGING_SEARCH', [response, node]);
                return response;
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
            state.slices = response.slices;
            state.total_counts = response.total_counts;
            if (state.history.indexOf(response['expression']) === -1) {
                state.history.push(response['expression']);
            }
        }
    },
    PAGING_SEARCH: function(state, rGroup) {
        var response = rGroup[0];
        var node = rGroup[1];
        if (response.count > 0){
            state.results[node] = response.results[node];
            state.counts[node] = response.counts[node];
            state.slices[node] = response.slices[node];
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
