<template>
<div id="upload-data">
  <div class="ui grid">
    <div class="sixteen wide column">
      <h1>Upload Data</h1>
    </div>
  </div>

  <div class="ui section divider"></div>

  <div class="ui grid">
    <div class="eight wide column">
      <div class="ui raised segment">
        <div class="ui large list">
       
          <form id="signup-form" name="signup-form" method="POST" action="">
            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" id="name" name="name" placeholder="Name" v-model="name">
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
  name: 'upload-data',
  data: function() {
    return {
      name: '',
          }
  },
  methods: {
    processData: function() {

      jQuery.ajax({
        type: "POST",
        url: "http://localhost:5000/data/",
        crossDomain: true,
        data: {
          name: this.name,
        },
        success: function(data, textStatus, jqXHR) {
          console.log('success');
          console.log('data');
          console.log(data);
        }
      })
    }
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
