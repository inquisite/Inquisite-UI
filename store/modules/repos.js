import api from '../api.js'
import store from '../store.js'
import { apiHeaders } from '../../lib/utils.js'

// initial state
const state = {
  user_repos: [],               // list of repositories for currently logged in user
  active_repo: {},              // info for currently active repository 
  active_repo_id: null          // id for currently active repository
}

// getters
const getters = {
    /**
     * Get info to currently active repository
     */
    getActiveRepo: state => { return state.active_repo;  },
    
    /**
     * Get info for repository with id. Repository must be accessible to the current user.
     * 
     * @param id integer repository id
     * @return Object with repository data or null if no repository is found
     *
     */
    getRepoByID: state => {
        return function(id) {
            var repo_id = parseInt(id);
            var matches = $.grep(state.user_repos, function(repo) { return parseInt(repo.id) === repo_id; });
            return (matches.length > 0) ? matches[0] : null;
        };
    },

    /**
     * Return repo_id for currently selected repository
     */
    getActiveRepoID: state => { 
        return window.sessionStorage.getItem('repo_id');
    }
}

// actions
const actions = {
    /**
     * Create new repository
     *
     * @param context
     * @param data An object with options + new repository metadata. Repository metadata should be put in an object for key "data". Options include:
     *          makeActive = Make newly created repository the user's active repository [Default is false]
     */
    addRepo: function(context, data) {
        if (!context.state.token) return false;
        var setAsActive = data.makeActive ? true : false;
        return api.post('/repositories/add', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('ADD_REPO', response); 
                var new_repo_id = response.repo.id

                context.dispatch('people/getRepos', {}).then(function() { 
                    if((context.getters.repos.length == 0) || setAsActive) {
                      context.commit('SET_ACTIVE_REPO', new_repo_id);
                    }     
            });
        })
        .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     * Edit repository metadata
     *
     * @param context
     * @param data An object with options + new repository metadata. Repository metadata should be put in an object for key "data". Options include:
     *          makeActive = Make newly created repository the user's active repository [Default is false]
     */
    editRepo: function(context, data) {
        if (!context.state.token) return false;
        var setAsActive = data.makeActive ? true : false;
        return api.post('/repositories/' +  data['id'] + '/edit', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { 
                context.commit('EDIT_REPO', response); 
            })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },


    /**
     *
     */
    deleteRepo: function(context, data, router) {
        if (!context.state.token) return false;
        var router = data['router'];
        return api.post('/repositories/delete', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('DELETE_REPO', response);
                if (router) { router.push("/"); }
            })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     *
     */
    getRepoUsers: function(context, data) {
        if (!context.state.token) return false;
        return api.post('/repositories/users', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('GET_REPO_USERS', response); })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     *
     */
    getPeople: function(context, data) {
        if (!context.state.token) return false;
        return api.get('/people', {headers: apiHeaders({"auth": true})})
            .then(function(response) { context.commit('GET_PEOPLE', response); })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     *
     */
    addPersonToRepo: function(context, data) {
        if (!context.state.token) return false;
        return api.post('/repositories/add_collaborator', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('ADD_PERSON_REPO', response); })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
    *
    */
    removePersonFromRepo: function(context, data) {
        if (!context.state.token) return false;
        return api.post('/repositories/remove_collaborator', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('REMOVE_PERSON_REPO', response); })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    }   
}

// mutations
const mutations = {
    ADD_REPO: function(state, response) { state.msg = response.msg },
    EDIT_REPO: function(state, response) { state.msg = response.msg },
    ADD_PERSON_REPO: function(state, response) { state.msg = response.msg },
    REMOVE_PERSON_REPO: function(state, response) { state.msg = response.msg },
    DELETE_REPO: function(state, response) { 
        state.msg = response.msg 
        var deleted_repo_id = response.repo_id;
    
        // remove deleted repo from repolist
        for(var i in state.user_repos) {
            if (state.user_repos[i].id && (parseInt(state.user_repos[i].id) == parseInt(deleted_repo_id))) {
                state.user_repos.splice(i, 1);
            }
        }
        if (state.user_repos.length > 0) {
            state.dispatch('setActiveRepo', state.user_repos[0]['id']);
        }
    },
    GET_REPO_USERS: function(state, response) { 
        state.active_repo.users = response.users; 
        state.msg = response.msg 
    },
    SET_REPOS: function(state, response) {
        state.user_repos = response.repos;
        state.active_repo_id = window.sessionStorage.getItem('repo_id');
        if (!state.active_repo_id) {
            state.active_repo_id = state.user_repos[0]['id'];
        }
        
        for(var i in state.user_repos) {
            if (state.user_repos[i]['id'] == state.active_repo_id) {
                state.active_repo  = state.user_repos[i];
                break;
            }
        }
    },
    SET_ACTIVE_REPO: function(state, active_repo_id) { 
        window.sessionStorage.setItem('repo_id', active_repo_id);
        state.active_repo_id = active_repo_id;
    
        for(var i in state.user_repos) {
            if (state.user_repos[i]['id'] == active_repo_id) {
                state.active_repo  = state.user_repos[i]
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