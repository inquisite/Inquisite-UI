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
}

export const setToken = function(state, access_token) { state.token = access_token }
export const setRefresh = function(state, refresh_token) { state.refresh = refresh_token }

// Active Repo
export const setActiveRepo = function(state, new_repo) { state.active_repo = new_repo }


// API Mutations
export const API_FAILURE = function(state, error) { state.msg = error }
export const GET_REPOS = function(state, response) { state.repositories = response.repos; state.msg = response.msg }
export const GET_USER_INFO = function(state, response) { state.user = response.person; } 
export const ADD_PERSON = function(state, response) { state.msg = response.msg }
export const ADD_REPO = function(state, response) { state.msg = response.msg }
export const UPLOAD_REPO_DATA = function(state, response) { state.msg = response.msg; state.teaser = response.data }
