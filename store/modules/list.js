import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  lists: [],
  active_list: null,
  active_list_items: [],
  active_list_info: [],
}

const getters = {
    getListsForRepo: state => { return state.lists; },
    getActiveList: state => { return state.active_list; },
    getActiveListItems: state => { return state.active_list_items; }
}

const actions = {

    /*
     *
    */
    getListsForRepo: function(context, repo_id){
        if(!context.rootState.token) return false;

        return api.get('list/getRepoLists/' + repo_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response){
                context.commit('GET_REPO_LISTS', response);
                return response;
            })
            .catch(function(error){
                context.commit('API_FAILURE', error, {'root': true});
                return extractAPIError;
            })
    },

    /*
     *
    */
    getListItemsForList: function(context, list_id){
        if(!context.rootState.token) return false;
        return api.get('list/getListItems/' + context.rootGetters['repos/getActiveRepoID'] + '/' + list_id, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response){
                context.commit('GET_LIST_ITEMS', response);
                context.commit('GET_LIST_INFO', response);
                return response;
            })
            .catch(function(error){
                context.commit('API_FAILURE', error, {'root': true});
                return extractAPIError;
            })
    },
    /*
     *
    */
    editList: function(context, data){
        if (!context.rootState.token) return false;
        return api.post('/list/editList/' + context.rootGetters['repos/getActiveRepoID'] + '/' + data.id, data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('SET_MESSAGE', 'Saved changes to list <em>' + data.name + '</em>', {'root': true});
                return response;
            })
        .catch(function(error) {
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    /*
     *
    */
    addList: function(context, data){
        if (!context.rootState.token) return false;
        return api.post('/list/addList/' + context.rootGetters['repos/getActiveRepoID'], data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('ADD_LIST', response);
                context.commit('SET_MESSAGE', 'Created new list <em>' + data.name + '</em>', {'root': true});
                return response;
            })
        .catch(function(error) {
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    /*
     *
    */
    deleteList: function(context, list_id){
        if (!context.rootState.token) return false;
        return api.post('/list/deleteList/' + context.rootGetters['repos/getActiveRepoID'] + '/' + list_id, { }, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('DELETE_LIST', response);
                context.commit('SET_MESSAGE', 'Deleted list', {'root': true});
                return response;
            })
        .catch(function(error) {
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    }
}

const mutations = {
    GET_REPO_LISTS: function(state, response){
        var repo_lists = [];
        if(response){
            var lists = response['lists'];
            state.lists = lists;
        }
    },
    GET_LIST_ITEMS: function(state, response){
        var list_items = [];
        if(response){
            var active_list = response['list_id'];
            state.active_list = active_list;
            var list_items = response['items'];
            state.active_list_items = list_items;
        }
    },
    GET_LIST_INFO: function(state, response){
        var list_info = [];
        if(response){
            list_info['id'] = response['list_id'];
            list_info['name'] = response['name'];
            list_info['code'] = response['code'];
            list_info['description'] = response['description'];
            list_info['merge_allowed'] = response['merge_allowed'];
            state.active_list_info = list_info;
        }
    },
    ADD_LIST: function(state, response){
        if(response){
            state.lists.push(response['type']);
            state.active_list = response['type']['id'];
        }
    },
    DELETE_LIST: function(state, response){
        if(response){
            for(var i in state.lists) {
                if (state.lists[i].id == response.list_id) {
                    state.lists.splice(i, 1);
                    break;
                }
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
