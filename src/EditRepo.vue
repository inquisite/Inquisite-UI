<template>
<div id="editRepo">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Edit Repository Details</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-block">

          <div id="repo-msg" class="alert alert-warning" role="alert" v-show="message !== ''">{{message}}</div>

          <form id="editRepo-form" name="editRepo-form" method="POST" action="#">

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <textarea class="form-control" :value="readme" @input="updateMarkdown" rows="10" cols="80"></textarea>
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
              </div>
            </div>

            <div class="item form-item pull-right">
                <click-confirm placement="bottom" style="display: inline;">
                    <a @click="deleteRepo(activeRepo.id)">
                        <button type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete Repository</button>
                        </a>
                </click-confirm>
            </div>
            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="editRepo" v-on:click.prevent="editRepo" class="btn btn-primary">Save</button>
            </div>

          </form>

          
        </div>  
      </div>
    </div>

    <div class="col-sm-6">
        <!-- Realtime Markdown Example -->
        <div v-html="compiledMarkdown"></div>
    </div>

  </div>
</div>

</template>

<script>

import store from './store.js'
import _ from 'lodash'
var marked = require('marked');

export default { 
  name: 'home',
  data: function() {
    var repo_id = this.$route.params.id;
    var repo = jQuery.extend({}, store.getters.getRepoByID(repo_id));
    
    repo['state'] = store.state;
    
    return repo;
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return store.state.repositories;
    },
    isLoggedIn: function() {
	    return store.getters.isLoggedIn;
	},
	repos: function() { return store.state.user.repos; },
	user: function() { return store.state.user; },
	activeRepo: function() { return store.state.active_repo; },
	message: function() { return store.state.msg; }
  }, 
  methods: {
    editRepo: function() {
      if(this.name !== '') {
        var self = this;
        store.dispatch('editRepo', { data: {name: this.name, readme: this.readme, url: this.url}, id: this.id, makeActive: true})
        .then(function(response) { 
            // Copy saved field values to model             
            var repo_id = self.$route.params.id;
            var repo = store.getters.getRepoByID(repo_id);
            
            var f = ['name', 'readme', 'url'];
            for(var k in f) {
                repo[f[k]] = self[f[k]];
            }
        })
      } else {
        store.stage.msg = 'Repository name is a required field';
      }
    },
    deleteRepo: function(repo_id) {
        store.dispatch('deleteRepo', { data: { repo_id: repo_id }, router: this.$router});
    },
    updateMarkdown: _.debounce(function(e) {
      this.readme = e.target.value
    }, 300) 
  } 
  
}
</script>