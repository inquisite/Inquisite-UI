export const login =  state => { 
  state.logged_in = true 
}
export const logout = state => {
  state.logged_in = false
  state.token = ''
  state.user_id = ''
  state.username = ''
  state.user = {}
}
export const setUsername = function(state, username) { state.username = username }
export const setUserID = function(state, user_id) { state.user_id = user_id }
export const setToken = function(state, access_token) { state.token = access_token }


// API Mutations
export const API_FAILURE = function(state, error) { state.msg = 'There was an error getting data' }
export const GET_REPOS = function(state, response) { state.repositories = response.repos; state.msg = 'Success!' }
export const GET_USER_INFO = function(state, response) { state.user = response.person; } 
