<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Edit Repository Details
		 </div>
        <div class="card-block">

          <flashmessage/>

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
					<textarea class="form-control" v-model="readme" rows="10" cols="80"></textarea>
				</div>
			</div>

			<div class="form-group row">
				<label for="name" class="col-3 col-form-label">URL</label>
				<div class="col-9">
					<input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
				</div>
			</div>

      <div class="form-group row">
				<label for="name" class="col-3 col-form-label">License</label>
				<div class="col-9">
					<select name="license" id="license" v-model="license" class="custom-select"><option v-for="o, k in licenses" :value="o.value">{{o.name}}</option></select>
				</div>
			</div>

      <div class="form-group row">
				<label for="name" class="col-3 col-form-label">Access</label>
				<div class="col-9">
					<select name="published" id="published" v-model="published" class="custom-select"><option v-for="o, k in publicationStatuses" :value="o.value">{{o.name}}</option></select>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-6">
					<button v-on:submit.prevent="editRepo" v-on:click.prevent="editRepo" class="btn btn-primary">Save</button>
				</div>
				<div class="col-sm-6 text-right">
					<click-confirm placement="top" style="display: inline;">
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

export default { 
  name: 'home',
  data: function() {
    return this.$store.getters['repos/getRepoByID'](this.$attrs.id);
  },
  computed: {
    repositoryCount: function() {
      return this.$store.getters['people/getUserRepoCount'];
    },
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
    },
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    user: function() { return this.$store.getters['people/getUserInfo']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    publicationStatuses: function() { return this.$store.getters['application/getPublicationStatuses']},
    licenses: function() { return this.$store.getters['application/getLicenses']}
  }, 
  methods: {
    editRepo: function() {
      if(this.name !== '') {
        var self = this;
        var store = this.$store;
        this.$store.dispatch('repos/editRepo', { data: {name: this.name, readme: this.readme, url: this.url, license: this.license, published: this.published}, id: this.id, makeActive: true});
      } else {
        this.$store.stage.msg = 'Repository name is a required field';
      }
    },
    deleteRepo: function(repo_id) {
        this.$store.dispatch('repos/deleteRepo', { data: { repo_id: repo_id }, router: this.$router});
    }
  } 
  
}
</script>