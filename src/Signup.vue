<template>
<div id="signup">
  <div class="ui grid">
    <div class="sixteen wide column">
      <h1>Signup with Inquisite</h1>
    </div>
  </div>

  <div class="ui section divider"></div>

  <div class="ui grid">
    <div class="eight wide column">
      <div class="ui raised segment">
        <div class="ui large list">

          <form id="signup-form" name="signup-form" method="POST" action="">

            <div id="signup-msg" class="ui msessage" style="display: none;">
              <div class="header"></div>
              <div class="msg"></div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="email" name="email" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="location" name="location" placeholder="Location" v-model="location">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="tagline" name="tagline" placeholder="Tagline" v-model="tagline">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="url" name="url" placeholder="URL" v-model="url">
              </div>
            </div>

            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="password" id="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="ui primary button">Submit</button>
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
  name: 'home',
  data: function() {
    return {
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      password: '',
      api_endpoint: ''
    }
  },
  created: function() {
    this.$http.get('/inqusite-local-config.json').then(function(response) {
      this.api_endpoint = response.data.api_endpoint;
    }, function(response) {
      console.log('there was an error');
    });
  },
  methods: {
    processSignup: function() {

      var self = this;

      jQuery.ajax({
        type: "POST",
        url: self.api_endpoint + "/people/add",
        crossDomain: true,
        data: {
          name: this.name,
          email: this.email,
          location: this.location,
          tagline: this.tagline,
          url: this.url,
          password: this.password
        },
        success: function(data, textStatus, jqXHR) {
          if("ok" == data.status) {

            jQuery('#signup-msg').addClass('success');
            jQuery('#signup-msg .header').html('Success!');
            jQuery('#signup-msg .msg').html(data.msg);

            var self = this;
            setTimeout( function() { self.$root.$options.router.push('login') }, 6000);

          } else {
            jQuery('#signup-msg').addClass('error');
            jQuery('#signup-msg .header').html('There was a problem');
            jQuery('#signup-msg .msg').html(data.msg);
          }          
 
          jQuery('#signup-msg').show();
        }
      })
    }
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
