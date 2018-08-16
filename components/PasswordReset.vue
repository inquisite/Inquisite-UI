<template>
<div id="login">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Reset your password
		 </div>
        <div class="card-body">
       
          <flashmessage/>

          <form id="password-reset-form" name="password-reset-form" method="POST" action="" v-if="!passwordChanged && !keyExpired">

            <div id="password-reset-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>
			
			<div class="form-group row">
				<label for="password" class="col-2 col-form-label">Password</label>
				<div class="col-10">
					<input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              	</div>
			</div>

			<div class="form-group row">
				<label for="password_again" class="col-2 col-form-label">Password (again)</label>
				<div class="col-10">
					<input type="password" class="form-control" id="password_again" name="password_again" placeholder="Password" v-model="password_again">
              	</div>
			</div>
            
            <div class="form-group text-center">
              <button v-on:submit.prevent="processReset" v-on:click.prevent="resetPassword" class="btn btn-primary">Set new password</button>
            </div>

          </form>

          <div v-if="passwordChanged">
            <h2>Your password has been changed</h2>
            You can <router-link to="/login">login</router-link> now
            </div>

        <div v-if="keyExpired">
            <h2>This reset request has expired</h2>
            Please try <router-link to="/password">resetting your password</router-link> again
        </div>  
        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default { 
  name: 'login',
  data: function() {
    return {
      email: '',
      password: '',
      passwordChanged: false,
      keyExpired: false
    }
  },
  computed: {
  
  },
  methods: {
    resetPassword: function() {
      var self = this;
      if(!this.password) {
        this.$store.dispatch('setMessage',  'Password is required');
      } else if (this.password != this.password_again) {
        this.$store.dispatch('setMessage',  'Passwords do not match');
      } else {
        this.$store.dispatch("people/setPassword", {"password": this.password, "reset_key": this.$route.query.reset}).then(function(response,x) {
            if (response._status == 200) {
              self.passwordChanged = true;
            } else if (response._status == 400) {
              self.keyExpired = true;
            }
        });
      }

    }
  }
} 
</script>