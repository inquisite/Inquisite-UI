<template>
<div id="login">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Login to Inquisite</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">
       
          <div id="login-msg" class="alert alert-warning" role="alert" v-show="sharedState.msg !== ''">{{sharedState.msg}}</div>

          <form id="login-form" name="login-form" method="POST" action="">

            <div id="login-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                  <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processLogin" v-on:click.prevent="processLogin" class="btn btn-primary">Login</button>
              Don't have a login? <router-link class="item" to="/signup">Sign up</router-link>
            </div>

          </form>

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
import store from './store.js'

export default { 
  name: 'login',
  data: function() {
    return {
      email: '',
      password: '',
      sharedState: store.state,
    }
  },
  methods: {
    processLogin: function() {

      if( this.email !== '' && this.password !== '') {

          var self = this;
          store.dispatch('doLogin', {data: {username: this.email, password: this.password}})
          .then(function() {
              // Transition to Home Page if logged in
              if(self.sharedState.logged_in) {
                  setTimeout( function() { self.$router.push('/') }, 1500) 
              }
          });
        
      } else {
          this.sharedState.msg = 'Email and Password are required fields';
      }

    }
  }
} 
</script>

<style>
.form-item { padding: 5px 0; }
</style>
