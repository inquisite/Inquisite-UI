<template>
<div id="addPersonRepo">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Add People to {{activeRepo.name}}</h1>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-block">

          <div class="alert alert-info">
            <p>Optional notes about adding people to your repository?</p>
          </div>

          <!-- List of Users -->
          <ul class="media-list">
            <li class="media" v-for="user in users">
              <div class="media-left">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>

              <div class="media-body">
                <h5 class="media-heading">{{user.name}}</h5>
                <small>{{user.location}}</small>
              </div>

              <div class="media-right">
                <a @click="addToRepo(user.id)">
                  <button type="button" class="btn btn-secondary text-right">Add User</button>
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
        state: store.state
    }
  },
  computed: {
    isLoggedIn: function() {
	    return store.getters.isLoggedIn;
	},
	repos: function() { return store.state.user.repos; },
	users: function() { return store.state.users; },
	activeRepo: function() { return store.state.active_repo; },
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return store.state.repositories;
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