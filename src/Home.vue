<template>
<div id="home">
  <div class="row" v-if="!isLogggedIn">
		 <h1>Welcome to New York Scapes</h1>
  </div>
  <div class="row" v-if="isLogggedIn">
    <div class="col-sm-12">

      <div class="page-header">
        <h1>Dashboard</h1>
      </div>

    </div>
  </div>

  <div class="row" v-if="isLogggedIn">
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
      <p>Lorem ipsum dolor sit amet,
        Vivamus sodales tortor in leo blandit pharetra
        Lorem ipsum dolor sit amet,
        Vivamus sodales tortor in leo blandit pharetra
        Lorem ipsum dolor sit amet,</p>
      <p>Vivamus sodales tortor in leo blandit pharetra</p>
    </div>

  </div>

  <hr/>   

  <div class="row" v-if="isLogggedIn">
    <div class="col-sm-6">
      <h4>Users in this Repository</h4>

      <ul class="media-list">

        <li class="media list-item">
          <div class="media-left">
            <a href="#">
              <span class="glyphicon glyphicon-user"></span>
            </a>
          </div>

          <div class="media-body">
            <h5 class="media-heading">Daniel L.</h5>
            <small>online now</small>
          </div>

          <div class="media-right">
              <button type="button" class="btn btn-default text-right">Profile</button>
          </div>

        </li>

        <li class="media list-item">
          <div class="media-left">
            <a href="#">
              <span class="glyphicon glyphicon-user"></span>
            </a>
          </div>

          <div class="media-body">
            <h5 class="media-heading">Elliot F.</h5>
            <small>online now</small>
          </div>

          <div class="media-right">
            <button type="button" class="btn btn-default">Profile</button>
          </div>

        </li>

        <li class="media list-item">
          <div class="media-left">
            <a href="#">
              <span class="glyphicon glyphicon-user"></span>
            </a>
          </div>

          <div class="media-body">
            <h5 class="media-heading">Elliot F.</h5>
            <small>online now</small>
          </div>

          <div class="media-right">
            <button type="button" class="btn btn-default">Profile</button>
          </div>
        </li>

      </ul>
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
	export default { 
		name: 'home',
		computed: {
			isLogggedIn() {
				return store.getters.is_loggedin;
			}
		}
	}
	
</script>

<style>
</style>
