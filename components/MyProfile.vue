<template>
<div id="user-profile">
	<div class="row">
    	<div class="col-sm-6">
					<div class="card card-gray">
						<div class="card-header text-center">
							Your Profile
						</div>
						<div class="card-block">
						
				
						<div>Name: {{user.name}}</div>
						<div>Email: {{user.email}}</div>
						<div>Location: {{user.location}}</div>
						<div>Tagline: {{user.tagline}}</div>
						<div>URL: {{user.url}}</div>
						<div class="text-center">
							<button v-on:submit.prevent="editPrefs" v-on:click.prevent="editPrefs" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
						</div>
						</div>
			</div>
		</div><!-- end col -->
        <div class="col-sm-6">
			
			<div class="card card-gray">
				<div class="card-header card-header-with-tabs">
    				<ul class="nav nav-tabs card-header-tabs" role="tablist">
						<li role="presentation" class="nav-item"><a href="#repos" aria-controls="repos" role="tab" data-toggle="tab" class="nav-link active">Repositories</a></li>
						<!--<li role="presentation" class="nav-item"><a href="#orgs" aria-controls="orgs" role="tab" data-toggle="tab" class="nav-link">Organizations</a></li>-->
						<li role="presentation" class="nav-item"><a href="#followers" aria-controls="followers" role="tab" data-toggle="tab" class="nav-link">Followers</a></li>
						<li role="presentation" class="nav-item"><a href="#following" aria-controls="following" role="tab" data-toggle="tab" class="nav-link">Following</a></li>
					</ul>
				</div>
			
				<div class="tab-content">
                	<div role="tabpanel" class="tab-pane active" id="repos">                  
						<ul class="list-group list-group-flush" v-if="repos.length">
							<li class="list-group-item justify-content-between" v-for="repo in repos">
								<div><a @click="setActiveRepo(repo.id)">{{repo.name}}</a><br/>
									<small>{{repo.url}} {{repo.created_on}}</small>
								</div>
								<div>
									<router-link class="btn btn-primary btn-sm" :to="{path: '/edit-repo/' + repo.id, params: {id: repo.name}}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</router-link>
									<click-confirm placement="top" style="display:inline;">
										<a @click="deleteRepo(repo.id)" class="btn btn-orange  btn-sm"><i class="fa fa-times-circle" aria-hidden="true"></i> Delete</a>
									</click-confirm>
								</div>
							</li>
						</ul>
					</div>
                	<div role="tabpanel" class="tab-pane" id="orgs"> Orgs list to come ...</div>
                	<div role="tabpanel" class="tab-pane" id="followers"> Followers list to come ... </div>
                	<div role="tabpanel" class="tab-pane" id="following"> Following list to come ... </div>
              	</div> 
			</div>           
        </div>
    </div>
</div>

</template>

<script>

export default { 
  name: 'user-profile',
  data: function() {
    return {
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      
      state: this.$store.state
    }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	repos: function() { return this.$store.state.user.repos; },
	user: function() { return this.$store.state.user; },
	activeRepo: function() { return this.$store.state.active_repo; },
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return this.$store.state.repositories;
    }
  }, 
  methods: {
    editPrefs: function() {
      this.$router.push("/user/preferences");
    },
    deleteRepo: function(repo_id) {
      this.$store.dispatch('deleteRepo', { data: { repo_id: repo_id }});
    }
  },
}
</script>