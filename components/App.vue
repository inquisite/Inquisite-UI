<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-light fixed-top shadowed">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#mainNavigation" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand">
            <img class="logo" src="assets/images/logo.png">
        </router-link>
        
        <div class="collapse navbar-collapse justify-content-end" id="mainNavigation">
        
        
			<ul class="navbar-nav" v-if="!isLoggedIn">
			  <li class="nav-item">
				<router-link class="nav-link" to="/signup">Sign up</router-link>
			  </li>
			  <li class="nav-item">
				<router-link to="/login" class="nav-link">Login</router-link>
			  </li>
			</ul>
        
            <ul class="navbar-nav" v-if="isLoggedIn">
                <li class="nav-item"><router-link to="/" class="nav-link teal">{{ activeRepo.name }}</router-link></li>
                <li class="nav-item"><router-link to="/upload" class="nav-link">Upload Data</router-link></li>
                <li class="nav-item dropdown">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Manage <span class="caret"></span>
                   </a>
					<ul class="dropdown-menu">
                     <li class="dropdown-item"><router-link :to="{path: '/edit-repo/' + activeRepo.id}" class="nav-link" >Repository Info</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/schema">Schema</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/manage-collaborators">Collaborators</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="">Stats</router-link></li>
                   </ul>
                </li><li class="nav-item dropdown">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Visualize <span class="caret"></span>
                   </a>
					<ul class="dropdown-menu">
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/map">Map</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/timeline">Timeline</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/sheet">Sheet</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/nodes">Nodes</router-link></li>
                   </ul>
                </li>

            </ul>
            <form class="form-inline">
				<input class="form-control mr-sm-2" type="text" placeholder="Search">
				<button class="btn btn-orange-reverse my-2 my-sm-0" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
			</form>
            <ul class="navbar-nav nav-bar-icons" v-if="isLoggedIn">
                <li class="nav-item btn btn-icon dropdown">
                    <a href="#" class="dropdown-toggle dropdown-toggle-icon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-archive" aria-hidden="true"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                        <H6 class="dropdown-header" v-if="user.repos.length > 1 && activeRepo.id">Change Repository:</H6>
                        <H6 class="dropdown-header" v-if="user.repos.length && !activeRepo.id">Choose Repository:</H6>
                        <li class="dropdown-item" v-for="repo in state.user.repos" v-if="activeRepo.id != repo.id"><a @click="setActiveRepo(repo.id)" class="nav-link">{{ repo.name }}</a></li>
                        <div class="dropdown-divider"></div>
                        <li class="dropdown-item"><router-link to="/add-repo" class="nav-link"><i class="fa fa-plus" aria-hidden="true"></i> New Repository</router-link></li>
                    </ul>
                </li>
                <li class="nav-item btn btn-icon dropdown">
                    <a href="#" class="dropdown-toggle dropdown-toggle-icon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                        <li class="dropdown-item"><router-link to="/user/preferences" class="nav-link">User Preferences</router-link></li>
                        <li class="dropdown-item"><router-link to="/user/my-profile" class="nav-link">User Profile</router-link></li>
                        <!--<li class="nav-item"><router-link to="/user/activity" class="nav-link">Activity Log</router-link></li>-->
                        <li class="dropdown-item"><a @click="processLogout" class="nav-link">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    
   

      <!-- Start of Home page content -->
      <div id="page" class="ui pageContent container">
          <router-view></router-view>
      </div>

  </div>
</template>

<script>
import store from '../store/store.js'

export default {
  name: 'app',
  store: store,
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