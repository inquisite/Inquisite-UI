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

          <form id="password-form" name="password-form" method="POST" action="" v-if="!sentReset">

            <div id="password-msg" class="ui message" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="form-group row">
				<label for="email" class="col-2 col-form-label">Email</label>
				<div class="col-10">
					<input type="text" class="form-control" id="email" name="email" placeholder="Email" v-model="email">
				</div>
			</div>
			
            
            <div class="form-group text-center">
              <button v-on:submit.prevent="sendReset" v-on:click.prevent="sendReset" class="btn btn-primary">Reset</button>
            </div>
            <div class="form-group text-center">
            	Don't have a login? <router-link class="item" to="/signup">Sign up</router-link>
            </div>

          </form>
          <div v-if="sentReset">
            <h2>An email has been sent with instructions on how to change your password</h2>
            If you do not receive this email within 30 minutes contact support@inquisite.org for assistance
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
      sentReset: false
    }
  },
  computed: {
  
  },
  methods: {
    sendReset: function() {
      var self = this;
      if( this.email !== '') {
          this.$store.dispatch("sendPasswordReset", this.email).then(function(response) {
            self.sentReset = true;
          });
      } else {
          this.$store.dispatch('setMessage',  'Email address is required');
      }

    }
  }
} 
</script>