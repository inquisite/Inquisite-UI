<template>
<div id="home">
  
  <div class="row">
    <div class="col-sm-12">
      <div class="pull-right" v-if="showRepoControls">
        <router-link :to="{path: '/edit-repo/' + sharedState.active_repo.id}">
            <button type="button" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i></span> Edit Repository</button>
        </router-link>
      </div>

      <div class="page-header" v-if="showRepoControls">
        <h1>{{sharedState.active_repo.name}}</h1>
          
        <div  v-if="showRepoControls">
          <div v-html="compiledMarkdown"></div>
        </div>
      </div>
      <div class="page-header" v-else>
        <h1>Data got you down? Try Inquisite.</h1>
        <p>
            <h3>What is it?</h3>
            Inquisite is a tool for collaboratively organizing, analyzing and assembling research data. 
            It is designed to streamline and encourage the formation of open research communities.
        </p>
        <p>
            <h3>How does it work?</h3>
            Inquisite users create repositories where research data can be shared and explored. 
            Inquisite processes and classifies data as it is imported, establishing links between common elements 
            in disparate sources. These links provide researchers the opportunity to contextualize and expand their 
            findings by leveraging the data of colleagues and peers into merged super-datasets.
        </p>
        <p>
            <h3><router-link class="item" to="/signup">Sign up</router-link> or <router-link class="item" to="/login">login</router-link> to get started!</h3>
        </p>
      </div>

    </div>
  </div>

  <div class="row" v-if="isLoggedIn">
    <div class="col-sm-6">
      <div class="card" v-if="showRepoControls">
        <div class="card-header">
          <h4 class="card-title">Repository Stats</h4>
        </div>
          <div v-if="sharedState.active_repo.data" class="card-block">
            <div class="row">
              <div class="col-4 text-center">
                <div class="h1">1</div>
                <h5 class="media-heading">Data Types</h5>
              </div>             

              <div class="col-4 text-center">
                <div class="h1">{{sharedState.active_repo.data.length}}</div>
                <h5 class="media-heading">Records</h5>
              </div>

              <div class="col-4 text-center">
                <div class="h1">{{elementCount}}</div>
                <h5 class="media-heading">Elements</h5>
              </div>
            </div>
          </div>
          <div v-else>
            <p>It looks like you haven't added any datasets to your repository yet?</p>


            <router-link to="/upload">
              <button type="button" class="btn btn-secondary"><i class="fa fa-plus-square" aria-hidden="true"></i> Add Dataset</button>
            </router-link>
          </div>

            
      </div>

    </div>
    <div class="col-sm-6" v-if="showRepoControls">
       <div class="col-sm-6">
          <h4>Users in this Repository</h4>

          <ul class="media-list">
            <li class="media list-item" v-for="user in repoUsers">
              <div class="media-left">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
  
              <div class="media-body">
                <h5 class="media-heading">{{user.name}}</h5>
                <small>{{user.role}}</small>
              </div>

              <div class="media-right">
                <a @click="userProfile(user.id)">
                  <button type="button" class="btn btn-secondary text-right">Profile</button>
                </a>
              </div>
            </li>
          </ul>

          <router-link to="/add-person-repo">
            <button type="button" class="btn btn-secondary"><i class="fa fa-square-plus" aria-hidden="true"></i> Add People</button>
          </router-link>

        </div>
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
				return store.getters.isLoggedIn;
			},
            compiledMarkdown: function() {
                if(store.state.active_repo.readme) {
                  return marked(store.state.active_repo.readme, { sanitize: true})
                } else {
                  return ''
                }
            },
            repoUsers: function() {
                var repo_users = {}
                //if(store.state.active_repo) {
                //  store.dispatch('getRepoUsers', {data: {repo_id: store.state.active_repo.id}})
                  repo_users = store.state.active_repo.users;
                //}
    
                return repo_users;
            },
            showRepoControls: function() {

              var show = false;
              if( this.isLoggedIn && store.state.active_repo.id ) {
                show = true;
              }
            
              return show;

            },
            elementCount: function() {
              var keys = []
              if(undefined !== store.state.active_repo.data[0]) {
                keys = Object.keys(store.state.active_repo.data[0]);
              }
              return keys.length;
            }

		},
        methods: {
          userProfile: function(person_id) {
            console.log(' go to user profile ')

            var self = this;

            store.dispatch('setPerson', { data: { person_id: person_id }})
            .then(function() { 

                // Transition to User Profile if person set
                if(store.state.person) {
                  self.$root.$options.router.push('/user/profile')
                }
            });

          },
          deleteRepo: function(repo_id) {
            store.dispatch('deleteRepo', { data: { repo_id: repo_id }})
          }
        }
	}
	
</script>

<style>
</style>
