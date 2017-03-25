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
          
          // Get User Data
          context.dispatch('getUserInfo', {token: response.access_token});

          // Get Repos for User
          context.dispatch('getRepos', {token: response.access_token});

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
	if (!data.refresh) { return false; }
    return api.post('/refresh', null, {headers: {'Authorization': 'Bearer ' + data.refresh}})
		.then(function(response) {
			if (! response.access_token) { return false; }
			console.log('doRefresh GOT TOKEN ', response.access_token); 
			context.commit('setToken', response.access_token);
			if(data && data['callback'] && data['callback']['instance'][data['callback']['method']]) {
				consol.log("call ", data['callback']['method']);
				data['callback']['instance'][data['callback']['method']](data['callback']['url'], data['callback']['config']);
			}
		})
    	.catch(function(error) { context.commit('API_FAILURE', error) });
}

export const doLogout = function(context, data) {
  if (!context.state.token) return false;
  return api.get('/logout', {headers: {'Authorization': 'Bearer ' + context.state.token}})
    .then(function(response) { 
        window.sessionStorage.removeItem('jwt');
        window.sessionStorage.removeItem('rwt');
        context.commit('logout')
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// People
export const addPerson = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/people/add', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('ADD_PERSON', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const editPerson = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/people/edit', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('EDIT_PERSON', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getUserInfo = function(context, data) {
  if (!context.state.token) return false;
  return api.get('/people/info', {headers: {'Authorization': 'Bearer ' + context.state.token}})
    .then(function(response) { context.commit('GET_USER_INFO', response) })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const setPerson = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/people/info', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type':'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('SET_PERSON', response.person) })
    .catch(function(error) { context.commit('API_FAILURE', error)  });
}


export const getRepos = function(context, data) {
  if (!context.state.token) return false;
  return api.get('/people/repos', {headers: {'Authorization': 'Bearer ' + context.state.token}})
    .then(function(response) { 
      context.commit('GET_REPOS', response);
      context.commit('setActiveRepo', context.getters.getActiveRepo);
      return response;
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

// Repos
export const addRepo = function(context, data) {
  if (!context.state.token) return false;
console.log("addrepo", data);
  var setAsActive = data.makeActive ? true : false;
  return api.post('/repositories/add', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { 
        context.commit('ADD_REPO', response); 

        var new_repo_id = response.repo.repo_id

        context.dispatch('getRepos', {}).then(function() { 
           if((context.getters.repos.length == 0) || setAsActive) {
          console.log('set Active Repo from response here');
          console.log('Active Repo: ', new_repo_id);
          context.commit('setActiveRepo', new_repo_id);
        }     
          });
       

    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const deleteRepo = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/repositories/delete', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function(response) {
      context.commit('DELETE_REPO', response);
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getRepoUsers = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/repositories/users', data.data, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function(response) { context.commit('GET_REPO_USERS', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getPeople = function(context, data) {
  if (!context.state.token) return false;
  return api.get('/people', {headers: {'Authorization': 'Bearer ' + context.state.token}})
    .then(function(response) { context.commit('GET_PEOPLE', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const addPersonRepo = function(context, data) {
  if (!context.state.token) return false;
  return api.post('/repositories/add_collaborator', data.data,
    {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('ADD_PERSON_REPO', response); })
    .catch(function(error) { context.commit('API_FAILURE', error) });
} 


// Repo Data
export const uploadRepoData = function(context, data) {
  if (!context.state.token) return false;
  var fd = new FormData();
  fd.append('repo_file', data.form.repo_file);  
  fd.append('repo_id', data.form.repo_id);

  return api.put('/repositories/upload', fd, {headers: {'Authorization': 'Bearer ' + context.state.token, 'Content-Type': 'multipart/form-data'}})
    .then(function(response) {
      context.commit('UPLOAD_REPO_DATA', response)
    })
    .catch(function(error) { context.commit('API_FAILURE', error) });
}

export const getDataNodes = function(context, data) {
  if(!data.token) return false;
  
  return api.post('repositories/data', data.data, {headers: {'Authorization': 'Bearer ' + data.token, 'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(function(response) { context.commit('REPO_DATA', response) })
    .catch(function(error) { context.commit('API_FAILURE', error) })
}

