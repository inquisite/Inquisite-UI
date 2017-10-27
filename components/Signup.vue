<template>
<div id="signup">


  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Sign up to manage your data with Inquisite
		 </div>
        <div class="card-block">

         <flashmessage/>

          <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

			<div class="form-group row">
				<label for="name" class="col-2 col-form-label">Name</label>
				<div class="col-5">
					<input type="text" class="form-control" id="forename" name="forename" placeholder="First name" v-model="forename">
				</div>
				<div class="col-5">
					<input type="text" class="form-control" id="surname" name="surname" placeholder="Last name" v-model="surname">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="email" class="col-2 col-form-label">Email</label>
				<div class="col-10">
					<input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
				</div>
			</div>
			
			<div class="form-group row" v-if="email.toLowerCase().indexOf('nyu') >= 0">
				<label for="email" class="col-2 col-form-label">NetID</label>
				<div class="col-10">
					<input type="text" class="form-control" id="nyunetid" name="email" placeholder="NYU NetID" v-model="nyunetid">
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
			
			<div class="form-group row">
				<label for="password" class="col-2 col-form-label">Confirm password</label>
				<div class="col-10">
					<input type="password" class="form-control" id="password_confirm" name="password_confirm" placeholder="Confirm password" v-model="password_confirm">
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
import { validateEmail } from '../lib/utils.js'
export default { 
  name: 'home',
  data: function() {
    return {
      forename: '',
      surname: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      password: '',
      nyunetid: '',
      password_confirm: '',
      
      state: this.$store.state
    }
  },
  computed: {
    
  },
  methods: {
    processSignup: function() {
      var self = this;
      
      if ((this.password.length > 0) && (this.password !== this.password_confirm)) {
        this.$store.state.msg = "Password do not match";  
      } else if( this.forename === '' || this.surname === '' || this.email === '' || this.password === '') {
        this.$store.state.msg = "Name, Email, and Password are required fields";   
      } else if(!validateEmail(this.email)) {
        this.$store.state.msg = "Email address is not valid";   
      } else {
        this.$store.dispatch('people/addPerson', 
          { data: {
            forename: this.forename, 
            surname: this.surname,
            email: this.email, 
            location: this.location, 
            tagline: this.tagline, 
            nyunetid: this.nyunetid,
            url: this.url, 
            password: this.password
        }}).then(function(response) {
            if ((typeof(response) == 'object') && (response.isError === true)) {
                self.$store.state.msg = response.message;
            } else {
                self.$store.state.msg = "You are now signed up!";
                self.$router.push('/'); 
            }
        });
      } 
    }
  } 
  
}
</script>
