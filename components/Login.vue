<template>
<div id="login">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Login to Inquisite
		 </div>
        <div class="card-body">

          <flashmessage/>

          <form id="login-form" name="login-form" method="POST" action="">

            <div id="login-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>
            <div class="form-group mb-4">
                <div class="row">
                    <div class="col-12">
                        <small id="email-help" class="form-text text-muted field-name-hint" v-if="this.activeField == 'email'">Email</small>
                        <input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email" v-on:focus="setActive('email')" v-on:blur="removeActive('email')">
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

            <div class="form-group text-center">
              <button v-on:submit.prevent="processLogin" v-on:click.prevent="processLogin" class="btn btn-primary">Login</button>
            </div>
            <div class="form-group text-center">
            	Forgot your password? <router-link class="item" to="/password">Reset it</router-link>
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
      activeField: null,
      state: this.$store.state
    }
  },
  computed: {

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
                  setTimeout( function() { self.$router.push('/') }, 1000)
              }
          });
      } else {
          this.$store.state.msg = 'Email and Password are required fields';
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
