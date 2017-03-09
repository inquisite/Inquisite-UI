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
       
          <p>Adding data to {{sharedState.active_repo.name}}</p>

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

          <div id="teaser-container" v-show="sharedState.teaser !== ''">
            {{sharedState.teaser}}
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
      sharedState: store.state,
    }
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

<style>
.form-item { padding: 5px 0; }
</style>
