<template>
<div id="addRepo">
  <div class="row">
    <div class="col-sm-8 offset-sm-2">
        <div class="card card-form">
            <div class="card-header text-center">Add Repository</div>
            <div class="card-body">
				<div class="alert alert-info" v-show="repositoryCount == 0">
					This looks like your first repository. It will be set as your active repository!
				</div>
          	  <flashmessage/>

          <form id="addRepo-form" name="addRepo-form" method="POST" action="#">

					<div class="form-group row">
						<label for="name" class="col-3 col-form-label">Name</label>
						<div class="col-9">
							<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
						</div>
					</div>

					<div class="form-group row">
						<label for="name" class="col-3 col-form-label">Description</label>
						<div class="col-9">
							<textarea class="form-control" v-model="readme" rows="10" cols="80" placeholder="# Hello! This is your new repository"></textarea>
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
					
					<div class="form-group text-center">
					  <button v-on:submit.prevent="addRepo" v-on:click.prevent="addRepo" class="btn btn-primary">Save</button>
					</div>
          		</form>

          
        </div>  
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
    return {
      name: '',
      readme: '',
      url: '',
      published: "0",
      license: "",
      
      state: this.$store.state
    }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
    },
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    user: function() { return this.$store.getters['people/getUserInfo']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    repositoryCount: function() {
      return this.$store.getters['people/getUserRepoCount'];
    },
    publicationStatuses: function() { return this.$store.getters['application/getPublicationStatuses']},
    licenses: function() { return this.$store.getters['application/getLicenses']}
  }, 
  methods: {
    addRepo: function() {
      if(this.name !== '') {
        var self = this;
        this.$store.dispatch('repos/addRepo', { data: {name: this.name, readme: this.readme, url: this.url, license: this.license, published: this.published }, makeActive: true})
        .then(function(response) { 
             self.$router.push("/");
        })
      } else {
        this.msg = 'Repository name is a required field';
      }
    }
  } 
  
}
</script>