<template>
  <div id="app">

     <nav role="navigation" class="navbar navbar-static-top visible-sm visible-xs">
       <div class="container-fluid">
         <div class="navbar-header">
           <a href="http://inquisite.whirl-i-gig.com/inquisite-ui" class="navbar-brand">
             <img class="logo" src="assets/images/logo.png">
           </a>
         </div>

         <div class="navbar navbar-right mobile-btn-container">
           <button type="button" data-toggle="collapse" data-target="#mobileNav-container" aria-expanded="false" aria-controls="mobileNav-container" class="btn btn-default btn-lg">
             <span class="glyphicon glyphicon-menu-hamburger"></span>
           </button>
         </div>


       </div>

         <div id="mobileNav-container" class="container collapse">
           <ul id="mobileNav" class="nav nav-pills nav-stacked">
             <li><router-link class="item" to="/upload">Upload Data</router-link></li>
             <li><router-link class="item" to="/searchrefine">Search &amp; Refine</router-link></li>
             <li><router-link class="item" to="/visualize/map">Map</router-link></li>
             <li><router-link class="item" to="/visualize/timeline">Timeline</router-link></li>
             <li><router-link class="item" to="/visualize/sheet">Timeline</router-link></li>
             <li><router-link class="item" to="/visualize/nodes">Nodes</router-link></li>

             <li>
               <div class="input-container">
                 <div class="input-group">
                   <input type="text" class="form-control" aria-label="Choose a Repository" value="New York Scapes">
                   <div class="input-group-btn">
                     <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Choose a Repository <span class="caret"></span>
                     </button>

                     <ul class="dropdown-menu dropdown-menu-right">
                       <li><a href="#">City Census Data</a></li>
                       <li><a href="#">New York Scapes</a></li>
                       <li><a href="#">NYC Street Addresses (1850 - 1901)</a></li>
                     </ul>

                   </div>
                 </div>
               </div> 
             </li>

             <li v-if="sharedState.logged_in"><router-link :to="{name: 'user-prefs', params: {id: sharedState.user_id}}" class="item">User Preferences</router-link></li>
             <li v-if="sharedState.logged_in"><router-link :to="{name: 'user-profile', params: {id: sharedState.user_id}}" class="item">User Profile</router-link></li>
             <li v-if="sharedState.logged_in"><router-link :to="{name: 'user-activity', params: {id: sharedState.user_id}}" class="item">Activity Log</router-link></li>
             <li v-if="sharedState.logged_in"><a @click="processLogout" class="item">Logout</a></li>
             <li v-if="!sharedState.logged_in"><router-link to="/login" class="item">Login</router-link></li>
           </ul>
         </div>

     </nav>

     <nav role="navigation" class="navbar navbar-default navbar-static-top hidden-sm hidden-xs">
        <div class="container-fluid">
          <div class="navbar-header">
            <a href="http://inquisite.whirl-i-gig.com/inquisite-ui" class="header item logo navbar-brand">
              <img class="logo" src="assets/images/logo.png" style="height: 100%;">
            </a>
          </div>

          <ul class="nav navbar-nav navbar-left">

            <li><router-link to="/upload" class="item">Upload Data</router-link></li>
            <li><a v-link="{ name: 'searchrefine'}" class="item">Search &amp; Refine</a></li>
            <li class="dropdown">
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
          </ul>

          <ul class="nav navbar-nav navbar-right">

            <li v-if="isLogggedIn">
              <div class="input-container">
              <div class="input-group">
                <input type="text" class="form-control" aria-label="Choose a Repository" value="New York Scapes">
                <div class="input-group-btn">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a Repository <span class="caret"></span>
                  </button>

                  <ul class="dropdown-menu dropdown-menu-right">
                   	<li v-for="repository in repositories"><a href="#">{{ repository.name }}</a></li>
                  </ul>

                </div>
              </div>
              </div>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="glyphicon glyphicon-user"></span><span class="caret"></span>
              </a>

              <ul class="dropdown-menu" v-if="sharedState.logged_in">
                <li><router-link :to="{name: 'user-prefs', params: {id: sharedState.user_id}}" class="item">User Preferences</router-link></li>
                <li><router-link :to="{name: 'user-profile', params: {id: sharedState.user_id}}" class="item">User Profile</router-link></li>
                <li><router-link :to="{name: 'user-activity', params: {id: sharedState.user_id}}" class="item">Activity Log</router-link></li>
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

export default {
  name: 'app',
  data: function() {
    return {
      msg: 'Inquisite',
      sharedState: store.state,
      api_endpoint: '',
      repositories: []
    }
  },
  created: function() {
    console.log('calling userStore')
    store.getters.get_token

    this.$http.get('/inqusite-local-config.json').then(function(response) {
      this.api_endpoint = response.data.api_endpoint;
		this.getRepositoryList();
    }, function(response) {
      console.log('there was an error');
    });

  },
  computed: {
		isLogggedIn() {
			return store.getters.is_loggedin;
		}
	},
  methods: {
    processLogout: function() {
      var self = this;

      jQuery.ajax({
        type: "GET",
        url: self.api_endpoint + "/logout",
        crossDomain: true,
        headers: {"Authorization": "Bearer " + store.state.token },
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {
            console.log('logout called');

            // probably move into store logout action
            window.sessionStorage.removeItem('jwt')
            store.dispatch('logout');

            // Redirect to home from store
            self.$root.$options.router.push('/')
          }
        }
      })
    },
    
    getRepositoryList: function() {
      var self = this;
      jQuery.ajax({
        type: "GET",
        url: self.api_endpoint + "/repositories",
        crossDomain: true,
        headers: {"Authorization": "Bearer " + store.state.token },
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {
            console.log('got repos', data['repos']);
            self.repositories = data['repos'];
          }
        }
      })
    },
    
  },
}
</script>

<style>
</style>
