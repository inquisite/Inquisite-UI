/**
 * Is user logged in?
 */
export const isLoggedIn = state => { return state.logged_in }

/**
 * Get list of repositories for user
 */
export const repos = state => { return state.user.repos }

/**
 * Get list of repositories for user (redundant with repos())
 *
 * TODO: remove
 */
export const getRepoList = state => {
	return state.user.repos;
}

/**
 * Return repo_id for user's default repository
 */
export const defaultRepo = state => { 
  var repo = {};
  if(state.user.prefs !== undefined) {
      repo = state.user.prefs.defaultRepo;
  }

  return repo;
}

/**
 * Return repo_id for currently selected repository
 */
export const getActiveRepo = state => { 
	return window.sessionStorage.getItem('repo_id');
}

/**
 * Get current API token
 */
export const getToken = state => {
    var jwt = window.sessionStorage.getItem('jwt');
    state.token = jwt;
    
    if (state.token) { state.logged_in = true; }

    return state.token
}

/**
 * Get refresh token for current session
 */
export const getRWT = state => { 
	return window.sessionStorage.getItem('rwt');
}
