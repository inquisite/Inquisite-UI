<template>
<div id="addPersonRepo">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Add People to {{sharedState.active_repo.name}}</h1>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">

          <div class="alert alert-info">
            <p>Optional notes about adding people to your repository?</p>
          </div>

          <!-- List of Users -->
          <ul class="media-list">
            <li class="media" v-for="user in sharedState.users">
              <div class="media-left">
                <span class="glyphicon glyphicon-user"></span>
              </div>

              <div class="media-body">
                <h5 class="media-heading">{{user.name}}</h5>
                <small>{{user.location}}</small>
              </div>

              <div class="media-right">
                <a @click="addToRepo(user.id)">
                  <button type="button" class="btn btn-default text-right">Add User</button>
                </a>
              </div>
            </li>
          </ul>
          
        </div>  
      </div>
    </div>

  </div>
</div>

</template>

<script>

import store from './store.js'

export default { 
  name: 'home',
  data: function() {
    return {
      sharedState: store.state
    }
  },
  mounted: function() {
    console.log('mounted .. getting people');
    store.dispatch('getPeople', { token: store.state.token })
  }, 
  methods: {
    addToRepo: function(user_id) {
       store.dispatch('addPersonRepo', { token: store.state.token, data: { person_id: user_id, repo_id: store.state.active_repo.id }})
       .then(function() { store.dispatch('getRepoUsers', { token: store.state.token, data: { repo_id: store.state.active_repo.id }}) });
    }
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
