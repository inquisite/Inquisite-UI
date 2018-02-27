import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

// initial state
const state = {
  user: {                      // Info for currently logged in user
    info: {},
    prefs: {},                      // current user's preferences
    repos: []                       // current user's repositories
  }
    
}

// getters
const getters = {
    getUserInfo: state => { return state.user.info; },
    userIsAdmin: state => { return (state.user && state.user.info) ? (parseInt(state.user.info['is_admin']) != 0): false; },
    getUserRepos: state => { 
        return state.user.repos; 
    },
    getUserRepoCount: state => { 
        return state.user.repos ? state.user.repos.length : 0; 
    },
    getList: state => { return state.people_list; }
}

// actions
const actions = {
    list: function(context) {
        if (!context.rootState.token) return false;
        return api.get('/people', {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { 
            console.log("COMMIT", response);
            context.commit('GET_PERSON_LIST', response); 
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
    editPerson: function(context, data) {
      if (!context.rootState.token) return false;
      return api.post('/people/edit', data.data, {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { 
            context.commit('EDIT_PERSON', response); 
            context.commit('SET_MESSAGE', "Saved changes", {'root': true});
            
            return true;
        }).catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },

    /**
     * Data must include keys:
     *      reset_key = a valid password reset key
     *      password = new password to set
     */
    setPassword: function(context, data) {
        return api.post('/people/' + data.reset_key + '/set_password', {'password': data.password}, {})
          .then(function(response) { 
              context.commit('SET_PASSWORD', response); 
              //context.commit('SET_MESSAGE', response.msg, {'root': true});
              
              return response;
          }).catch(function(error) { 
              context.commit('API_FAILURE', error, { root: true });
              return extractAPIError(error);
          });
      },

    /**
     *
     */
    getUserInfo: function(context, data) {
      if (!context.rootState.token) return false;
      return api.get('/people/info', {headers: apiHeaders({"auth": true})})
        .then(function(response) { context.commit('GET_USER_INFO', response); return true; })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },

    /**
     *
     */
    getRepos: function(context, data) {
      if (!context.rootState.token) return false;
      return api.get('/people/repos', {headers: apiHeaders({"auth": true})})
        .then(function(response) { 
          context.commit('GET_REPOS', response);
          context.commit('repos/SET_REPOS', response, { root: true });
          return response;
        })
        .catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    
    /**
     *
     */
    findPeople: function(context, data) {
        if(!context.rootState.token) return false;

        return api.post('people/find', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                return response;
            })
            .catch(function(error) { 
                context.commit('API_FAILURE', error, { root: true });
                return extractAPIError(error);
            })
    }
}

// mutations
const mutations = {
    GET_PEOPLE: function(state, response) { state.users = response.people },
    EDIT_PERSON: function(state, response) { 
        state.message = response.msg;
        state.user.info.name = state.user.info.forename + " " + state.user.info.surname;
    },
    GET_USER_INFO: function(state, response) { 
        state.user = response.person;

        if(!('prefs' in response.person)) {
            state.user.prefs = {default_repo_id: null};
        } else {
            state.user.prefs = (typeof response.person.prefs === 'object') ? response.person.prefs : JSON.parse(response.person.prefs);

            if (response.repos.length > 0) {
                state.active_repo = response.repos[0];
                //store.commit('setDefaultRepo', response.repos[0]);
            }
        }

        state.user.repos = response.repos
    },
    GET_REPOS: function(state, response) { 
        state.user.repos = response.repos; 
        state.user.info = response.userinfo; 
        state.message = response.msg;
        state.loading = false;
    },

    GET_PERSON_LIST: function(state, response) {
        state.people_list = response.people;
    },

    SET_PASSWORD: function(state, response) {
        // noop
    },
    

    // User Prefs
    /**
     *
     */
    setUserForename: function(state, newName) { state.user.info.forename = newName },
    setUserSurname: function(state, newName) { state.user.info.surname = newName },
    setUserEmail: function(state, newEmail) { state.user.info.email = newEmail },
    setUserLocation: function(state, newLocation) { state.user.info.location = newLocation },
    setUserTagline: function(state, newTagline) { state.user.info.tagline = newTagline },
    setUserUrl: function(state, newUrl) { state.user.info.url = newUrl }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}