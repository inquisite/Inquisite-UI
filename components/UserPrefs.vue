<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Your Preferences
		 </div>
        <div class="card-body">

         <form id="signup-form" name="signup-form" method="POST" action="">

           <flashmessage/>

            <div class="form-group row">
				<label for="name" class="col-2 col-form-label">Name</label>
				<div class="col-5">
					<input type="text" class="form-control" id="forename" name="forename" placeholder="First name" v-model="forename">
				</div>
				<div class="col-5">
					<input type="text" class="form-control" id="surname" name="surname" placeholder="Last name" v-model="surname">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="email" class="col-2 col-form-label">Email</label>
				<div class="col-10">
					<input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="location" class="col-2 col-form-label">Location</label>
				<div class="col-10">
					<input type="text" class="form-control" id="location" name="location" placeholder="Location" v-model="location">
				</div>
			</div>
            
            <div class="form-group row">
				<label for="tagline" class="col-2 col-form-label">Tagline</label>
				<div class="col-10">
					<input type="text" class="form-control" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline">
				</div>
			</div>

            <div class="form-group row">
				<label for="url" class="col-2 col-form-label">URL</label>
				<div class="col-10">
					<input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="password" class="col-2 col-form-label">Password</label>
				<div class="col-10">
					<input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
				</div>
			</div>

            <div class="form-group text-center">
              <button v-on:submit.prevent="editUser()" v-on:click.prevent="editUser()" class="btn btn-primary">Save</button>
            </div>

            <div v-if="hasRepos == 0"> 
                <div class="form-group text-center">
                    <div class="alert alert-info" role="alert">
                        <p>It looks like you have yet to create any repositories. Click here to get started!</p> 
						<button type="button" class="btn btn-secondary">
                            <router-link to="/add-repo" class="item">
                                <i class="fa fa-square-plus" aria-hidden="true"></i> Add a Repository
                            </router-link>
                        </button>
                    </div>
                </div>
            </div>

          </form>

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default { 
  name: 'user-prefs',
  data: function() {
    return {
        state: this.$store.state
    }
  },
  computed: {
    forename: {
      get: function() { return this.$store.getters['people/getUserInfo'].forename; },
      set: function(value) { this.$store.commit('people/setUserForename', value) }
    },
    surname: {
      get: function() { return this.$store.getters['people/getUserInfo'].surname; },
      set: function(value) { this.$store.commit('people/setUserSurname', value) }
    },
    email: {
      get: function() { return this.$store.getters['people/getUserInfo'].email; },
      set: function(value) { this.$store.commit('people/setUserEmail', value) }
    },
    location: {
      get: function() { return this.$store.getters['people/getUserInfo'].location; },
      set: function(value) { this.$store.commit('people/setUserLocation', value) }
    },
    tagline: {
      get: function() { return this.$store.getters['people/getUserInfo'].tagline; },
      set: function(value) { this.$store.commit('people/setUserTagline', value) }
    },
    url: {
      get: function() { return this.$store.getters['people/getUserInfo'].url; },
      set: function(value) { this.$store.commit('people/setUserUrl', value) }
    },
    hasRepos: {
        get: function() {
          var length = 0;
          var repos = this.$store.getters['people/getUserRepos'];
          if(repos !== undefined) {
            length = repos.length;
          }
          return length;
        }
    }
	},
  methods: {
    editUser: function() {
        this.$store.dispatch('people/editPerson', {
          data: { forename: this.forename, surname: this.surname, email: this.email, location: this.location, tagline: this.tagline, url: this.url}
        })      

    }
  }
}
</script>