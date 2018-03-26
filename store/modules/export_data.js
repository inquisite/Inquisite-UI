import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  records: [],
  export_source: null,
}

// getters
const getters = {
     getExportRecords: state => { return state.records; },// get records to be exported
     getExportRepo: state => { return state.export_repo; },  // repo_id for repo being exported
     getExportSchema: state => { return state.export_schema; },    // schema_id of schema being exported
}

// actions
const actions = {
    /**
     *
     */
    generateExport: function(context, export_filename) {
        if(!context.rootState.token) return false;

        return api.post('/export', state.export_source, {headers: apiHeaders({"auth": false, "form": true})})
            .then(function(response) {
                let exp = new Blob([JSON.stringify(response)], {type: 'application/json'});
                let exp_link = document.createElement('a');
                exp_link.href = window.URL.createObjectURL(exp);
                exp_link.download = export_filename;
                exp_link.click()
                return exp_link;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    createExportSource: function(context, source){
        context.commit('SET_SOURCE', source);
    }
}

// mutations
const mutations = {
    SET_SOURCE: function(state, source){
        state.export_source = source;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
