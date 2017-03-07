<template>
<div id="login">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Inquisite Login</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">
       
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
import config from './config.js'

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

      // Stores Token in sessionStorage on success
      store.dispatch('doLogin', {username: this.email, password: this.password})
     
      // TODO: Move messaging to template for reactive display


      /*jQuery.ajax({
        type: "POST",
        url: config.api_endpoint + "/login",
        crossDomain: true,
        data: {
          username: mydata.email,
          password: mydata.password
        },
        success: function(data, textStatus, jqXHR) {
          if(data.access_token) {

            store.dispatch('login');
            store.dispatch('setToken', data.access_token);
            store.dispatch('setUsername', data.email);
            store.dispatch('setUserID', data.user_id);

            // Store token
            window.sessionStorage.setItem('jwt', data.access_token)

            jQuery('#login-msg').addClass('success');
            jQuery('#login-msg .header').html('You are now logged in');
            jQuery('#login-msg .msg').html(data.msg);

            setTimeout( function() { mydata.$root.$options.router.push('/') }, 1500);

          } else {
            jQuery('#login-msg').addClass('error');
            jQuery('#login-msg .header').html('Login failed');
            jQuery('#login-msg .msg').html(data.msg);
          }

          jQuery('#login-msg').show();
        },
        statusCode: {
          400: function() {
            jQuery('#login-msg .header').html('Login failed');
            jQuery('#login-msg .msg').html("");
            jQuery('#login-msg').addClass('error').show();
		  }
		}
      });*/
    }
  }
} 
</script>

<style>
.form-item { padding: 5px 0; }
</style>
