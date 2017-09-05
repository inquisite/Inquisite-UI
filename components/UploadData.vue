<template>
	<div class="row">
		<div class="col-sm-6 offset-sm-3" v-if="server_file_info === null">
			<div class="card card-form">
				<div class="card-header text-center">
					Upload Data
		 		</div>
				<div class="card-block">
       				<p>Adding data to <em>{{activeRepo.name}}</em></p>

          			<div id="data-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
				</div>
				<div class="card-block">
          			<form id="signup-form" name="signup-form" method="POST" action="">            
						<div class="form-group row">
							<label for="name" class="col-2 col-form-label">File</label>
							<div class="col-10">
								<input type="file" class="form-control" id="datafile" name="datafile" placeholder="Data File" @change="onFileChange">
								<small id="fileHelp" class="form-text text-muted">Select a data file to upload to your repository.</small>
							</div>
						</div>

                        <div class="item" style="padding: 10px 0">
                          <button v-on:submit.prevent="processData" v-on:click.prevent="processData" :disabled="!allow_upload" class="btn btn-primary">Submit</button>
                        </div>
					</form>
				</div>
				<div class="card-block">
					<div id="teaser-container" v-if="is_uploading">
						<p>Upload {{upload_progress}}% complete</p>
						
					</div>
				</div>  
      		</div>
      	</div>
      	<div class="col-sm-12" v-if="server_file_info !== null">
      		<div class="card card-form">
      		    <div class="card-header text-center">
					Upload Data in <em>{{server_file_info.original_filename}}</em>
		 		</div>
				<div class="card-block">
       				<p>Adding data to <em>{{activeRepo.name}}</em></p>

          			<div id="data-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
				</div>
				<div class="card-block">
      		        <h2>Preview goes here</h2>
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
      state: this.$store.state,
      data_file: null,
      allow_upload: false,
      is_uploading: false,
      upload_progress: 0,
      
      server_file_info: null
    }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	message: function() { return this.$store.state.msg; },
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	uploadRowCount: function() { return this.$store.getters['data/getUploadRowCount']; },
	uploadFields: function() { return this.$store.getters['data/getUploadFields']; },
	uploadSubfields: function() { return this.$store.getters['data/getUploadSubfields']; },
   
  }, 
  methods: {
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;

      if(!files.length)
        return;
      this.data_file = files[0];
      this.allow_upload = true;
    },
    processData: function(repo_data) {
        var self = this;
        if(this.data_file) {
            this.is_uploading = true;
            this.$store.dispatch('data/uploadData', {form: { data_file: this.data_file, repo_id: this.activeRepo.id }, progressCallback: function(p) {
                self.upload_progress = p;
            }}).then(function(data) {
                if (data['filename']) { self.server_file_info = data; }
                 self.is_uploading = false;
            });
        }
    }
  } 
  
}
</script>