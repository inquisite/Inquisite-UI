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

          <form id="password-form" name="password-form" method="POST" action="">

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
    sendReset: function() {
      if( this.email !== '') {
          this.$store.dispatch("sendPasswordReset", this.email)
      } else {
          this.$store.state.msg = 'Email is required';
      }

    }
  }
} 
</script>