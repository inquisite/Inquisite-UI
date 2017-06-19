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
      <div class="card">
        <div class="card-block">
        
          <div class="row">
            <div class="col-sm-6">  

              <div class="card">
              <div class="card-block">
                
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
                <li role="presentation" class="nav-item active"><a href="#repos" aria-controls="repos" role="tab" data-toggle="tab" class="nav-link">Repositories</a></li>
                <!--<li role="presentation" class="nav-item"><a href="#orgs" aria-controls="orgs" role="tab" data-toggle="tab" class="nav-link">Organizations</a></li>-->
                <li role="presentation" class="nav-item"><a href="#following" aria-controls="following" role="tab" data-toggle="tab" class="nav-link">Following</a></li>
                <li role="presentation" class="nav-item"><a href="#followers" aria-controls="followers" role="tab" data-toggle="tab" class="nav-link">Followers</a></li>
              </ul>

              <div id="useritems" class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="repos">
 
                  <div class="card ">
                    <div class="card-header">Repositories</div>
                    <div class="card-block">
                      <p></p> 
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
                            <router-link class="item" :to="{path: '/edit-repo/' + repo.id, params: {id: repo.name}}"><i class="fa fa-pencil" aria-hidden="true"></i></router-link> |
                            <click-confirm placement="top" style="display: inline;">
                                <a @click="deleteRepo(repo.id)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                            </click-confirm>
                          </td>
                        </tr> 
                      </tbody>
                    </table>

                  </div>

                </div>
                <div role="tabpanel" class="tab-pane" id="orgs"> Orgs list to come ...</div>
                <div role="tabpanel" class="tab-pane" id="following"> Following list to come ... </div>
                <div role="tabpanel" class="tab-pane" id="followers"> Followers list to come ... </div>
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