<template>
<div id="login">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Reset your password
		 </div>
        <div class="card-block">
       
          <flashmessage/>

          <form id="password-reset-form" name="password-reset-form" method="POST" action="">

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
					<input type="password_again" class="form-control" id="password_again" name="password_again" placeholder="Password" v-model="password_again">
              	</div>
			</div>
            
            <div class="form-group text-center">
              <button v-on:submit.prevent="processReset" v-on:click.prevent="processReset" class="btn btn-primary">Reset Password</button>
            </div>

          </form>

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
      
      state: this.$store.state
    }
  },
  computed: {
  
  },
  methods: {
    processReset: function() {
      if(this.password !== '') {
          // var self = this;
          // var store = this.$store;
          // this.$store.dispatch('doLogin', {data: {username: this.email, password: this.password}})
          // .then(function() {
          //     // Transition to Home Page if logged in
          //     if(store.getters.isLoggedIn) {
          //         setTimeout( function() { self.$router.push('/') }, 1000) 
          //     }
          // });
      } else {
          this.$store.state.msg = 'Password is required';
      }

    }
  }
} 
</script>