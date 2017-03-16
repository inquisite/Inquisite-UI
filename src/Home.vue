<template>
<div id="home">
  <div class="row" v-if="!isLoggedIn">
		 <h1>Welcome to Inquisite</h1>
  </div>
  <div class="row" v-if="isLoggedIn">
    <div class="col-sm-12">

      <div class="pull-right">
        <a @click="deleteRepo(sharedState.active_repo.id)">
          <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete Repository</button>
        </a>
      </div>


      <div class="page-header">
        <h1>Dashboard - {{sharedState.active_repo.name}}</h1>
      </div>

    </div>
  </div>

  <div class="row" v-if="isLoggedIn">
    <div class="col-sm-6">

      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Data Sets</h3>
        </div>
        <div class="panel-body">

          <ul class="media-list">
            <li class="media list-item">
              <div class="media-left">
                <span class="glyphicon glyphicon-folder-close"></span>
              </div>
              <div class="media-body">
                <h5 class="media-heading">New York Merchants 1800-1801</h5>
                <div class="description">
                  <small>by Tom A. 5,674 records, 30 elements</small>
                </div>
              </div>                  
            </li>

            <li class="media list-item">
              <div class="media-left">
                <span class="glyphicon glyphicon-folder-close"></span>
              </div>

              <div class="media-body">
                <h5  class="media-heading">Carnegie Hospital Records 1830s</h5>
                <div class="description">
                  <small>by Nick W. 10,213 records, 9 elements</small>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>

    </div>

    <div class="col-sm-6">
      <h3>Project Introduction and Goals</h3>
      <div v-html="compiledMarkdown"></div>
    </div>

  </div>

  <hr/>   

  <div class="row" v-if="isLoggedIn">
    <div class="col-sm-6">
      <h4>Users in this Repository</h4>

      <ul class="media-list">
        <li class="media list-item" v-for="user in repoUsers">
          <div class="media-left">
            <span class="glyphicon glyphicon-user"></span>
          </div>
  
          <div class="media-body">
            <h5 class="media-heading">{{user.name}}</h5>
            <small>{{user.status}}</small>
          </div>

          <div class="media-right">
            <a @click="userProfil(user.id)">
              <button type="button" class="btn btn-default text-right">Profile</button>
            </a>
          </div>
        </li>
      </ul>

      <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add People</button>

    </div>

    <div class="col-sm-6">
      <h4>Recent Activity</h4>

      <ul class="media-list">
         
        <li class="media list-item">
          <div class="media-left">
            <a href="#">
              <span class="glyphicon glyphicon-user"></span>
            </a>
          </div>

          <div class="media-body">
            <h5 class="media-heading">B. Shellnut</h5>
            <small>joined the Repository <a href="#">New York Scapes</a> 32m</small>
          </div>
        </li>

        <li class="media list-item">
          <div class="media-left">
            <a href="#">
              <span class="glyphicon glyphicon-git-branch"></span>
            </a>
          </div>

          <div class="media-body">
            <h5 class="media-heading">Nick W.</h5>
            <small>created a fork <a href="#">New York Scapes</a> 2 days</small>
          </div>
        </li>

      </ul>

    </div>

  </div>

</div>

</template>

<script>
	import store from './store.js'
    var marked = require('marked'); 

	export default { 
		name: 'home',
        data: function() {
          return {
            sharedState: store.state
          }
        },
		computed: {
			isLoggedIn() {
				return store.getters.is_loggedin;
			},
            compiledMarkdown: function() {
                if(store.state.active_repo.readme) {
                  return marked(store.state.active_repo.readme, { sanitize: true})
                } else {
                  return ''
                }
            },
            repoUsers: function() {
                store.dispatch('getRepoUsers', {token: store.state.token, data: {repo_id: store.state.active_repo.id}})
                return store.state.active_repo.users;
            }
		},
        methods: {
          userProfile: function(user_id) {
            console.log(' go to user profile ')
          },
          deleteRepo: function(repo_id) {
            store.dispatch('deleteRepo', {token: store.state.token, data: { repo_id: repo_id }})
          }
        }
	}
	
</script>

<style>
</style>
