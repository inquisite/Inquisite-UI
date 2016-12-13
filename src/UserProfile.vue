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
        this.api_endpoint = response.data.api_endpint;
        this.getUser(),
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
