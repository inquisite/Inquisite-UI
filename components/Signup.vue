<template>
<div id="signup">


  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Sign up to manage your data with Inquisite
		 </div>
        <div class="card-block">

          <div id="signup-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>

          <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

			<div class="form-group row">
				<label for="name" class="col-2 col-form-label">Name</label>
				<div class="col-10">
					<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
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
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="btn btn-primary">Register</button>
            </div>

          </form>
            <div class="form-group text-center">
            	Already have an account? <router-link class="item" to="/login">Login here</router-link>
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
  name: 'home',
  data: function() {
    return {
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      password: '',
      
      state: store.state
    }
  },
  computed: {
	message: function() { return store.state.msg; }
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
        store.state.msg = "Name, Email, and Password are required fields"   
      }
    }
  } 
  
}
</script>
