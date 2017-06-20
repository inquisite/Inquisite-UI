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
      <div class="card">
        <div class="card-block">
       
          <p>Adding data to {{activeRepo.name}} - Select a data file and the upload will begin automatically</p>

          <div id="data-msg" class="alert alert-warning" role="alert" v-show="message !== ''">{{message}}</div>

          <form id="signup-form" name="signup-form" method="POST" action="">
            <div class="item form-item">
              <div class="ui fluid input content">
                <input type="file" class="form-control" id="datafile" name="datafile" placeholder="Data File" @change="onFileChange">
              </div>
            </div>

            <!--<div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processData" v-on:click.prevent="processData" class="btn btn-primary">Submit</button>
            </div>-->

          </form>

          <div id="teaser-container">
            <p>Uploading {{uploadRowCount}} rows</p>
            <div>Fields: 
              <span class="label label-primary" style="display: inline-block; font-size: 14px; margin: 1%"  v-for="field in uploadFields">{{field}}</span>
            </div>
            <div>Nested Fields:
              <span class="label label-info" style="display: inline-block; font-size: 14px; margin: 1%" v-for="subfield in uploadSubfields">{{subfield}}</span>
            </div>

          </div>


        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>

import store from './store.js'

export default { 
  name: 'upload-data',
  data: function() {
    return {
      state: store.state
    }
  },
  computed: {
    isLoggedIn: function() {
	    return store.getters.isLoggedIn;
	},
	message: function() { return store.state.msg; },
	repos: function() { return store.state.user.repos; },
	user: function() { return store.state.user; },
	activeRepo: function() { return store.state.active_repo; },
	uploadRowCount: function() { return store.state.upload_row_count; },
	uploadFields: function() { return store.state.upload_fields; },
	uploadSubfields: function() { return store.state.upload_subfields; },
   
  }, 
  methods: {
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;

      if(!files.length)
        return;
 
      this.processData(files[0]);
    },
    processData: function(repo_data) {
      store.dispatch('uploadRepoData', {token: store.state.token, form: { repo_file: repo_data, repo_id: store.state.active_repo.id }});
    }
  } 
  
}
</script>