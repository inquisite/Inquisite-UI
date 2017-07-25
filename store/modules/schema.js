import api from '../api.js'
import store from '../store.js'
import { apiHeaders } from '../../lib/utils.js'

// initial state
const state = {
  data_types: []
}

// getters
const getters = {
     getDataTypes: state => { return state.data_types; },
     getFieldTypeList: function(state) {
        // TODO: pull this from a back-end service
        return {
            'TEXT': {
                'name': 'Text',
                'description': 'Alphanumeric text',
                'properties': {
                    'minimum-length': {
                        'type': 'int',
                        'minimum': 0
                    },
                    'maximum-length': {
                        'type': 'int',
                        'minimum': 0
                    }
                }
            },
            'INT': {
                'name': 'Integer',
                'description': 'Numeric integer (whole) value',
                'properties': {
                    'minimum-value': {
                        'type': 'int'
                    },
                    'maximum-value': {
                        'type': 'int'
                    }
                }
            },
            'FLOAT': {
                'name': 'Float',
                'description': 'Floating point value',
                'properties': {
                    'minimum-value': {
                        'type': 'float'
                    },
                    'maximum-value': {
                        'type': 'float'
                    }
                }
            }
        };
     }
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
        .catch(function(error) { context.commit('API_FAILURE', error, { root: true }) });
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
            })
        .catch(function(error) { context.commit('API_FAILURE', error, { root: true }) });
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
            })
        .catch(function(error) { context.commit('API_FAILURE', error, { root: true }) });
    }
}

// mutations
const mutations = {
    GET_DATA_TYPES: function(state, response) { 
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
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}