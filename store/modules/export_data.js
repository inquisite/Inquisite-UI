import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  records: [],
  export_source: null,
  export_name: '',
  export_user: null
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
        if(!context.rootState.token) return false
        console.log("PRE-EXPORT", state.export_source)
        var exporter = state.export_source;
        exporter['name'] = state.export_name;
        exporter['user'] = state.export_user;
        return api.post('/export', exporter, {headers: apiHeaders({"auth": false, "form": true})})
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
        console.log(source);
        context.commit('SET_SOURCE', source);
    },
    storeExportRecords: function(context, recordInfo){
        console.log(recordInfo);
        var export_name = recordInfo[0];
        var record_list = recordInfo[1];
        var export_user = recordInfo[2];
        context.commit('STORE_RECORDS', record_list);
        context.commit('SET_EXPORT_INFO', [export_name, export_user]);
    },
    storeExportInfo: function(context, export_info){
        console.log("STORE", export_info);
        context.commit('SET_EXPORT_INFO', export_info);
    }
}

// mutations
const mutations = {
    SET_SOURCE: function(state, source){
        state.export_source = source;
    },
    STORE_RECORDS: function(state, recordList){
        state.records = recordList;
    },
    SET_EXPORT_INFO: function(state, export_info){
        state.export_name = export_info[0];
        state.export_user = export_info[1]
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
