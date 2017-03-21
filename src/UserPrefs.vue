<template>
<div id="user-preferences">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>User Preferences</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">

         <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui msessage" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="text" class="form-control" id="location" name="location" placeholder="Location" v-model="location">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="text" class="form-control" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui fluid labeled input content">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item form-item form-group">
              <div class="ui">Default Repository:</div>
 
              <div v-if="hasRepos"> 
                <div class="input-group">

                  <input type="text" class="form-control" aria-label="Choose a Repository" placeholder="Choose a Repository" :value="sharedState.user.prefs.default_repo.name"
v-model="sharedState.user.prefs.default_repo.name">
                            
                   <div class="input-group-btn">
                     <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Repos <span class="caret"></span>
                     </button>

                     <ul class="dropdown-menu dropdown-menu-right">
                   	   <li v-for="repository in sharedState.user.repos"><a @click="setDefaultRepo(repository)">{{ repository.name }}</a></li>
                     </ul>

                   </div> 

                </div>
              </div>
              <div v-else>
 
                <div class="alert alert-info" role="alert">
                  <p>It looks like you have yet to create any repositories. Click here to get started!</p> 

                  <br/>

                  <button type="button" class="btn btn-default">
                    <router-link to="/add-repo" class="item">
                      <span class="glyphicon glyphicon-plus"></span> Add a Repository
                    </router-link>
                  </button>
                </div>

              </div>

            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="editUser()" v-on:click.prevent="editUser()" class="btn btn-primary">Submit</button>
            </div>

          </form>

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
import store from './store.js'

export default { 
  name: 'user-prefs',
  data: function() {
    return {
      sharedState: store.state,
    }
  },
  computed: {
    name: {
      get: function() { return store.state.user.name; },
      set: function(value) { store.commit('setUserName', value) }
    },
    email: {
      get: function() { return store.state.user.email; },
      set: function(value) { store.commit('setUserEmail', value) }
    },
    location: {
      get: function() { return store.state.user.location; },
      set: function(value) { store.commit('setUserLocation', value) }
    },
    tagline: {
      get: function() { return store.state.user.tagline; },
      set: function(value) { store.commit('setUserTagline', value) }
    },
    url: {
      get: function() { return store.state.user.url; },
      set: function(value) { store.commit('setUserUrl', value) }
    },
    default_repo: {
      get: function() { return store.getters.default_repo; },
      set: function(value) { store.commit('setDefaultRepo', value) }
    },
    hasRepos: function() {
      var length = 0;
      if(store.state.user.repos !== undefined) {
        length = store.state.user.repos.length;
      }

      return length;
    }

  },
  methods: {
    editUser: function() {

        store.dispatch('editPerson', {
          token: store.state.token, 
          data: { name: this.name, email: this.email, location: this.location, tagline: this.tagline, url: this.url, default_repo: this.default_repo}
        })      

    },
    setDefaultRepo: function(repository) {
 
      console.log('setting default repo');
      console.log( repository.name );

      store.commit('setDefaultRepo', repository);
    }
  }
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
