<template>
  <div id="app">

    <div class="ui fixed menu">
        <router-link to="/" class="header item logo">
          <img class="logo" src="assets/images/logo.png">
        </router-link>
        <router-link to="/upload" class="item">Upload Data</router-link>
        <router-link to="/search-refine" class="item">Search & Refine</router-link>
        <div class="ui simple dropdown item">
          Visulize <i class="dropdown icon"></i>
          <div class="menu">
            <router-link to="/visualize/map" class="item">Map</router-link>
            <router-link to="/visualize/timeline" class="item">Timeline</router-link>
            <router-link to="/visualize/sheet" class="item">Sheet</router-link>
            <router-link to="/visualize/nodes" class="item">Nodes</router-link>
          </div>
        </div>

        <div class="right menu">
          <div class="ui selection dropdown">
            <input type="hidden" name="dataset">
            <i class="dropdown icon"></i>
            <div class="text">New York Scapes</div>
            <div class="ui menu">
              <div class="header">Choose a Repository</div>
              <div class="divide"></div>
              <div class="item" data-value="1">City Census Data</div>
              <div class="item" data-value="2">New York Scapes</div>
              <div class="item" data-value="3">NYC Street Addresses (1850 - 1901)</div>
            </div>
          </div>

          <div class="ui simple dropdown item">
            <i class="icon user"></i> <i class="dropdown icon"></i>
            <div class="menu" v-if="sharedState.logged_in">
              <router-link :to="{name: 'user-prefs', params: { id: sharedState.user_id }}" class="item">User Preferences</router-link>
              <router-link :to="{name: 'user-profile', params: { id: sharedState.user_id }}" class="item">User Profile</router-link>
              <router-link :to="{name: 'user-activity', params: { id: sharedState.user_id }}" class="item" >Activity Log</router-link>
              <a @click="processLogout" class="item" >Logout</a>
            </div>
            <div class="menu" v-else>
              <router-link to="/login" class="item" >Login</rotuer-link>
            </div>

          </div>
        </div>
      </div>

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
      msg: 'Welcome to Your Vue.js App',
      sharedState: store.state,
      api_endpoint: ''
    }
  },
  created: function() {
    console.log('calling userStore')
    store.getters.get_token

    this.$http.get('/inqusite-local-config.json').then(function(response) {
      this.api_endpoint = response.data.api_endpoint;
    }, function(response) {
      console.log('there was an error');
    });

  },
  methods: {
    processLogout: function() {

      var self = this;

      jQuery.ajax({
        type: "POST",
        url: self.api_endpoint + "/logout",
        crossDomain: true,
        headers: {"Authorization": "Bearer " + store.state.token },
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {
            console.log('logout called');

            // probably move into store logout action
            window.sessionStorage.removeItem('jwt')
            store.dispatch('logout');

            //TODO: Redirect to home from store?
          }
        }
      })
    },
    
  },
}
</script>

<style>
</style>
