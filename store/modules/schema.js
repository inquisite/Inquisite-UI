import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  data_types: [],
  default_data_type: null
}

// getters
const getters = {
     getDataTypes: state => { return state.data_types; },
     getFieldDataTypeList: state => { return state.field_data_types; },
     getDefaultDataType: function() { return state.default_data_type; }
}

// actions
const actions = {
    /** 
     *
     */
    getFieldDataTypeList: function(context) {
        return api.get('schema/getDataTypes', {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('GET_FIELD_DATA_TYPE_LIST', response); return true; })
            .catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    /**
     *
     */
    getDataTypes: function(context, repo_id) {
        if(!context.rootState.token) return false;

        return api.get('schema/getTypes/' + repo_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('GET_DATA_TYPES', response); return true; })
            .catch(function(error) { 
                context.commit('API_FAILURE', error, {'root': true });
                return extractAPIError(error);
            })
    },
    
    /**
     * Create new data type
     *
     * @param context
     * @param data
     */
    addDataType: function(context, data) {
        if (!context.rootState.token) return false;
        return api.post('/schema/addType/' + context.rootGetters['repos/getActiveRepoID'], data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('ADD_DATA_TYPE', response); 
                context.commit('SET_MESSAGE', 'Created new data type <em>' + data.name + '</em>', {'root': true});
                
                return response;
            })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    /**
     * Edit existing data type
     *
     * @param context
     * @param data
     */
    editDataType: function(context, data) {
        if (!context.rootState.token) return false;
        console.log("SENT", data);
        return api.post('/schema/editType/' + context.rootGetters['repos/getActiveRepoID'] + '/' + data.id, data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('EDIT_DATA_TYPE', response); 
                context.commit('SET_MESSAGE', 'Saved changes to data type <em>' + data.name + '</em>', {'root': true});
                return true;
            })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    /**
     *
     */
    deleteDataType: function(context, type_id) {
        if (!context.rootState.token) return false;
        return api.post('/schema/deleteType/' + context.rootGetters['repos/getActiveRepoID'] + '/' + type_id, { }, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('DELETE_DATA_TYPE', response); 
                context.commit('SET_MESSAGE', 'Deleted type', {'root': true});
                return true;
            })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    }
}

// mutations
const mutations = {
    GET_DATA_TYPES: function(state, response) { 
        // unwrap settings
        if (response) {
            for(var i in response) {
                if (response[i].fields) {
                    for(var j in response[i].fields) {
                        if (response[i].fields[j].settings) {
                            for(var k in response[i].fields[j].settings) {
                                response[i].fields[j]['settings_' + k] = response[i].fields[j].settings[k];
                            }
                        }
                    }
                }
            }
        }
        
        if (response[0]) {
            state.default_data_type = response[0]['id'];
        }
        
        console.log("got types", response);
        state.data_types = response;
    },
    ADD_DATA_TYPE: function(state, response) { 
        console.log("add type", response);
        response.type['fields'] = [];
        state.data_types.push(response.type);
    },
    EDIT_DATA_TYPE: function(state, response) { 
        console.log("edit type", response);
        
        // set field id's for newly created fields (ICK)
        if(response.field_status) {
            for(var k in response.field_status) {
                for(var i in state.data_types) {
                    for(var j in state.data_types[i]['fields']) {
                        if((state.data_types[i]['fields'][j]['code'] == k) && !state.data_types[i]['fields'][j]['id']) {
                            state.data_types[i]['fields'][j]['id'] = response.field_status[k]['field_id'];   
                        }
                    }
                }
            }
        }
    },
    DELETE_DATA_TYPE: function(state, response) { 
        console.log("delete type", response);
        for(var i in state.data_types) {
            if (state.data_types[i].id == response.type_id) { 
                console.log("remove type at ", i);
                state.data_types.splice(i, 1);
                break;
            }
        }
    },
    GET_FIELD_DATA_TYPE_LIST: function(state, response) {
        console.log("set field data types", response);
        state.field_data_types = response;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}