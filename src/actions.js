import api from './store/api.js'

//export const login  = ({commit}) => { commit('login') }
//export const logout = ({commit}) => { commit('logout') }
export const setUsername = function(context, username) { context.commit('setUsername', username) }
export const setUserID   = function(context, user_id) { context.commit('setUserID', user_id) }
export const setToken    = function(context, access_token) { context.commit('setToken', access_token) }



// API Actions:

export const doLogin = function(context, data) {
  return api.post('/login', data)
    .then(function(response) { 
        window.sessionStorage.setItem('jwt', response.access_token); 
        context.commit('login')

        // TODO: Route to homepage
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const doLogout = function(context, token) {
  return api.get('/logout', token)
    .then(function(response) { 
        window.sessionsStorage.removeItem('jwt');
        context.commit('logout')
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// People
export const addPerson = function(context, data) {
  return api.post('/people/add', data)
    .then(function(response) {
      context.commit('ADD_PERSON', response); 
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getUserInfo = function(context, token) {
  return api.get('/people/info', token)
    .then(function(response) { context.commit('GET_USER_INFO', response) })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getRepositories = function(context, token) {
  return api.get('/people/repos', token)
    .then(function(response) { context.commit('GET_REPOS', response) })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// Repo Data
export const uploadRepoData = function(context, datafile) {
  return api.post('/repositories/ repo_id /upload_data', data)
    .then(function(response) {
      context.commit('UPLOAD_REPO_DATA', response)
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}
