export const is_loggedin = state => { return state.logged_in }
export const repositories = state => { return state.repositories }
export const get_token = state => {
    var jwt = window.sessionStorage.getItem('jwt')  
    state.token = jwt
    
    if (state.token) { state.logged_in = true }

    console.log("state token: " + state.token)
    return state.token
}
