import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  records: [],
  export_source: null,
  export_filename: ''
}

// getters
const getters = {
     getExportRecords: state => { return state.records; },// get records to be exported
     getExportRepo: state => { return state.export_repo; },  // repo_id for repo being exported
     getExportSchema: state => { return state.export_schema; },    // schema_id of schema being exported
     getExportFilename: state => { return state.export_filename; }, // get currently set export filename
}

// actions
const actions = {
    /**
     *
     */
    generateExport: function(context) {
        if(!context.rootState.token) return false;

        return api.post('/export', state.export_source, {headers: apiHeaders({"auth": false, "form": true})})
            .then(function(response) {
                return response;
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
