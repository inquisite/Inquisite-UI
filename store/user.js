// userStore object
export default {
  state: {
    errorMessage: null,
    username: null,
    token: ''
  },
  getters: {
    getCurrentUser: function(state) {
      var jwt = ''
      if(! window.sessionStorage.getItem('jwt') )
        jwt = window.sessionStorage.getItem('jwt')  
         
        console.log('jwt: ' + jwt)
        state.token = jwt
    }
  }
}
