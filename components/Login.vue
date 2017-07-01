<template>
<div id="login">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Login to Inquisite
		 </div>
        <div class="card-block">
       
          <div id="login-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>

          <form id="login-form" name="login-form" method="POST" action="">

            <div id="login-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="form-group row">
				<label for="email" class="col-2 col-form-label">Email</label>
				<div class="col-10">
					<input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="password" class="col-2 col-form-label">Password</label>
				<div class="col-10">
					<input type="password" class="form-control" id="password" name="password" placeholder="Password" v-model="password">
              	</div>
			</div>
            
            <div class="form-group text-center">
              <button v-on:submit.prevent="processLogin" v-on:click.prevent="processLogin" class="btn btn-primary">Login</button>
            </div>
            <div class="form-group text-center">
            	Don't have a login? <router-link class="item" to="/signup">Sign up</router-link>
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
    message: function() { return this.$store.state.msg; }
  },
  methods: {
    processLogin: function() {
      if( this.email !== '' && this.password !== '') {
          var self = this;
          var store = this.$store;
          this.$store.dispatch('doLogin', {data: {username: this.email, password: this.password}})
          .then(function() {
              // Transition to Home Page if logged in
              if(store.getters.isLoggedIn) {
                  setTimeout( function() { self.$router.push('/') }, 1500) 
              }
          });
      } else {
          this.$store.state.msg = 'Email and Password are required fields';
      }

    }
  }
} 
</script>