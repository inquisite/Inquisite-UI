<template>
  <div id="app">

     <!-- Mobile Nav -->
     <nav role="navigation" class="navbar navbar-static-top visible-sm visible-xs">
       <div class="container-fluid">
         <div class="navbar-header">
           <router-link to="/" class="navbar-brand">
             <img class="logo" src="assets/images/logo.png">
           </router-link>
         </div>

         <div class="navbar navbar-right mobile-btn-container">
           <button type="button" data-toggle="collapse" data-target="#mobileNav-container" aria-expanded="false" aria-controls="mobileNav-container" class="btn btn-default btn-lg">
             <span class="glyphicon glyphicon-menu-hamburger"></span>
           </button>
         </div>


       </div>

         <div id="mobileNav-container" class="container collapse">
           <ul id="mobileNav" class="nav nav-pills nav-stacked">
             <li v-if="isLoggedIn"><router-link class="item" to="/upload">Upload Data</router-link></li>
             <li><router-link class="item" to="/searchrefine">Search &amp; Refine</router-link></li>
             <li v-if="isLoggedIn"><router-link class="item" to="/visualize/map">Map</router-link></li>
             <li v-if="isLoggedIn"><router-link class="item" to="/visualize/timeline">Timeline</router-link></li>
             <li v-if="isLoggedIn"><router-link class="item" to="/visualize/sheet">Timeline</router-link></li>
             <li v-if="isLoggedIn"><router-link class="item" to="/visualize/nodes">Nodes</router-link></li>
             <li v-if="isLoggedIn"><router-link class="item" to="/schema">Schema</router-link></li>
             <li v-if="!isLoggedIn"><router-link class="item" to="/signup">Sign up</router-link></li>

             <li v-if="hasRepos">
              <div class="input-container">
              <div class="input-group">
                <input type="text" class="form-control" aria-label="Choose a Repository" value="">
                <div class="input-group-btn">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a Repository <span class="caret"></span>
                  </button>

                  <ul class="dropdown-menu dropdown-menu-right">
                   	<li v-for="repository in sharedState.user.repositories"><router-link to="#">{{ repository.name }}</router-link></li>
                  </ul>

                </div>
              </div>
              </div>
            </li>
            <li v-else></li>

            <li v-if="isLoggedIn">
               <router-link to="/user/preferences" class="item">User Preferences</router-link>
            </li>
            <li v-if="isLoggedIn">
               <router-link to="/user/profile" class="item">User Profile</router-link>
            </li>
            <li v-if="isLoggedIn">
               <router-link to="/user/activity" class="item">Activity Log</router-link>
            </li>
            <li v-if="isLoggedIn"><a @click="processLogout" class="item">Logout</a></li>
            <li v-if="!isLoggedIn"><router-link to="/login" class="item">Login</router-link></li>
           </ul>
         </div>

     </nav>

     <!-- Desktop Nav -->
     <nav role="navigation" class="navbar navbar-default navbar-static-top hidden-sm hidden-xs">
        <div class="container-fluid">
          <div class="navbar-header">
            <router-link to="/" class="header item logo navbar-brand">
              <img class="logo" src="assets/images/logo.png" style="height: 100%;">
            </router-link>
          </div>

          <ul class="nav navbar-nav navbar-left">
            <li v-if="isLoggedIn"><router-link to="/upload" class="item">Upload Data</router-link></li>
            <li v-if="isLoggedIn"><router-link to="/searchrefine" class="item">Search &amp; Refine</router-link></li>
            <li class="dropdown" v-if="isLoggedIn">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                 Visualize <span class="caret"></span>
               </a>

               <ul class="dropdown-menu">
                 <li><router-link class="item" to="/visualize/map">Map</router-link></li>
                 <li><router-link class="item" to="/visualize/timeline">Timeline</router-link></li>
                 <li><router-link class="item" to="/visualize/sheet">Sheet</router-link></li>
                 <li><router-link class="item" to="/visualize/nodes">Nodes</router-link></li>
               </ul>

            </li>

            <li v-if="isLoggedIn"><router-link class="item" to="/schema">Schema</router-link></li>
            <li v-if="!isLoggedIn"><router-link class="item" to="/signup">Sign up</router-link></li>

          </ul>

          <ul class="nav navbar-nav navbar-right">

            <li v-if="hasRepos">
              <div class="input-container">
              <div class="input-group">
                <input type="text" class="form-control" aria-label="Choose a Repository" placeholder="Choose a repository" :value="sharedState.active_repo.name" v-model="sharedState.active_repo.name">
                <div class="input-group-btn">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Repos <span class="caret"></span>
                  </button>

                  <ul class="dropdown-menu dropdown-menu-right">
                   	<li v-for="repository in sharedState.user.repositories"><a @click="setActiveRepo(repository)">{{ repository.name }}</a></li>
                  </ul>


                  <button type="button" class="btn btn-default">
                    <router-link to="/add-repo" class="item"><span class="glyphicon glyphicon-plus"></span></router-link>
                  </button>

                </div>
              </div>
              </div>
            </li>
            <li v-else-if="isLoggedIn" style="border-left: none;">
              <div class="input-container text-right">
                <button type="button" class="btn btn-default">
                  <router-link to="/add-repo" class="item">Add a Repository</router-link>
                </button>
              </div>
            </li>
            


            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="glyphicon glyphicon-user"></span><span class="caret"></span>
              </a>

              <ul class="dropdown-menu" v-if="isLoggedIn">

                <li><router-link to="/user/preferences" class="item">User Preferences</router-link></li>
                <li><router-link to="/user/profile" class="item">User Profile</router-link></li>
                <li><router-link to="/user/activity" class="item">Activity Log</router-link></li>
                <li><a @click="processLogout" class="item">Logout</a></li>
              </ul>

              <ul class="dropdown-menu" v-else>
                <li><router-link to="/login" class="item">Login</router-link></li>
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

import store from './store.js'
import config from './config.js'

export default {
  name: 'app',
  data: function() {
    return {
      msg: 'Inquisite',
      sharedState: store.state,
    }
  },
  mounted: function() {
    console.log("mounted");
    this.getRepositoryList();
  },
  watch: {
    '$route': 'pageChangeActions'
  },
  computed: {
    isLoggedIn: function() {
	    return store.getters.is_loggedin;
	},
    hasRepos: function() {
        var length = 0;

        if(store.state.user.repositories !== undefined) {
          length = store.state.user.repositories.length;
        }

        return length;
        
    }
  },
  methods: {
    processLogout: function() {
      var self = this;

      store.dispatch('doLogout', { token: store.state.token })
      .then(function() {

           // Transition to Home Page if logged out
           if(!self.sharedState.logged_in) {
               setTimeout( function() { self.$root.$options.router.push('/') }, 300) 
           }
      });

    },
    
    pageChangeActions: function() {

      console.log('page Change Actions');

      // Clear form msg
      store.state.msg = '';

      // Get User Repos if Logged in and we don't have them 
      if( this.isLoggedIn && !this.hasRepos) {

        console.log(' getting some repos now');
        store.dispatch('getRepositories', { token: store.state.token }); 
      }

    },

    getRepositoryList: function() {
      store.dispatch('getRepositories', { token: store.state.token });
    },
    
    setActiveRepo: function(repository) {
      store.commit('setActiveRepo', repository);
    }

  },
}
</script>

<style>
</style>
