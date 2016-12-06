export const login  = ({commit}) => { commit('login') }
export const logout = ({commit}) => { commit('logout') }
export const setUsername = function(context, username) { context.commit('setUsername', username) }
export const setUserID   = function(context, user_id) { context.commit('setUserID', user_id) }
export const setToken    = function(context, access_token) { context.commit('setToken', access_token) }
