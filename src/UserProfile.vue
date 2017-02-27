<template>
<div id="user-profile">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>User Profile</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">
       
          <div> User Details to come for {{email}} 
            <div>Name: {{name}}</div>
            <div>Email: {{email}}</div>
            <div>Location: {{location}}</div>
            <div>Tagline: {{tagline}}</div>
            <div>URL: {{url}}</div>
          </div> 

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
      url: '',
      api_endpoint: ''
    }
  },
  created: function() {

      this.$http.get('/inqusite-local-config.json').then(function(response) {
        this.api_endpoint = response.data.api_endpoint;
        this.getUser();
      }, function(response) {
        console.log('there was an error');
      });

  },
  watch: {
    '$route': 'getUser'
  },
  methods: {
    getUser: function() {
    
      var self = this;

      jQuery.ajax({
        type: "POST",
        url: self.api_endpoint + "/people/" + self.$route.params.id,
        crossDomain: true,
        headers: {"Authorization": "Bearer " + store.state.token },
        error: function(jqXHR, textStatus, errorThrown) {
          if("error" == textStatus) { self.$router.go('/login') }
        },
        success: function(data, textStatus, jqXHR) {

          console.log('checking response');
          console.log( data )

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
