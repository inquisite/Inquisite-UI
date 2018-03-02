import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  personInfo: {}
}

// getters
const getters = {
    getPersonInfo: state => { return state.personInfo; }
}

// actions
const actions = {
    /**
     *
     */
    editPerson: function(context, data) {
      if (!context.rootState.token) return false;
      return api.post('/people/edit', data, {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { 
            context.commit('EDIT_PERSON', response); 
            context.commit('SET_MESSAGE', "Saved changes", {'root': true});
            
            return response;
        }).catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },

    /**
     *
     */
    getPersonInfo: function(context, id) {
      if (!context.rootState.token) return false;
      return api.post('/people/info', {"person_id": id }, {headers: apiHeaders({"auth": true})})
        .then(function(response) { 
            context.commit('GET_PERSON_INFO', response); 
            return response; 
        })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
}

// mutations
const mutations = {
    GET_PEOPLE: function(state, response) { state.users = response.people },
    EDIT_PERSON: function(state, response) { 
        state.message = response.msg;
    },
    GET_PERSON_INFO: function(state, response) { 
        console.log("Commit GET PERSON INFO", response);
        state.personInfo = response.person;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}