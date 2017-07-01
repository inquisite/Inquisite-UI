<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Edit Repository Details
		 </div>
        <div class="card-block">

          <div id="repo-msg" class="alert alert-warning" role="alert" v-show="message !== ''">{{message}}</div>

          <form id="editRepo-form" name="editRepo-form" method="POST" action="#">

            <div class="form-group row">
				<label for="name" class="col-3 col-form-label">Name</label>
				<div class="col-9">
					<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="name" class="col-3 col-form-label">Description</label>
				<div class="col-9">
					<textarea class="form-control" :value="readme" @input="updateMarkdown" rows="10" cols="80"></textarea>
				</div>
			</div>

			<div class="form-group row">
				<label for="name" class="col-3 col-form-label">URL</label>
				<div class="col-9">
					<input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-6">
					<button v-on:submit.prevent="editRepo" v-on:click.prevent="editRepo" class="btn btn-primary">Save</button>
				</div>
				<div class="col-sm-6 text-right">
					<click-confirm placement="bottom" style="display: inline;">
						<a @click="deleteRepo(activeRepo.id)">
							<button type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete Repository</button>
							</a>
					</click-confirm>
				</div>
            </div>

          </form>

          
        </div>  
      </div>
    </div>
</div>

</template>

<script>
import _ from 'lodash'
var marked = require('marked');

export default { 
  name: 'home',
  data: function() {
    var repo_id = this.$route.params.id;
    var repo = jQuery.extend({}, this.$store.getters.getRepoByID(repo_id));
    
    repo['state'] = this.$store.state;
    
    return repo;
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return this.$store.state.repositories;
    },
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	repos: function() { return this.$store.state.user.repos; },
	user: function() { return this.$store.state.user; },
	activeRepo: function() { return this.$store.state.active_repo; },
	message: function() { return this.$store.state.msg; }
  }, 
  methods: {
    editRepo: function() {
      if(this.name !== '') {
        var self = this;
        this.$store.dispatch('editRepo', { data: {name: this.name, readme: this.readme, url: this.url}, id: this.id, makeActive: true})
        .then(function(response) { 
            // Copy saved field values to model             
            var repo_id = self.$route.params.id;
            var repo = this.$store.getters.getRepoByID(repo_id);
            
            var f = ['name', 'readme', 'url'];
            for(var k in f) {
                repo[f[k]] = self[f[k]];
            }
        })
      } else {
        this.$store.stage.msg = 'Repository name is a required field';
      }
    },
    deleteRepo: function(repo_id) {
        this.$store.dispatch('deleteRepo', { data: { repo_id: repo_id }, router: this.$router});
    },
    updateMarkdown: _.debounce(function(e) {
      this.readme = e.target.value
    }, 300) 
  } 
  
}
</script>