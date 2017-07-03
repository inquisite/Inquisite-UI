import api from './api.js'
import store from './store.js'
import { apiHeaders } from '../lib/utils.js'

// getters
export const getters = {
    /**
     * Is user logged in?
     */
    getMessage: state => { return state.msg },

    /**
     * Is user logged in?
     */
    isLoggedIn: state => { return state.logged_in },

    /**
     * Get current API token
     */
    getToken: state => {
        var jwt = window.sessionStorage.getItem('jwt');
        state.token = jwt;
    
        if (state.token) { state.logged_in = true; }

        return state.token
    },

    /**
     * Get refresh token for current session
     */
    getRWT: state => { 
        return window.sessionStorage.getItem('rwt');
    }
}

// actions
export const actions = {
    addPerson: function(context, data) {
        return api.post('/people/add', data.data, {headers: apiHeaders({"auth": true, "form": true})})
        .then(function(response) { context.commit('ADD_PERSON', response); })
        .catch(function(error) { context.commit('API_FAILURE', error, { root: true }) });
    },
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
              window.sessionStorage.setItem('jwt', response.access_token); 
              window.sessionStorage.setItem('rwt', response.refresh_token);
          
              context.commit('login');
              context.commit('setToken', response.access_token);
              context.commit('setRefresh', response.refresh_token);
          
              // Get User Data -- now sets repos with users and data
              context.dispatch('people/getUserInfo', {token: response.access_token});
            } else {
              context.commit('API_FAILURE', response.response.data.msg );
            }
        })
        .catch(function(error) { 
          context.commit('API_FAILURE', error)
        });
    },

    /**
     * Refresh expired JWT token
     */
    doRefresh: function(context, data) {
        if (!data.refresh) { return false; }
        return api.post('/refresh', null, {headers: apiHeaders({"refresh": data.refresh})})
            .then(function(response) {
                if (! response.access_token) { return false; }
                console.log('doRefresh GOT TOKEN ', response.access_token, data); 
                context.commit('setToken', response.access_token);
                if(data && data['callback'] && data['callback']['instance'][data['callback']['method']]) {
                    // set new token
                    data['callback']['config']['headers']['Authorization'] = 'Bearer ' + response.access_token;
                    return api[data['callback']['method']](data['callback']['url'], data['callback']['data'], data['callback']['config']);
                }
                return null;
            })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     * Perform user logout
     */
    doLogout: function(context, data) {
      if (!context.state.token) return false;
      return api.get('/logout', {headers: apiHeaders({"auth": true})})
        .then(function(response) { 
            window.sessionStorage.removeItem('jwt');
            window.sessionStorage.removeItem('rwt');
            context.commit('logout')
        })
        .catch(function(error) { context.commit('API_FAILURE', error) });
    }
}

// mutations
export const mutations = {
    /**
     * Record login
     */
    login:  state => { 
      state.logged_in = true ;
      state.msg = "Success!";
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
        window.sessionStorage.setItem('jwt', access_token); 
        state.token = access_token;
    },

    /**
     * Set current JWT refresh token
     */
    setRefresh: function(state, refresh_token) { state.refresh = refresh_token },

    /**
     *
     */
    API_FAILURE: function(state, error) { state.msg = error }
}


export default {
  getters,
  actions,
  mutations
}