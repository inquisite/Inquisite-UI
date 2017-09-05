import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  active_data: [],               // for data component
  upload_row_count: 0,
  upload_fields: [],
  upload_subfields: []
}

// getters
const getters = {
     getUploadRowCount: state => { return state.upload_row_count; },
     getUploadFields: state => { return state.upload_fields; },
     getUploadSubfields: state => { return state.upload_subfields; }
}

// actions
const actions = {
    /**
     *
     */
    uploadData: function(context, data) {
        if (!context.rootState.token) return false;
        var fd = new FormData();
        var progCallback = data.progressCallback;
        fd.append('data_file', data.form.data_file);  
        fd.append('repo_id', data.form.repo_id);

        return api.put('/upload', fd, {
            headers: apiHeaders({"auth": true, "upload": true}),  
            onUploadProgress: function(progressEvent) {
              if (progCallback) { progCallback(Math.round((progressEvent.loaded * 100) / progressEvent.total)); }
            }})
            .then(function(response) {
                context.commit('UPLOAD_DATA', response);
                return response;
            })
            .catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            });
    },

    /**
     *
     */
    getDataNodes: function(context, data) {
        if(!context.rootState.token) return false;

        return api.post('/repositories/data', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('REPO_DATA', response) })
            .catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    /**
     *
     */
    getDataNode: function(context, node_id) {
        if(!context.rootState.token) return false;
        context.rootState.msg = "";

        return api.get('/data/getNode/' + node_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('GET_DATA_NODE', response);
                return response;
            }).catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    
    /**
     *
     */
    saveDataNode: function(context, data) {
        if(!context.rootState.token) return false;
        var rootState = context.rootState;
        
        var node_id = data['node_id'];
        delete(data['node_id']);
        return api.post('/data/saveNode/' + node_id, data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('SAVE_DATA_NODE', response);
                rootState.msg = "Saved data";
                return response;
            }).catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    }
}

// mutations
const mutations = {
    UPLOAD_DATA: function(state, response) { 
      state.msg = response.msg; 
      state.teaser = response.data;
      state.upload_row_count = response.row_count;  
      state.upload_fields = response.fieldnames;
      state.upload_subfields = response.nestednames;
    },
    REPO_DATA: function(state, response) { state.msg = response.msg; state.active_data = response.data },
    
    GET_DATA_NODE: function(state, response) { 
        // noop
    },
    SAVE_DATA_NODE: function(state, response) { 
        // noop
    }
    
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}