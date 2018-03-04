import api from './api.js'
import store from './store.js'
import { apiHeaders, extractAPIError } from '../lib/utils.js'

// getters
export const getters = {
    /**
     * Get current flash message package
     */
    getMessage: state => { return {'show': state.showMessage, 'text': state.message } },

    /**
     * Is user logged in?
     */
    isLoggedIn: state => { return state.logged_in },

    /**
     * Get current API token
     */
    getToken: state => {
        var jwt = window.localStorage.getItem('jwt');
        state.token = jwt;
    
        if (state.token) { state.logged_in = true; }

        return state.token
    },

    getTokenExpiration: state => {
        var jwt_expiration = window.localStorage.getItem('jwt_expiration');
        state.token_expiration = jwt_expiration;

        return state.token_expiration
    },

    /**
     * Get refresh token for current session
     */
    getRWT: state => { 
        return window.localStorage.getItem('rwt');
    }
}

// actions
export const actions = {
    /**
     * Set current JWT token
     */
    setToken: function(context, access_token) { context.commit('setToken', access_token) },

    /**
     * Perform user login
     */
    doLogin: function(context, data) {
      return api.post('/login', data.data, {headers: apiHeaders({})})
        .then(function(response) { 
            if(response.access_token !== undefined) {
              window.localStorage.setItem('jwt', response.access_token); 
              window.localStorage.setItem('rwt', response.refresh_token);
          
              context.commit('login');
              context.commit('setToken', response.access_token);
              context.commit('setRefresh', response.refresh_token);
              window.localStorage.removeItem('repos');
              window.sessionStorage.removeItem('repo_id');
          
              // Get User Data -- now sets repos with users and data
              context.dispatch('people/getUserInfo', {token: response.access_token});
              context.dispatch('people/getRepos', {token: response.access_token});
              context.commit('SET_MESSAGE', "You are now logged in", {'root': true});
              return response;
            } else {

              context.commit('API_FAILURE', "Login failed" );
              return extractAPIError(response);
            }
        })
        .catch(function(error) { 
          context.commit('API_FAILURE', error);
          return extractAPIError(error);
        });
    },

    /** 
     * 
     */
    setAccessToken: function(context, access_token) {
        context.commit('setToken', access_token);
    },

    /**
     * Perform user logout
     */
    doLogout: function(context, data) {
      if (!context.state.token) return false;
      return api.get('/logout', {headers: apiHeaders({"auth": true})})
        .then(function(response) { 
            window.localStorage.removeItem('jwt');
            window.localStorage.removeItem('jwt_expiration');
            window.localStorage.removeItem('rwt');
            window.localStorage.removeItem('repos');
            window.sessionStorage.removeItem('repo_id');
            context.commit('logout');
            context.commit('SET_MESSAGE', "Logged out", {'root': true});
            return true;
        })
        .catch(function(error) { 
            context.commit('API_FAILURE', error);
            return extractAPIError(error);
        });
    },

    /**
     * Initiate password reset
     */
    sendPasswordReset: function(context, email) {
        return api.post('/people/' + email + '/reset_password', {"x":"x"}, {headers: apiHeaders({"auth": true})})
            .then(function(response) { 
                //context.commit('SET_MESSAGE', "Sent password reset", {'root': true});
                return true;
            })
            .catch(function(error) { 
                context.commit('API_FAILURE', error);
                return extractAPIError(error);
            });
    },

    /** 
     * User registration
     */
    register: function(context, data) {
        return api.post('/register', data.data, {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { 
            if ((response._status >= 200) && (response._status <= 299)) {
                context.commit('REGISTER_USER', response); 
            }
            return response;
        }).then(function(response){
            if ((response._status >= 200) && (response._status <= 299)) {
                return context.dispatch("doLogin", {data: {"username": data.data.email, "password": data.data.password}}, { 'root': true });
            } else {
                context.commit('SET_MESSAGE', response.msg, {'root': true});
                return response;
            }
        }).then(function(response) { 
            if ((response._status >= 200) && (response._status <= 299)) {
                return context.dispatch("repos/addRepo", {
                    makeActive: true, 
                    message: false,
                    data: {
                        "name": "My first repository", 
                        "url": data.data.url, 
                        "readme": "This is your first repository in Inquisite. Add your data here, or create additional repositories for different projects."}
                    }, { 'root': true }
                );
            }  else {
                context.commit('SET_MESSAGE', response.msg, {'root': true});
                return false;
            }
        }).then(function(response) {
            if (response && (response._status >= 300)) {
                context.commit('SET_MESSAGE', response.msg, {'root': true});
                return false;
            } else {
                return response;
            }
        }).catch(function(error) { 
            context.commit('API_FAILURE', error, { root: true });
            return extractAPIError(error);
        });
    },
    
    /**
     * Set flash message
     */
    setMessage: function(context, message) {
        context.commit('SET_MESSAGE', message, {'root': true});
        return true; 
    },
    
    /**
     * Clear flash message
     */
    resetMessage: function(context, data) {
        context.state.showMessage = false; 
        context.state.message = ''; 
        return true; 
    }
}

// mutations
export const mutations = {
    /**
     * Record login
     */
    login:  state => { 
      state.logged_in = true ;
    },

    /**
     * Record logout
     */
    logout: state => {
      state.logged_in = false;
      state.token = '';
    },

    /**
     * Set current JWT auth token
     */
    setToken: function(state, access_token) { 
        window.localStorage.setItem('jwt', access_token); 
        window.localStorage.setItem('jwt_expiration', new Date().getTime() + (10 * 60 * 1000)); // assume 10 minute token lifetime
        state.token = access_token;
    },

    /**
     * Set current JWT refresh token
     */
    setRefresh: function(state, refresh_token) { state.refresh = refresh_token },
    
    /**
     * 
     */
    SET_MESSAGE: function(state, message) { 
        state.message = message;
        state.showMessage = true;
        var rootState = state;
        console.log('SET MESSAGE', message);
        setTimeout(function() {
            state.showMessage = false;
        }, 4000);
    },

    /**
     *
     */
    API_FAILURE: function(state, error) { 
        var message = error.response && error.response.data && error.response.data.msg ? error.response.data.msg : error.toString();
        state.message = message;
        state.showMessage = true;
        var rootState = state;

        console.log('SET MESSAGE', message);
        setTimeout(function() {
            state.showMessage = false;
        }, 8000);
    },

    REGISTER_USER: function(state, response) { state.message = response.msg },
}


export default {
  getters,
  actions,
  mutations
}