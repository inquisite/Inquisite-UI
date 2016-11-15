<template>
  <div id="app">

    <div class="ui fixed menu">
        <a href="http://inquisite.whirl-i-gig.com/inquisite-ui" class="header item logo">
          <img class="logo" src="assets/images/logo.png">
        </a>
        <a href="#" class="item">Upload Data</a>
        <a href="#" class="item">Search & Refine</a>
        <div class="ui simple dropdown item">
          Visulize <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" href="#">Map</a>
            <a class="item" href="#">Timeline</a>
            <a class="item" href="#">Sheet</a>
            <a class="item" href="#">Nodes</a>
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
            <div class="menu">
              <a class="item" href="#">User Preferences</a>
              <a class="item" href="#">User Profile</a>
              <a class="item" href="#">Activity Log</a>
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

//import Home from './Home.vue'
//import Signup from './Signup.vue'
//import Login from '/.Login.vue'

export default {
  name: 'app',
  //components:{ 
  //  Home,
  //  Signup,
  //  Login 
  //},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
