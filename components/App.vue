<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light fixed-top shadowed">
        <router-link to="/" class="navbar-brand">
            <img class="logo" src="assets/images/logo.png">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavigation" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavigation">
			<ul class="navbar-nav mr-auto" v-if="!isLoggedIn">
			  <li class="nav-item">
				<router-link class="nav-link" to="/signup">Sign up</router-link>
			  </li>
			  <li class="nav-item">
				<router-link to="/login" class="nav-link">Login</router-link>
			  </li>
			</ul>

            <ul class="navbar-nav mr-auto" v-if="isLoggedIn">

                <li class="nav-item dropdown">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Current: {{ activeRepo.name }} <span class="caret"></span>
                   </a>
					<ul class="dropdown-menu">
                        <H6 class="dropdown-header" v-if="repos.length > 1 && activeRepo.id">Change Repository:</H6>
                        <H6 class="dropdown-header" v-if="repos.length && !activeRepo.id">Choose Repository:</H6>
                        <li class="dropdown-item" v-for="repo in repos" v-if="activeRepo.id != repo.id"><a @click="setActiveRepo(repo.id)" class="nav-link">{{ repo.name }}</a></li>
                        <div class="dropdown-divider" v-if="repos.length > 1"></div>
                        <li class="dropdown-item"><router-link to="/add-repo" class="nav-link"><i class="fa fa-plus" aria-hidden="true"></i> New Repository</router-link></li>                   </ul>
                </li>


                <li class="nav-item"><router-link to="/upload" class="nav-link">Upload Data</router-link></li>
                <li class="nav-item dropdown">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Manage <span class="caret"></span>
                   </a>
					<ul class="dropdown-menu">
                     <li class="dropdown-item"><router-link :to="{path: '/edit-repo/' + activeRepo.id}" class="nav-link" >Repository Info</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/schema">Schema</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/list">Lists</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/manage-collaborators">Collaborators</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/import-history">Import history</router-link></li>
                     <li class="dropdown-item"><router-link :to="{path: '/export-data/' + activeRepo.id}" class="nav-link" >Export</router-link></li>
                   </ul>
                </li><li class="nav-item dropdown" v-if="hasData">
                   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Visualize <span class="caret"></span>
                   </a>
					<ul class="dropdown-menu">
                     <li class="dropdown-item" v-if="hasGeoreferences"><router-link class="nav-link" to="/visualize/maps">Map</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/sheets">Sheet</router-link></li>
                     <li class="dropdown-item"><router-link class="nav-link" to="/visualize/nodes">Nodes</router-link></li>
                   </ul>
                </li>
                <li class="nav-item dropdown" v-if="isAdmin">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     Admin <span class="caret"></span>
                   </a>
                    <ul class="dropdown-menu">
                        <li class="nav-item" ><router-link to="/admin/users" class="nav-link">Users</router-link></li>
                        <li class="nav-item" ><router-link to="/admin/repos" class="nav-link">Repositories</router-link></li>
                    </ul>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0" v-on:submit="search(search_expression)" v-if="isLoggedIn">
				<input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search_expression">
				<button class="btn btn-orange-reverse my-2 my-sm-0" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
			</form>
            <ul class="navbar-nav nav-bar-icons">
                <li class="nav-item btn btn-icon dropdown">
                    <a href="#" class="dropdown-toggle dropdown-toggle-icon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-question-circle"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                       <li class="dropdown-item"><router-link to="/help/getting-started" class="nav-link">Getting started</router-link></li>
                    <li class="dropdown-item"><router-link to="/help/faq" class="nav-link">FAQ</router-link></li>
                    <li class="dropdown-item"><router-link to="/help/contact" class="nav-link">Contact us</router-link></li>
                    </ul>
                </li>

                <li class="nav-item btn btn-icon dropdown"  v-if="isLoggedIn">
                    <a href="#" class="dropdown-toggle dropdown-toggle-icon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                        <li class="dropdown-item"><router-link to="/user/preferences" class="nav-link">User Preferences</router-link></li>
                        <li class="dropdown-item"><router-link to="/user/my-profile" class="nav-link">User Profile</router-link></li>
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
        state: store.state,
        search_expression: ""
    }
  },
  mounted: function() {
    var self = this;
    if (this.isLoggedIn) {
        // Load initial data
        this.$store.dispatch('boot', this.$store.getters['repos/getActiveRepoID']).then(function() {
            if(self.user){
                self.$socket.emit('send_user_id', {"id": self.user.id});
            }
        });
    }
  },
  watch: {
      isLoggedIn: function(login){
          if(login){
              if(this.user.id){
                  this.$socket.emit('send_user_id', {"id": this.user.id});
              }
          }
      }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
        return this.$store.getters['people/userIsAdmin'];
    },
    hasGeoreferences: function() {
        return this.$store.getters['schema/hasGeoreferences'];
    },
    hasData: function() {
        if(!this.activeRepo) { return false; }
        return (this.activeRepo.data_element_count > 0);
    },
	repos: function() { return this.$store.getters['repos/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() {
        var repo = this.$store.getters['repos/getActiveRepo'];
	    return repo ? repo : {};
    },
    getDataTypes: function() {
        if(this.activeRepo) {
            this.$store.dispatch('schema/getDataTypes', this.activeRepo.id);
        }
    }
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

        if(this.repos !== undefined) {
          length = store.getters['people/users/repos'].length;
        }

        return length;

    },
    setActiveRepo: function(repo_id) {
      store.commit('repos/SET_ACTIVE_REPO', repo_id);
       if(this.activeRepo) {
            this.$store.dispatch('schema/getDataTypes', this.activeRepo.id);
        }
      this.$router.push("/");   // force back to dashboard for new repo
    },
    search: function(search_expression) {
        this.$store.dispatch('search/quick', search_expression);
        this.$router.push("/search");
    }
  },
  sockets: {
    connect: function(){
        console.log('Socket Connected!');
    },
    disconnect: function(){
        console.log('Recieved Disconnect!');
    },
    entered_response: function(data){
        console.log("Entered Room", data);
    }
  }
}
</script>
