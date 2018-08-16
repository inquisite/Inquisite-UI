<template>
<div id="signup">


  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Sign up to manage your data with Inquisite
		 </div>
        <div class="card-body">

         <flashmessage/>

          <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

			<div class="form-group mb-4">
                <div class="row">
                    <div class="col-6">
                        <small id="fname-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'fname'">First name</small>
    					<input type="text" class="form-control" id="forename" name="forename" placeholder="First name" v-model="forename" v-on:focus="setActive('fname')" v-on:blur="removeActive('fname')">
    				</div>
    				<div class="col-6">
                        <small id="lname-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'lname'">Last name</small>
    					<input type="text" class="form-control" id="surname" name="surname" placeholder="Last name" v-model="surname" v-on:focus="setActive('lname')" v-on:blur="removeActive('lname')">
    				</div>
                </div>
			</div>

			<div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="email-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'email'">Email</small>
				        <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email" v-on:focus="setActive('email')" v-on:blur="removeActive('email')">
                    </div>
                </div>
			</div>

			<div class="form-group mb-4" v-if="email.toLowerCase().indexOf('nyu') >= 0">
                <div class="row">
                    <div class="col-12">
                        <small id="netid-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'netid'">NYU ID</small>
				        <input type="text" class="form-control" id="nyunetid" name="email" placeholder="NYU NetID" v-model="nyunetid" v-on:focus="setActive('netid')" v-on:blur="removeActive('netid')">
                    </div>
                </div>
			</div>

			<div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="loc-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'loc'">Location</small>
                        <input type="text" class="form-control" id="location" name="location" placeholder="Location" v-model="location" v-on:focus="setActive('loc')" v-on:blur="removeActive('loc')">
                    </div>
                </div>
			</div>

            <div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="tag-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'tag'">Tagline</small>
                        <input type="text" class="form-control" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline" v-on:focus="setActive('tag')" v-on:blur="removeActive('tag')">
                    </div>
                </div>
			</div>

            <div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="url-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'url'">URL</small>
                        <input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="url" v-on:focus="setActive('url')" v-on:blur="removeActive('url')">
                    </div>
                </div>
			</div>

			<div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="pass-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'pass'">Password</small>
                	    <input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password" v-on:focus="setActive('pass')" v-on:blur="removeActive('pass')">
                    </div>
                </div>
			</div>

			<div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="conf-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'conf'">Confirm Password</small>
				        <input type="password" class="form-control" id="password_confirm" name="password_confirm" placeholder="Confirm password" v-model="password_confirm" v-on:focus="setActive('conf')" v-on:blur="removeActive('conf')">
                    </div>
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
      activeField: null,

      state: this.$store.state
    }
  },
  computed: {

  },
  methods: {
    processSignup: function() {
      var self = this;
      if ((this.password.length > 0) && (this.password !== this.password_confirm)) {
        this.$store.dispatch('setMessage', "Password do not match");
      } else if( (this.forename === '') || (this.surname === '') || (this.email === '') || (this.password === '')) {
        this.$store.dispatch('setMessage', "Name, Email, and Password are required fields");
      } else if(!validateEmail(this.email)) {
        this.$store.dispatch('setMessage', "Email address is not valid");
      } else {
        this.$store.dispatch('register',
          { data: {
            forename: this.forename,
            surname: this.surname,
            email: this.email,
            location: this.location,
            tagline: this.tagline,
            nyunetid: this.nyunetid,
            url: this.url,
            password: this.password
        }}).then(function(result) {
            if (result) {
                self.$store.dispatch('setMessage', "You are now signed up!");
                self.$router.push('/');
            }
        });
      }
    },
    setActive: function(name){
        this.activeField = name;
    },
    removeActive: function(name){
        this.activeField = null;
    }
  }

}
</script>
