<template>
<div id="home" class="container">
    <flashmessage/>
    
	<div class="row" v-if="!isLoaded && !isLoggedIn">
		<div class="col-sm-12">
			<div class="jumbotron">
				<h1 class="display-3">
					<i class="fa fa-cog fa-spin" aria-hidden="true"></i> Loading
				</h1>
			</div>
		</div>
	</div>
	<div class="row" v-else-if="!isLoggedIn">
		<div class="col-sm-12">
			<div class="container" v-if="!isLoggedIn">
				<div class="row bg-lt-gray">
					<div class="col-sm-6">
						<h1>Data got you down?<br/>Try Inquisite.<br/></h1>
					</div>
					<div class="col-sm-5 offset-sm-1 align-self-center">
						<div class="text-center">
							<router-link class="btn btn-primary btn-lg" to="/signup">Sign up</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link class="btn btn-primary btn-lg" to="/login">login</router-link>
						</div>
					</div>
				</div>
				<div class="row"><div class="col spacerRow"></div></div>
				<div class="row">
					<div class="col-sm-6">
						<p>
							<h4>What is it?</h4>
							Inquisite is a tool for collaboratively organizing, analyzing and assembling research data. 
							It is designed to streamline and encourage the formation of open research communities.
						</p>
						<p>
							<h4>How does it work?</h4>
							Inquisite users create repositories where research data can be shared and explored. 
							Inquisite processes and classifies data as it is imported, establishing links between common elements 
							in disparate sources. These links provide researchers the opportunity to contextualize and expand their 
							findings by leveraging the data of colleagues and peers into merged super-datasets.
						</p>
					</div>
					<div class="col-sm-5 offset-sm-1 fullWidthImg">
						<p>
							<img src="assets/images/inquisite_collage.png">
						</p>
					</div>
				</div>
			</div><!-- end !isLoggedIn -->
		</div>
	</div>  


      
      
	<div class="row" v-if="isLoggedIn && showRepoControls">
		<div class="col-sm-6">
			<div class="bg-lt-gray">
				<h1>{{activeRepo.name}}</h1>
				<div  v-if="showRepoControls">
					<div v-html="compiledMarkdown"></div>
				</div>
			</div>
		</div>
		<div class="col-sm-6 align-self-center text-center">
			<router-link :to="{path: '/edit-repo/' + activeRepo.id}">
				<button type="button" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
			</router-link>
			&nbsp;&nbsp;
			<router-link to="/upload">
				<button type="button" class="btn btn-primary"><i class="fa fa-upload" aria-hidden="true"></i> Data</button>
			</router-link>
			&nbsp;&nbsp;
			<router-link to="/schema">
				<button type="button" class="btn btn-primary"><i class="fa fa-cubes" aria-hidden="true"></i> Schema</button>
			</router-link>
		</div>
	</div>
	<div class="row"><div class="col spacerRow"></div></div>

  <div class="row" v-if="isLoggedIn">
    <div class="col-sm-6">
      <div class="card card-gray" v-if="showRepoControls">
        <div class="card-header">
          Repository Stats
        </div>
          <div v-if="activeRepo.data" class="card-block">
            <div class="row">
              <div class="col-4 text-center">
                <div class="h1">{{activeRepo.schema_type_count}}</div>
                <h5 class="media-heading">Data Types</h5>
              </div>  

              <div class="col-4 text-center">
                <div class="h1">{{activeRepo.schema_field_count}}</div>
                <h5 class="media-heading">Fields</h5>
              </div>           

              <div class="col-4 text-center">
                <div class="h1">{{activeRepo.data_element_count}}</div>
                <h5 class="media-heading">Records</h5>
              </div>
            </div>
          </div>
          <div v-else>
            <p>It looks like you haven't added any datasets to your repository yet?</p>

            <router-link to="/upload">
              <button type="button" class="btn btn-primary"><i class="fa fa-plus-square" aria-hidden="true"></i> Add Dataset</button>
            </router-link>
          </div>
      </div>

    </div>
    <div class="col-sm-6" v-if="showRepoControls">
		<div class="card card-gray" v-if="showRepoControls">
        	<div class="card-header">
          		Collaborators
          	</div>

			<ul class="list-group list-group-flush" v-if="repoUsers.length">
				<li class="list-group-item" v-for="user in repoUsers">
				  {{user.name}} ({{user.email}}) {{user.role}}
				</li>
			</ul>

			<div class="card-block text-center">
				<router-link to="/manage-collaborators">
					<button type="button" class="btn btn-primary"><i class="fa fa-square-plus" aria-hidden="true"></i> Manage collaborators</button>
				</router-link>
			</div>
        </div>
    </div>
  </div>
</div>

</template>

<script>
    var marked = require('marked'); 

	export default { 
		name: 'home',
        data: function() {
          return {
                state: this.$store.state
          }
        },
		computed: {
			isLoggedIn() {
				return this.$store.getters.isLoggedIn;
			},
			isLoaded() {
				return this.$store.state.loading;
			},
            compiledMarkdown: function() {
              var ar = this.$store.getters['repos/getActiveRepo'];
                if(ar.readme) {
                  return marked(ar.readme, { sanitize: true})
                } else {
                  return ''
                }
            },
            repoUsers: function() {
                return []; // this.$store.getters['repos/getActiveRepo'].users;
            },
            showRepoControls: function() {
              var show = false;
              var ar = this.$store.getters['repos/getActiveRepo'];
              if( this.isLoggedIn && (ar.id > 0) ) {
                show = true;
              }
            
              return show;
            },
            elementCount: function() {
              var keys = [];
              var ar = this.$store.getters['repos/getActiveRepo'];
              if((undefined !== ar.data) && (undefined !== ar.data[0])) {
                keys = Object.keys(ar.data[0]);
              }
              return keys.length;
            },
            activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; }
		},
        methods: {
          userProfile: function(person_id) {
            var self = this;

            this.$store.dispatch('people/setPerson', { data: { person_id: person_id }})
            .then(function() { 
                // Transition to User Profile if person set
                if(this.$store.state.person) {
                  self.$root.$options.router.push('/user/profile')
                }
            });

          }
        }
	}
	
</script>