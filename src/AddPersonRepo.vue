<template>
<div id="addPersonRepo">
    <div class="row">
        <div class="col-sm-12">
            <div class="page-header">
                <h1>Your collaborators</h1>
            </div>
        </div>
    </div>

    <ul class="media-list">
        <li class="media" v-for="user in users">
            <div class="media-left">
                <i class="fa fa-user" aria-hidden="true"></i>
            </div>

            <div class="media-body">
                <h5 class="media-heading">{{user.name}} ({{user.role}})</h5>
                <small>{{user.location}}</small>
            </div>

            <div class="media-right">
                <a v-if="user.role != 'owner'" @click="removeFromRepo(user.id)"><button type="button" class="btn btn-secondary text-right">Remove</button></a>
            </div>
        </li>
    </ul>

    <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-block">
                    <autocomplete
                        service="findPeople"
                        anchor="name" 
                        placeholder="Find user"
                        class-name="autocomplete-people"
                        :on-select="selectUser"
                        :on-ajax-loaded="filterUsers"
                        ></autocomplete>
                        <a @click="addToRepo(last_user_id)"><button type="button" class="btn btn-secondary text-right" :disabled='(last_user_id == null)'>Add User</button></a>
                </div>  
            </div>
        </div>
    </div>
</div>

</template>

<script>

import store from './store.js'

export default { 
  name: 'home',
  data: function() {
    return {
        state: store.state,
        last_user_id: null
    }
  },
  computed: {
    isLoggedIn: function() {
	    return store.getters.isLoggedIn;
	},
	repos: function() { return store.state.user.repos; },
	users: function() { return store.state.active_repo.users; },
	activeRepo: function() { return store.state.active_repo; },
    compiledMarkdown: function() {
      return marked(this.readme, { sanitize: true})
    },
    repositoryCount: function() {
      return store.state.repositories;
    }
  }, 
  mounted: function() {
    store.dispatch('getPeople', { token: store.state.token })
  }, 
  methods: {
    addToRepo: function(user_id) {
        var self = this;
        if (!user_id) { return false; }
        store.dispatch('addPersonToRepo', { data: { person_id: user_id, repo_id: store.state.active_repo.id }}).then(function() { 
            store.dispatch('getRepoUsers', { data: { repo_id: store.state.active_repo.id }});
            $('.autocomplete-people-input').val('');
            self.last_user_id = null;
        });
    },
    removeFromRepo: function(user_id) {
        if (!user_id) { return false; }
       store.dispatch('removePersonFromRepo', { data: { person_id: user_id, repo_id: store.state.active_repo.id }})
       .then(function() { store.dispatch('getRepoUsers', { data: { repo_id: store.state.active_repo.id }}) });
    },
    selectUser: function(u) {
        this.last_user_id = u.id;
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