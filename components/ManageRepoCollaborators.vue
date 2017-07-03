<template>
<div id="addPersonRepo">
    <div id="signup-msg" class="alert alert-danger" role="alert" v-show="message !== ''">
      <div class="msg" v-html="message"></div>
    </div>
    
	<div class="row">
		<div class="col-sm-6">
			<div class="card card-gray">
				<div class="card-header text-center">
					Your collaborators
			 	</div>
				<ul class="list-group list-group-flush" v-if="users.length">
					<li class="list-group-item justify-content-between" v-for="user in users">
						<div>{{user.name}} ({{user.email}}) {{user.role}}
						<small>{{user.location}}</small></div>
						<a v-if="user.role != 'owner'" @click="removeFromRepo(user.id)""><button type="button" class="btn btn-orange-reverse"><i class="fa fa-times-circle" aria-hidden="true"></i></button></a>
					</li>
				</ul>
			</div>
		</div>
		<div class="col-sm-6">
            <div class="card card-form">
            	<div class="card-header text-center">
					Add collaborators
			 	</div>
                <div class="card-block">
                    <div class="float-right"><a @click="addToRepo(last_user_id)"><button type="button" class="btn btn-primary" :disabled='(last_user_id == null)'><i class="fa fa-plus" aria-hidden="true"></i> Add</button></a></div>
                    <autocomplete
                        service="people/findPeople"
                        anchor="name" 
                        placeholder="Find user"
                        class-name="autocomplete-people"
                        :on-select="selectUser"
                        :on-ajax-loaded="filterUsers"
                        ></autocomplete>
                </div>  
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default { 
  name: 'home',
  data: function() {
    return {
        state: this.$store.state,
        last_user_id: null
    }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	users: function() { return this.$store.getters['repos/getActiveRepo'].users; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return this.$store.getters['people/getUserRepoCount'];
    },
    message: function() { return this.$store.state.msg; }
  }, 
  mounted: function() {
 
  }, 
  methods: {
    addToRepo: function(user_id) {
        var self = this;
        var store = this.$store;
        if (!user_id) { return false; }
        
        this.$store.dispatch('repos/addPersonToRepo', { data: { person_id: user_id, repo_id: store.getters['repos/getActiveRepoID'] }}).then(function() { 
            store.dispatch('repos/getRepoUsers', { data: { repo_id: store.getters['repos/getActiveRepoID'] }});
            $('.autocomplete-people-input').val('');
            self.last_user_id = null;
        });
    },
    removeFromRepo: function(user_id) {
        if (!user_id) { return false; }
        var store = this.$store;
       this.$store.dispatch('repos/removePersonFromRepo', { data: { person_id: user_id, repo_id: store.getters['repos/getActiveRepoID'] }})
       .then(function() { store.dispatch('repos/getRepoUsers', { data: { repo_id: store.getters['repos/getActiveRepoID'] }}) });
    },
    selectUser: function(u) {
        if (u.id > 0) { this.last_user_id = u.id; }
    },
    filterUsers: function(list) {
        var owner_id = this.activeRepo.owner.id;
        var l = list;
        $.each(l, function(k, v) {
            if(v && (v['id'] == owner_id)) {
                l.splice(k,1);
            }
        });
        return list;
    }
  } 
}
</script>