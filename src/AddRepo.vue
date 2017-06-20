<template>
<div id="addRepo">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Add Repository</h1>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-block">

          <div class="alert alert-info" v-show="repositoryCount == 0">
            This looks like your first repository. It will be set as your active repository!
          </div>

          <div id="repo-msg" class="alert alert-warning" role="alert" v-show="sharedState.msg !== ''">{{sharedState.msg}}</div>

          <form id="addRepo-form" name="addRepo-form" method="POST" action="#">

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

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="addRepo" v-on:click.prevent="addRepo" class="btn btn-primary">Save</button>
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
    return {
      name: '',
      readme: '# Hello \n this is your new repository',
      url: '',
      sharedState: store.state
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return store.state.repositories;
    }
  }, 
  methods: {

    addRepo: function() {
      if(this.name !== '') {
        var self = this;
        store.dispatch('addRepo', { data: {name: this.name, readme: this.readme, url: this.url}, makeActive: true})
        .then(function(response) { 
             self.$router.push("/");
        })
      } else {
        this.sharedState.msg = 'Repository name is a required field';
      }
    },

    updateMarkdown: _.debounce(function(e) {
      this.readme = e.target.value
    }, 300) 
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
