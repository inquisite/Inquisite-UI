
// hmmm
window.addEventListener('load', function() {

  var app = new Vue({
    el: '#app',
    data: {
      name: '',
      email: '',
      location: '',
      tagline: '',
      url: '',
      password: ''
    },
    methods: {
      processSignup: function() {
        console.log('in processSignup ...');
        console.log( 'name: ' + this.name );

        jQuery.ajax({
          type: "POST",
          url: 'http://localhost:5000/people/add',
          crossDomain: true,
          data: {
            name: this.name, // string
            email: this.email, // regex
            location: this.location,
            tagline: this.tagline, // string
            url: this.url, // regex
            password: this.password // string (regex)
          },
          success: function(data, textStatus, jqXHR) {
            console.log('success');

            console.log('data');
            console.log(data);
          }
        })

      }
    }
  })

})
