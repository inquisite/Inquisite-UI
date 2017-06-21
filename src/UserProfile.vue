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

                  <div>Name: {{person.name}}</div>
                  <div>Email: {{person.email}}</div>
                  <div>Location: {{person.location}}</div>
                  <div>Tagline: {{person.tagline}}</div>
                  <div>URL: {{person.url}}</div>

                  </div>
              </div>
            </div> 
          </div>


          <!-- User Items / Relationships? -->
          <div class="row">
            <div class="col-sm-12">

              <ul class="nav nav-tabs" role="tablist">
                <!--<li role="presentation" class="nav-item"><a href="#orgs" class="nav-link" aria-controls="orgs" role="tab" data-toggle="tab">Organizations</a></li>-->
                <li role="presentation" class="nav-item active"><a href="#followers" class="nav-link" aria-controls="followers" role="tab" data-toggle="tab">Followers</a></li>
                <li role="presentation" class="nav-item"><a href="#following" class="nav-link" aria-controls="following" role="tab" data-toggle="tab">Following</a></li>
              </ul>

              <div id="useritems" class="tab-content">
                <div role="tabpanel" class="tab-pane" id="orgs"> Orgs List to come ...</div>
                <div role="tabpanel" class="tab-pane active" id="followers"> Followers List to come ... </div>
                <div role="tabpanel" class="tab-pane" id="following"> Following List to come ... </div>
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
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      
      state: store.state
    }
  },
  computed: {
    person: function() { return store.state.person; }
  },
  methods: {
  },
}
</script>