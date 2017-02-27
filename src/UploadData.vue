<template>
<div id="upload-data">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Upload Data</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="panel">
        <div class="panel-body">
       
          <form id="signup-form" name="signup-form" method="POST" action="">
            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processSignup" v-on:click.prevent="processSignup" class="btn btn-primary">Submit</button>
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
