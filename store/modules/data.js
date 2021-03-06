import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  active_data: [],               // for data component
  upload_row_count: 0,
  upload_fields: [],
  upload_subfields: [],
  loaded_data: null,
  import_events: []
}

// getters
const getters = {
     getUploadRowCount: state => { return state.upload_row_count; },
     getUploadFields: state => { return state.upload_fields; },
     getUploadSubfields: state => { return state.upload_subfields; },

     getDataHeaders: function(state) {
        if (state.loaded_data) {
            return state.loaded_data.columns.filter(function(v) { return v != 'uuid'}).map(x => state.loaded_data.columnNames[x]['name']);
        }
        return [];
     },
     getDataColumnSpec: function(state) {
        if (state.loaded_data) {
            return state.loaded_data.columns.filter(function(v) { return v != 'uuid'}).map(function(v) { return {
                'data': v,
                'renderer': 'html',
                'column': state.loaded_data.columnNames[v]
            }});
        }
        return [];
     },
     getData: function(state) {
        if (state.loaded_data) {
            return state.loaded_data.data;
        }
        return [];
     },
     getImportEvents: state => { return state.import_events; }
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
    importData: function(context, data) {
        if(!context.rootState.token) return false;

        return api.post('/upload/import', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('IMPORT_DATA', response);
                return response;
            })
            .catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },


    /**
     *
     */
    getDataNodes: function(context, data) {
        if(!context.rootState.token) return false;

        return api.post('/repositories/data', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('REPO_DATA', response);
                return response;
            })
            .catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    /**
     *
     */
    getDataCounts: function(context, data){
        if(!context.rootState.token) return false;

        return api.post('/repositories/dataCounts', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('REPO_DATA_COUNTS', response);
                return response;
            })
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
        context.rootState.message = "";

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
        if (!node_id) { node_id = data['uuid']; }
        delete(data['node_id']);
        delete(data['uuid']);
        return api.post('/data/saveNode/' + node_id, data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('SAVE_DATA_NODE', response);
                rootState.message = "Saved data";
                return response;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },

    /**
     *
     */
    getDataForType: function(context, data, init=true) {
        if (init) {
            state.loaded_data = null;
        }
        if(!context.rootState.token) return false;
        context.rootState.message = "";

        var c = context, d=data;
        var count = 0, start = d.start ? d.start : 0, limit = d.limit ? d.limit : 2000;
        var repo_id = data.repo_id, type_id = data.type;

        if (!d.start) { d.start = 0}
        if (!d.limit) { d.limit = limit}

        return api.get('/data/getDataForType/' + repo_id + '/' + type_id + '/' + start + '/' + limit, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('GET_DATA_FOR_TYPE', response);
                count = response['count'];

                if (count > 0){
                    d.start += limit;
                    actions.getDataForType(c, d, false);
                }

                return response;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            });
    },
    /**
     *
     */
    importEventsForRepo: function(context, data) {
        if(!context.rootState.token) return false;
        context.rootState.message = "";

        return api.get('/upload/importEventsForRepo/' + data.repo_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('GET_IMPORT_EVENTS', response);
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
      state.message = response.msg;
      state.upload_row_count = response.row_count;
      state.upload_fields = response.fieldnames;
      state.upload_subfields = response.nestednames;
    },

    IMPORT_DATA: function(state, response) {
        state.message = response.msg;
    },

    REPO_DATA: function(state, response) { state.message = response.msg; state.active_data = response.data },

    REPO_DATA_COUNTS: function(state, response) {
        // noop
    },

    GET_DATA_NODE: function(state, response) {
        // noop
    },
    SAVE_DATA_NODE: function(state, response) {
        // noop
    },
    GET_DATA_FOR_TYPE: function(state, response) {
        if (state.loaded_data == null) {
            state.loaded_data = response;
        } else if(response.data && response.data.length > 0) {
            state.loaded_data.data = state.loaded_data.data.concat(response.data);
        }
    },
    GET_IMPORT_EVENTS: function(state, response) {
        state.import_events = response;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
