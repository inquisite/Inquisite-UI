<template>
<div id="signup">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Signup with Inquisite</h1>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">

          <div id="signup-msg" class="alert alert-warning" role="alert" v-show="sharedState.msg !== ''">{{sharedState.msg}}</div>

          <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui msessage" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="location" name="location" placeholder="Location" v-model="location">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="btn btn-primary">Submit</button>
            </div>

          </form>

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
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      password: '',
      sharedState: store.state
    }
  },
  
  methods: {
    processSignup: function() {


      if( this.name !== '' && this.email !== '' && this.password !== '') {
        store.dispatch('addPerson', 
          { data: {name: this.name, 
            email: this.email, 
            location: this.location, 
            tagline: this.tagline, 
            url: this.url, 
            password: this.password
        }});
      } else {

        this.sharedState.msg = "Name, Email, and Password are required fields"   

      }
    }
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
