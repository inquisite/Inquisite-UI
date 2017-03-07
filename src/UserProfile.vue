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
       
          <div> User Details to come for {{sharedState.user.email}} 
            <div>Name: {{sharedState.user.name}}</div>
            <div>Email: {{sharedState.user.email}}</div>
            <div>Location: {{sharedState.user.location}}</div>
            <div>Tagline: {{sharedState.user.tagline}}</div>
            <div>URL: {{sharedState.user.url}}</div>
          </div> 

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
  name: 'user-profile',
  data: function() {
    return {
      sharedState: store.state,
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
    }
  },
  watch: {
    '$route': 'getUser'
  },
  created: function() {
    this.getUser();
  },
  methods: {
    getUser: function() {
      store.dispatch('getUserInfo', {token: store.state.token});
    }
  },
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
