export const login =  state => { 
  state.logged_in = true 
  state.msg = "Success!"
}
export const logout = state => {
  state.logged_in = false
  state.token = ''
  state.user_id = ''
  state.username = ''
  state.user = {}
  state.active_repo = {}
}

export const setToken = function(state, access_token) { state.token = access_token }
export const setRefresh = function(state, refresh_token) { state.refresh = refresh_token }

// User Profile Person Object
export const setPerson = function(state, person) { state.person = person }

// User Prefs
export const setUserName = function(state, newName) { state.user.name = newName }
export const setUserEmail = function(state, newEmail) { state.user.email = newEmail }
export const setUserLocation = function(state, newLocation) { state.user.location = newLocation }
export const setUserTagline = function(state, newTagline) { state.user.tagline = newTagline }
export const setUserUrl = function(state, newUrl) { state.user.url = newUrl }
export const setDefaultRepo = function(state, default_repo) { 

    if(state.user.prefs == undefined) {
        state.user.prefs = {default_repo:default_repo };
    } else {
        state.user.prefs.default_repo = default_repo 
    }
}

// Active Repo
export const setActiveRepo = function(state, new_repo) { state.active_repo = new_repo }


// API Mutations
export const API_FAILURE = function(state, error) { state.msg = error }
export const GET_REPOS = function(state, response) { state.user.repositories = response.repos; state.msg = response.msg }
export const GET_REPO_USERS = function(state, response) { state.active_repo.users = response.users; state.msg = response.msg }
export const GET_USER_INFO = function(state, response) { 

  state.user = response.person; 

  if(!('prefs' in response.person)) {
    console.log('Adding prefs to user object');
    state.user.prefs = {default_repo: {}};
  }
  if(!('repositories' in response.person)) {
    state.user.repositories = {}
  }

} 

export const GET_PEOPLE = function(state, response) { state.users = response.people }

export const ADD_PERSON = function(state, response) { state.msg = response.msg }
export const EDIT_PERSON = function(state, response) { state.msg = response.msg /* Update store user obj? */ }

export const ADD_REPO = function(state, response) { state.msg = response.msg }
export const ADD_PERSON_REPO = function(state, response) { state.msg = response.msg }
export const DELETE_REPO = function(state, response) { state.msg = response.msg }
export const UPLOAD_REPO_DATA = function(state, response) { state.msg = response.msg; state.teaser = response.data }
