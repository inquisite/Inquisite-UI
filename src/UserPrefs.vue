<template>
<div id="user-preferences">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>User Preferences</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">

         <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui msessage" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Name:</div>
                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="sharedState.user.name">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Email:</div>
                <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="sharedState.user.email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Location:</div>
                <input type="text" class="form-control" id="location" name="location" placeholder="Location" v-model="sharedState.user.location">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Tagline</div>
                <input type="text" class="form-control" id="tagline" name="tagline" placeholder="Tagline" v-model="sharedState.user.tagline">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">URL:</div>
                <input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="sharedState.user.url">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid labeled input content">
                <div class="ui label">Password:</div>
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="btn btn-primary">Submit</button>
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
  name: 'user-prefs',
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
    methods: {
    getUser: function() {
    
      // TODO: .. not sure this is still needed?


      //var mydata = this;

      /*jQuery.ajax({
        type: "POST",
        url: config.api_endpoint + '/people/' + mydata.state.user_id,
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
      })*/
     }
  },


}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
