import api from './store/api.js'

export const setToken = function(context, access_token) { context.commit('setToken', access_token) }

// API Actions:
export const doLogin = function(context, data) {
  return api.post('/login', data.data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { 

        if(response.access_token !== undefined) {
          window.sessionStorage.setItem('jwt', response.access_token); 
          window.sessionStorage.setItem('rwt', response.refresh_token);
          
          context.commit('login');
          context.commit('setToken', response.access_token);
          context.commit('setRefresh', response.refresh_token);

          // Get Repos for User
          context.dispatch('getRepositories', {token: response.access_token});

          // Get User Data
          context.dispatch('getUserInfo', {token: response.access_token});

        } else {
          // Error is in here
          context.commit('API_FAILURE', response.response.data.msg );
        }
    })
    .catch(function(error) { 
      context.commit('API_FAILURE', error)
    });
}

export const doRefresh = function(context, data) {
  return api.post('/refresh', data.refresh, {headers: {'Authorization': 'Bearer' + data.refresh}})
    .then(function(response) {
      console.log('doRefresh response'); 
      console.log(response);
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const doLogout = function(context, data) {
  return api.get('/logout', {headers: {'Authorization': 'Bearer ' + data.token}})
    .then(function(response) { 
        window.sessionStorage.removeItem('jwt');
        window.sessionStorage.removeItem('rwt');
        context.commit('logout')
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// People
export const addPerson = function(context, data) {
  return api.post('/people/add', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('ADD_PERSON', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const editPerson = function(context, data) {
  return api.post('/people/edit', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('EDIT_PERSON', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getUserInfo = function(context, data) {
  return api.get('/people/info', {headers: {'Authorization': 'Bearer ' + data.token}})
    .then(function(response) { context.commit('GET_USER_INFO', response) })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getRepositories = function(context, data) {
  return api.get('/people/repos', {headers: {'Authorization': 'Bearer ' + data.token}})
    .then(function(response) { 
      context.commit('GET_REPOS', response) 
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// Repos
export const addRepo = function(context, data) {
  return api.post('/repositories/add', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { 
        context.commit('ADD_REPO', response); 

        console.log('context');
        console.log( context );

        if(context.getters.repositories.length == 0) {
          console.log('set Active Repo from response here');
          console.log('Active Repo: ');
          console.log(response.repo);
          context.commit('setActiveRepo', response.repo);
        }

    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const deleteRepo = function(context, data) {
  return api.post('/repositories/delete', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function(response) {
      context.commit('DELETE_REPO', response);
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getRepoUsers = function(context, data) {
  return api.post('repositories/users', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function(response) { context.commit('GET_REPO_USERS', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// Repo Data
export const uploadRepoData = function(context, data) {

  var fd = new FormData();
  fd.append('repo_file', data.form.repo_file);  
  fd.append('repo_id', data.form.repo_id);

  return api.put('repositories/upload', fd, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'multipart/form-data'}})
    .then(function(response) {
      context.commit('UPLOAD_REPO_DATA', response)
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}
