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
       
         <div> User Details to come for {{sharedState.username}} 
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
          
            console.log('got user data back');
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
