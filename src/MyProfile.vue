<template>
<div id="user-profile">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>User Profile</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="panel">
        <div class="panel-body">
        
          <div class="row">
            <div class="col-sm-6">  

              <div class="panel">
              <div class="panel-body">

              <div>Name: {{sharedState.user.name}}</div>
              <div>Email: {{sharedState.user.email}}</div>
              <div>Location: {{sharedState.user.location}}</div>
              <div>Tagline: {{sharedState.user.tagline}}</div>
              <div>URL: {{sharedState.user.url}}</div>

              </div>
              </div>

            </div> 
          </div>


          <!-- User Items / Relationships? -->
          <div class="row">
            <div class="col-sm-12">

              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#repos" aria-controls="repos" role="tab" data-toggle="tab">Repositories</a></li>
                <li role="presentation"><a href="#orgs" aria-controls="orgs" role="tab" data-toggle="tab">Organizations</a></li>
                <li role="presentation"><a href="#following" aria-controls="following" role="tab" data-toggle="tab">Following</a></li>
                <li role="presentation"><a href="#followers" aria-controls="followers" role="tab" data-toggle="tab">Followers</a></li>
              </ul>

              <div id="useritems" class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="repos">
 
                  <div class="panel panel-default">
                    <div class="panel-heading">Repositories</div>
                    <div class="panel-body">
                      <p>Optional Descriptive area for User Repositories and associated actions</p> 
                    </div>

                    <table class="table table-hover">

                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Created On</th>
                        <th>Controls</th>
                      </tr>
                      </thead>
     
                      <tbody>

                        <tr v-for="repo in sharedState.user.repos">
                          <td>{{repo.name}}</td>
                          <td>{{repo.url}}</td>
                          <td>{{repo.created_on}}</td>
                          <td>
                            <a @click="editRepo(repo.id)"><span class="glyphicon glyphicon-pencil"></span></a> |
                            <a @click="deleteRepo(repo.id)"><span class="glyphicon glyphicon-remove"></span></a>
                          </td>
                        </tr> 
                      </tbody>
                    </table>

                  </div>

                </div>
                <div role="tabpanel" class="tab-pane" id="orgs"> Orgs List Coming ..</div>
                <div role="tabpanel" class="tab-pane" id="following"> Following List Coming .. </div>
                <div role="tabpanel" class="tab-pane" id="followers"> Followers List Coming .. </div>
              </div>

            </div>
          </div>

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
import store from './store.js'

export default { 
  name: 'user-profile',
  data: function() {
    return {
      sharedState: store.state,
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
    }
  },
  methods: {
    editRepo: function(repo_id) {
      console.log('edit Repo ' + repo_id);
    },
    deleteRepo: function(repo_id) {
      store.dispatch('deleteRepo', { data: { repo_id: repo_id }})
    }

  },
}
</script>

<style>
.form-item { padding: 5px 0; }

#useritems div { padding: 2%; }

</style>
