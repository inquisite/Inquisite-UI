<template>
<div id="repos-featured">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			    Repositories ({{repos.length}})
		    </div>
        <div class="card-body" style="overflow-x: auto;">
          <div class="row">
            <div class="col-sm-12">
              <ul class="list-group">
                <li class="list-group-item justify-content-between" v-for="r, i in repos">
                  <div class="pull-left">
                    {{r.name}}<br/>
                      <small>Created: {{displayCreated(r.created_on)}}</small><br/>
                      <small>Owner: {{r.owner}} ({{r.email}})</small>
                  </div>
                  <div class="pull-right">
                      <span v-bind:class="Number(r.featured) ? 'badge-success' : 'badge-danger'" class="badge badge-pill">Featured</span>
                      <span v-bind:class="Number(r.published) ? 'badge-success' : 'badge-danger'" class="badge badge-pill">Published</span>
                      <div class="mt-4">
                          <button class="btn btn-sm btn-primary" v-on:click="setFeatured(i)" :disabled="Number(r.published) == 0">Toggle Featured</button>
                      </div>
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
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
var moment = require('moment');
export default {
  name: 'admin-repos',
  data: function() {
      return {
        featured: [],
        repos: []
      };
  },
  mounted: function() {
      var self = this;
      this.$store.dispatch('repos/getAllRepos').then(function(data){
          self.repos = data;
      })
  },
  computed: {
  },
  methods: {
    displayOwner: function(users){
        for(var i in users){
            var user = users[i]
            if(user.role == 'owner'){
                return user.name + " (" + user.email + ")"
            }
        }
    },
    displayCreated: function(date){
        var created = moment(date)
        return created.format("MMMM Do YYYY")
    },
    setFeatured: function(pos){
        var repo = this.repos[pos];
        var feat = Number(!repo.featured);
        var repoUpdate = {
            'id': repo.id,
            'data': {
                'name': repo.name,
                'url': repo.url,
                'readme': repo.readme,
                'featured': String(feat),
                'published': repo.published,
                'license': repo.license
            }
        }
        console.log(repoUpdate);
        var self = this;
        this.$store.dispatch("repos/editRepo", repoUpdate).then(function(data){
            self.repos[pos].featured = feat;
            self.$forceUpdate();
        });
    }
  }
}
</script>
