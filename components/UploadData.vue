<template>
	<div class="row">
		<div class="col-sm-6 offset-sm-3">
			<div class="card card-form">
				<div class="card-header text-center">
					Upload Data
		 		</div>
				<div class="card-block">
       				<p>Adding data to {{activeRepo.name}}</p>

          			<div id="data-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
				</div>
				<div class="card-block">
          			<form id="signup-form" name="signup-form" method="POST" action="">            
						<div class="form-group row">
							<label for="name" class="col-2 col-form-label">File</label>
							<div class="col-10">
								<input type="file" class="form-control" id="datafile" name="datafile" placeholder="Data File" @change="onFileChange">
								<small id="fileHelp" class="form-text text-muted">Select a data file and the upload will begin automatically.</small>
							</div>
						</div>

            <!--<div class="item" style="padding: 10px 0">
              <button v-on:submit.prevent="processData" v-on:click.prevent="processData" class="btn btn-primary">Submit</button>
            </div>-->
					</form>
				</div>
				<div class="card-block">
					<div id="teaser-container" v-if="uploadRowCount">
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

export default { 
  name: 'upload-data',
  data: function() {
    return {
      state: this.$store.state
    }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	message: function() { return this.$store.state.msg; },
	repos: function() { return this.$store.state.user.repos; },
	user: function() { return this.$store.state.user; },
	activeRepo: function() { return this.$store.state.active_repo; },
	uploadRowCount: function() { return this.$store.state.upload_row_count; },
	uploadFields: function() { return this.$store.state.upload_fields; },
	uploadSubfields: function() { return this.$store.state.upload_subfields; },
   
  }, 
  methods: {
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;

      if(!files.length)
        return;
 
      this.processData(files[0]);
    },
    processData: function(repo_data) {
      this.$store.dispatch('uploadRepoData', {token: this.$store.state.token, form: { repo_file: repo_data, repo_id: this.$store.state.active_repo.id }});
    }
  } 
  
}
</script>