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
    getUserRepos: state => { 
        return state.user.repos; 
    },
    getUserRepoCount: state => { 
        return state.user.repos ? state.user.repos.length : 0; 
    }
}

// actions
const actions = {
    addPerson: function(context, data) {
        return api.post('/people/add', data.data, {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { 
            context.commit('ADD_PERSON', response); 
            return true;
        }).then(function(response) {
            return context.dispatch("doLogin", {data: {"username": data.data.email, "password": data.data.password}}, { 'root': true });
        }).then(function(response) { 
            return context.dispatch("repos/addRepo", {
                makeActive: true, 
                message: false,
                data: {
                    "name": "My first repository", 
                    "url": data.data.url, 
                    "readme": "This is your first repository in Inquisite. Add your data here, or create additional repositories for different projects."}
                }, { 'root': true }
            );
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
    ADD_PERSON: function(state, response) { state.message = response.msg },
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