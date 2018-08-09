import api from '../api.js'
import store from '../store.js'
import { apiHeaders, extractAPIError } from '../../lib/utils.js'

var repos = JSON.parse(window.localStorage.getItem('repos'));
if (!repos) { repos = []; }

// initial state
const state = {
  user_repos: repos,               // list of repositories for currently logged in user
  active_repo_id: parseInt(window.sessionStorage.getItem('repo_id'))          // id for currently active repository
}

// getters
const getters = {
    /**
     * Get info to currently active repository
     */
    getActiveRepo: state => {
        var active_repo_id = parseInt(state.active_repo_id);
        var activeRepo = $.grep(state.user_repos, function(repo) { return parseInt(repo.id) === active_repo_id; });
        return (activeRepo && activeRepo.length > 0) ? activeRepo[0] : {};
    },

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

    getUserRepos: state => { return state.user_repos; },

    /**
     * Return repo_id for currently selected repository
     */
    getActiveRepoID: state => {
        var active_repo_id = state.active_repo_id;
        if ((active_repo_id == null) && (state.user_repos) && (state.user_repos.length > 0)) {
            active_repo_id = state.user_repos[0]['id'];
        }
        return active_repo_id;
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
     *          message = Set created message [Default is true]
     */
    addRepo: function(context, data) {
        if (!context.rootState.token) return false;
        var setAsActive = data.makeActive ? true : false;
        return api.post('/repositories/add', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('ADD_REPO', response);
                var new_repo_id = response.id;

                context.dispatch('people/getRepos', {}, { 'root': true }).then(function() {
                    if((context.state.user_repos.length == 0) || setAsActive) {
                      context.commit('SET_ACTIVE_REPO', new_repo_id);
                    }
                });
            if (data.message !== false) {
                context.commit('SET_MESSAGE', 'Created new repository <em>' + response.name + '</em>', {'root': true});
            }
            return response;
        })
        .catch(function(error) {
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },

    /**
     * Edit repository metadata
     *
     * @param context
     * @param data An object with options + new repository metadata. Repository metadata should be put in an object for key "data". Options include:
     *          makeActive = Make newly created repository the user's active repository [Default is false]
     */
    editRepo: function(context, data) {
        if (!context.rootState.token) return false;
        var setAsActive = data.makeActive ? true : false;
        return api.post('/repositories/' +  data['id'] + '/edit', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('EDIT_REPO', response);
                context.commit('SET_MESSAGE', 'Saved changes', {'root': true});
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
    deleteRepo: function(context, data, router) {
        if (!context.rootState.token) return false;
        var router = data['router'];
        return api.post('/repositories/delete', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('DELETE_REPO', response);
                context.commit('SET_MESSAGE', 'Deleted repository', {'root': true});

                let repo_count = context.state.user_repos.length;

                context.dispatch('people/getRepos', {}, { 'root': true }).then(function() {
                     if(repo_count == 0) {
                       context.commit('SET_ACTIVE_REPO', new_repo_id);
                     }
                });

                if (router) { router.push("/"); }
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
    getRepoUsers: function(context, data) {
        if (!context.rootState.token) return false;
        return api.post('/repositories/users', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('GET_REPO_USERS', response);
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
    addPersonToRepo: function(context, data) {
        if (!context.rootState.token) return false;
        return api.post('/repositories/add_collaborator', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('ADD_PERSON_REPO', response);
                context.commit('SET_MESSAGE', 'Added collaborator', {'root': true});
                return response;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, { root: true });
                return extractAPIError(error);
            });
    },

    /**
    *
    */
    removePersonFromRepo: function(context, data) {
        if (!context.rootState.token) return false;
        return api.post('/repositories/remove_collaborator', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) {
                context.commit('REMOVE_PERSON_REPO', response);
                context.commit('SET_MESSAGE', 'Removed collaborator', {'root': true});
                return response;
            }).catch(function(error) {
                context.commit('API_FAILURE', error, { root: true });
                return extractAPIError(error);
            });
    },

    /**
     * Get Data for Repo loaded through the portal
     * Should double-check that we're only loading a published repo
     * @param uuid uuid string for repository
     * @return Object with repository metadata and sample of data from repo
     */
     getRepoForPortal: function(context, uuid) {
         return api.get('repositories/portalGetRepo/' + uuid, {headers: apiHeaders({"auth": false, "form": true})})
             .then(function(response) {
                 return response;
             }).catch(function(error) {
                 return extractAPIError(error);
             })
     }
}

// mutations
const mutations = {
    ADD_REPO: function(state, response) { state.message = response.msg },
    EDIT_REPO: function(state, response) {
            state.message = response.msg;

            var repo_id = parseInt(response.repo_id);
            $.each(state.user_repos, function(k, v) {   // find current repo in repo list
                if (parseInt(v.id) === repo_id) {
                    $.each(response, function(f,fv) {   // copy user-edited fields into copy in list
                        if(!(f in state.user_repos[k])) { return; }
                        state.user_repos[k][f] = fv
                    });
                }
            });

            // Upload local storage copy of user repo list
            window.localStorage.setItem('repos', JSON.stringify(state.user_repos));
    },
    ADD_PERSON_REPO: function(state, response) { state.message = response.msg },
    REMOVE_PERSON_REPO: function(state, response) { state.message = response.msg },
    DELETE_REPO: function(state, response) {
        state.message = response.msg
        var deleted_repo_id = response.repo_id;

        // remove deleted repo from repolist
        for(var i in state.user_repos) {
            if (state.user_repos[i].id && (parseInt(state.user_repos[i].id) == parseInt(deleted_repo_id))) {
                state.user_repos.splice(i, 1);
            }
        }
        if (state.user_repos.length > 0) {
            var active_repo_id = state.user_repos[0]['id'];
            window.sessionStorage.setItem('repo_id', active_repo_id);
            state.active_repo_id = active_repo_id;
        }
    },
    GET_REPO_USERS: function(state, response) {
        var active_repo_id = parseInt(state.active_repo_id);
        var activeRepo = $.grep(state.user_repos, function(repo) { return parseInt(repo.id) === active_repo_id; });

        if (activeRepo && activeRepo.length > 0) {
            activeRepo[0].users = response;
        }
        state.message = response.msg;
    },
    SET_REPOS: function(state, response) {
        state.user_repos = response.repos;
        window.localStorage.setItem('repos', JSON.stringify(response.repos));
        state.active_repo_id = window.sessionStorage.getItem('repo_id');
        if (!state.active_repo_id) {
            state.active_repo_id = state.user_repos[0]['id'];
        }
    },
    SET_ACTIVE_REPO: function(state, active_repo_id) {
        window.sessionStorage.setItem('repo_id', active_repo_id);
        state.active_repo_id = active_repo_id;
    }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
