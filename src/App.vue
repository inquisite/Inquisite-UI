<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-light fixed-top">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#"><router-link to="/" class="header item logo navbar-brand">
            <img class="logo" src="assets/images/logo.png" style="height: 100%;">
        </router-link></a>
            <ul class="nav navbar-nav mr-auto">
                <li class="navbar-item" v-if="isLoggedIn"><router-link to="/upload" class="nav-link">Upload Data</router-link></li>
                <li class="navbar-item" v-if="isLoggedIn"><router-link to="/searchrefine" class="nav-link">Search &amp; Refine</router-link></li>
                <li class="navbar-item dropdown" v-if="isLoggedIn">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Visualize <span class="caret"></span>
                   </a>

                   <ul class="dropdown-menu">
                     <li class="navbar-item"><router-link class="nav-link" to="/visualize/map">Map</router-link></li>
                     <li class="navbar-item"><router-link class="nav-link" to="/visualize/timeline">Timeline</router-link></li>
                     <li class="navbar-item"><router-link class="nav-link" to="/visualize/sheet">Sheet</router-link></li>
                     <li class="navbar-item"><router-link class="nav-link" to="/visualize/nodes">Nodes</router-link></li>
                   </ul>
                </li>

                <li class="navbar-item" v-if="isLoggedIn"><router-link class="nav-link" to="/schema">Schema</router-link></li>
                <li class="navbar-item" v-if="!isLoggedIn"><router-link class="nav-link" to="/signup">Sign up</router-link></li>

            </ul>
            <ul class="navbar-nav mr-auto">
                <li class="navbar-item" v-if="hasRepos()">
                    <div class="input-container">
                        <div class="input-group">
                            <input type="text" class="form-control" aria-label="Choose a Repository" placeholder="Choose a repository" :value="activeRepo.name" v-model="activeRepo.name">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Repos <span class="caret"></span>
                                </button>

                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li class="dropdown-item" v-for="repo in state.user.repos"><a @click="setActiveRepo(repo.id)">{{ repo.name }}</a></li>
                                </ul>
                            </div>
                            
                            <button type="button" class="btn btn-secondary btn-no-padding">
                                <router-link to="/add-repo" class="nav-link"><i class="fa fa-plus-square fa-2x" aria-hidden="true"></i></router-link>
                            </button>
                        </div>
                    </div>
                </li>
                <li class="navbar-item" v-else-if="isLoggedIn" style="border-left: none;">
                    <div class="input-container text-right">
                        <button type="button" class="btn btn-secondary">
                            <router-link to="/add-repo" class="nav-link">Add a Repository</router-link>
                        </button>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav navbar-right">
                <li class="navbar-item btn btn-secondary dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user" aria-hidden="true"></i><span class="caret"></span>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right" v-if="isLoggedIn">
                        <li class="navbar-item"><router-link to="/user/preferences" class="nav-link">User Preferences</router-link></li>
                        <li class="navbar-item"><router-link to="/user/my-profile" class="nav-link">User Profile</router-link></li>
                        <!--<li class="navbar-item"><router-link to="/user/activity" class="nav-link">Activity Log</router-link></li>-->
                        <li class="navbar-item"><a @click="processLogout" class="nav-link">Logout</a></li>
                    </ul>

                    <ul class="dropdown-menu dropdown-menu-right" v-else>
                        <li class="navbar-item"><router-link to="/login" class="nav-link">Login</router-link></li>
                    </ul>
                </li>
            </ul>
            
    </nav>
    
   

      <!-- Start of Home page content -->
      <div id="page" class="ui pageContent container">
          <router-view></router-view>
      </div>

  </div>
</template>

<script>

import store from './store.js'

export default {
  name: 'app',
  data: function() {
    return {
        state: store.state
    }
  },
  mounted: function() {
    this.getRepoList();
    store.dispatch('getUserInfo');
  },
  watch: {
    '$route': 'pageChangeActions'
  },
  computed: {
    isLoggedIn: function() {
	    return store.getters.isLoggedIn;
	},
	repos: function() { return store.state.user.repos; },
	user: function() { return store.state.user; },
	activeRepo: function() { return store.state.active_repo; }
  },
  methods: {
    processLogout: function() {
      var self = this;

      store.dispatch('doLogout', { token: store.state.token })
      .then(function() {
          // Transition to Home Page if logged out
          if(!self.isLoggedIn) {
              setTimeout( function() { self.$root.$options.router.push('/') }, 300) 
          }
      });

    },
    hasRepos: function() {
        var length = 0;

        if(store.state.user.repos !== undefined) {
          length = store.state.user.repos.length;
        }

        return length;
        
    },
    
    pageChangeActions: function() {
      // Clear form msg
      store.state.msg = '';

      // Get User Repos if logged in and we don't have them 
      if( this.isLoggedIn && !this.hasRepos) {
        store.dispatch('getRepos').then(function() { store.dispatch('getDataNodes', { data: { repo_id: store.state.active_repo.id }}); });
      }

    },
    getRepoList: function() {
      store.dispatch('getRepos');
    },
    setActiveRepo: function(repo_id) {
      store.commit('setActiveRepo', repo_id);
      this.$router.push("/");   // force back to dashboard for new repo
    }
  },
}
</script>