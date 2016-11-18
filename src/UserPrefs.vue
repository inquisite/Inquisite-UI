<template>
<div id="user-profile">
  <div class="ui grid">
    <div class="sixteen wide column">
      <h1>User Profile</h1>
    </div>
  </div>

  <div class="ui section divider"></div>

  <div class="ui grid">
    <div class="eight wide column">
      <div class="ui raised segment">
        <div class="ui large list">

         <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui msessage" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Name:</div>
                <input type="text" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Email:</div>
                <input type="text" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Location:</div>
                <input type="text" id="location" name="location" placeholder="Location" v-model="location">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Tagline</div>
                <input type="text" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">URL:</div>
                <input type="text" id="url" name="url" placeholder="URL" v-model="url">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Password:</div>
                <input type="password" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="ui primary button">Submit</button>
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
  name: 'user-profile',
  data: function() {
    return {
      sharedState: store.state,
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: ''
    }
  },
  created: function() {
      console.log(' created lifecycle hook ... ');
      this.getUser()   
  },
  watch: {
    '$route': 'getUser'
  },
  methods: {
    getUser: function() {
    
      var self = this;

      jQuery.ajax({
        type: "POST",
        url: "http://localhost:5000/people/" + store.state.user_id,
        crossDomain: true,
        data: {},
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {
          
            self.name = data.name;
            self.email = data.email;
            self.location = data.location;
            self.tagline = data.tagline;
            self.url = data.url;

          }
        }
      })
     }
  },


}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
