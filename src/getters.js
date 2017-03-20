export const isLoggedIn = state => { return state.logged_in }
export const repos = state => { return state.user.repos }
export const defaultRepo = state => { 
  var repo = {};
  if(state.user.prefs !== undefined) {

      console.log('in getters.js .. we have a users prefs obj');

      repo = state.user.prefs.defaultRepo;
  }

  console.log('getters js returning default repo');
  console.log( repo );

  return repo;
}

export const getActiveRepo = state => { 
	//console.log("active repo=", window.sessionStorage.getItem('repo_id'));
	return window.sessionStorage.getItem('repo_id');
}

export const getRepoList = state => {
	return state.user.repos;
}

export const getToken = state => {
    var jwt = window.sessionStorage.getItem('jwt');
    state.token = jwt;
    
    if (state.token) { state.logged_in = true; }

    return state.token
}
export const getRWT = state => { 
	return window.sessionStorage.getItem('rwt');
}
