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

              <div>Name: {{sharedState.person.name}}</div>
              <div>Email: {{sharedState.person.email}}</div>
              <div>Location: {{sharedState.person.location}}</div>
              <div>Tagline: {{sharedState.person.tagline}}</div>
              <div>URL: {{sharedState.person.url}}</div>

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
 
                  <div class="card ">
                    <div class="card-header">Repositories</div>
                    <div class="card-block">
                      <p>Optional Descriptive area for User Repositories and associated actions</p> 
                    </div>

                    <table class="table table-hover">

                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Created On</th>
                      </tr>
                      </thead>
     
                      <tbody>

                        <tr v-for="repo in sharedState.person.repositories">
                          <td>{{repo.name}}</td>
                          <td>{{repo.url}}</td>
                          <td>{{repo.created_on}}</td>
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
  },
}
</script>

<style>
.form-item { padding: 5px 0; }

#useritems div { padding: 2%; }

</style>
