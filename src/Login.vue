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
      sharedState: store.state
    }
  },
  methods: {
    processLogin: function() {

      jQuery.ajax({
        type: "POST",
        url: "http://localhost:5000/login",
        crossDomain: true,
        data: {
          email: this.email,
          password: this.password
        },
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {

            store.dispatch('login');
            store.dispatch('setUsername', data.email);
            store.dispatch('setUserID', data.user_id);

            jQuery('#login-msg').addClass('success');
            jQuery('#login-msg .header').html('Success!');
            jQuery('#login-msg .msg').html(data.msg);

          } else {

            jQuery('#login-msg').addClass('error');
            jQuery('#login-msg .header').html('There was a problem');
            jQuery('#login-msg .msg').html(data.msg);
          }

          jQuery('#login-msg').show();

          var self = this;
          setTimeout( function() { self.$root.$options.router.push('/') }, 6000);

        }.bind(this)
      })
    }
  }
} 
</script>

<style>
.form-item { padding: 5px 0; }
</style>
