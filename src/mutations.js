export const login =  state => state.logged_in = true
export const logout = state => {
  state.logged_in = false
  state.token = ''
  state.user_id = ''
  state.username = ''
}
export const setUsername = function(state, username) { state.username = username }
export const setUserID = function(state, user_id) { state.user_id = user_id }
export const setToken = function(state, access_token) { state.token = access_token }
