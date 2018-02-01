<template>
<div id="import-history">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			    Users ({{people.length}})
		    </div>
        <div class="card-block" style="overflow-x: auto;">
          <div class="row">
            <div class="col-sm-12">
              <ul class="list-group">
                <li class="list-group-item justify-content-between" v-for="p, i in people">
                      <div>
                        <a :data-id="p.id" data-toggle="modal" data-target="#PersonInfoModal" v-on:click.prevent="loadUserInfo($event, p.id, i)">{{p.name}}</a>
                        <small>({{p.email}})</small>
                      </div>
                      <div class="pull-right"> 
                        <span v-if="p.is_admin" class="badge badge-success badge-pill">Admin</span>
                        <span v-if="p.is_disabled" class="badge badge-danger badge-pill">Disabled</span>
                        <span class="badge badge-default badge-pill">{{p.repo_count}} <span v-if="p.repo_count == 1">repository</span><span v-if="p.repo_count != 1">repositories</span></span>
                      </div>
                </li>
              </ul>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div>
  <div class="modal fade" id="PersonInfoModal" tabindex="-1" role="dialog" aria-labelledby="User Information" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">User information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="PersonInfoContent">
          <div class="card">
            <div class="card-block">
              <div class="pull-right">
                <span v-if="person_info.is_admin == 1" class="badge badge-pill badge-success">Admin</span>
                <span v-if="person_info.is_disabled == 1" class="badge badge-pill badge-danger">Disabled</span>
                
                <span class="badge badge-pill badge-primary">
                    {{person_info.repo_count}} 
                    <span v-if="person_info.repo_count == '1'">repository</span>
                    <span v-if="person_info.repo_count != '1'">repositories</span>
                  </span>
              </div>
              <h4 class="card-title">{{person_info.forename}} {{person_info.surname}}</h4>
              <h6 class="card-subtitle mb-2 text-muted" v-if="person_info.location">{{person_info.location}}</h6>
              <h6 class="card-subtitle mb-2 text-muted" v-if="person_info.tagline">{{person_info.tagline}}</h6>
              <h6 class="card-subtitle mb-2 text-muted" v-if="person_info.tagline">{{person_info.url}}</h6>
              <p class="card-text">{{person_info.email}}</p>
            </div>
          </div>
          <div class="pull-right">
            <button v-if="!person_info.is_disabled" type="button" class="btn btn-danger btn-sm" v-on:click.prevent="toggleUserEnabled($event, person_info.id, false)">Disable</button>
            <button v-if="person_info.is_disabled" type="button" class="btn btn-success btn-sm" v-on:click.prevent="toggleUserEnabled($event, person_info.id, true)">Enable</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default { 
  name: 'admin-users',
  data: function() {
      return {
        people: [],
        person_info: ""
      };
  },
  mounted: function() {
    this.getPeopleList();
  },
  computed: {
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
  }, 
  methods: {
    getPeopleList: function() {
      var self = this;
      this.$store.dispatch("people/list", {}).then(function(response) {
        self.people = self.$store.getters['people/getList']
      });
    },
    loadUserInfo: function(e, id, i) {
      var self = this, index = i;
      this.$store.dispatch("admin/getPersonInfo", id).then(function(response) {
          self.person_info = self.$store.getters['admin/getPersonInfo'];
          self.person_info['index'] = index;
      });
    },
    toggleUserEnabled: function(e, id, enable) {
      var self = this;
        console.log("set enabled", id, enable);
      this.$store.dispatch("admin/editPerson", {"person_id": id, "is_disabled": enable ? 0 : 1 }).then(function(response) {  
        self.person_info.is_disabled = enable ? 0 : 1;
        self.people[self.person_info.index].is_disabled = enable ? 0 : 1;
      });
    }
  } 
}
</script>