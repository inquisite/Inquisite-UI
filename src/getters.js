export const is_loggedin = state => { return state.logged_in }
export const repositories = state => { return state.user.repositories }
export const default_repo = state => { 

  var repo = {}
  if(state.user.prefs !== undefined) {

      console.log('in getters.js .. we have a users prefs obj');

      repo = state.user.prefs.default_repo;
  }

  console.log('getters js returning default repo');
  console.log( repo );

  return repo 
}
export const get_token = state => {
    var jwt = window.sessionStorage.getItem('jwt')  
    state.token = jwt
    
    if (state.token) { state.logged_in = true }

    return state.token
}
export const get_rwt = state => { return window.sessionStorage.getItem('rwt') }
