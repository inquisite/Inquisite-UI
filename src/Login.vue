<template>
<div id="login">
  <div class="ui grid">
    <div class="sixteen wide column">
      <h1>Inquisite Login</h1>
    </div>
  </div>

  <div class="ui section divider"></div>

  <div class="ui grid">
    <div class="eight wide column">
      <div class="ui raised segment">
        <div class="ui large list">
       
          <form id="login-form" name="login-form" method="POST" action="">

            <div id="login-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="password" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processLogin" v-on:click.prevent="processLogin" class="ui primary button">Login</button>
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
      api_endpoint: ''
    }
  },
  created: function() {
    console.log('Login ready event fired');
    this.$http.get('/inqusite-local-config.json').then(function(response) {
      console.log('getting config data {data}')
      this.api_endpoint = response.data.api_endpoint;
    }, function(response) {
      console.log('there was an error');
    });
  },
  methods: {
    processLogin: function() {

      var mydata = this;

      jQuery.ajax({
        type: "POST",
        url: mydata.api_endpoint + "/login",
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
            jQuery('#login-msg .header').html('Success!');
            jQuery('#login-msg .msg').html(data.msg);

            var self = this;
            setTimeout( function() { self.$root.$options.router.push('/') }, 6000);

          } else {

            jQuery('#login-msg').addClass('error');
            jQuery('#login-msg .header').html('There was a problem');
            jQuery('#login-msg .msg').html(data.msg);
          }

          jQuery('#login-msg').show();

          
        }.bind(this)
      })
    }
  }
} 
</script>

<style>
.form-item { padding: 5px 0; }
</style>
