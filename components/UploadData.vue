<template>
	<div class="row">
		<div class="col-sm-6 offset-sm-3" v-if="(server_file_info === null) && !import_complete">
			<div class="card card-form">
				<div class="card-header text-center">
					Upload Data
		 		</div>
				<div class="card-block">
       				<p>Adding data to <em>{{activeRepo.name}}</em></p>

                    <flashmessage/>
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
						<p><i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_uploading"></i> Upload {{upload_progress}}% complete</p>
						
					</div>
				</div>  
      		</div>
      	</div>
      	<div class="col-sm-12" v-if="(server_file_info !== null) && !import_complete">
      		<div class="card card-form">
      		    <div class="card-header text-center">
					Upload Data in <em>{{server_file_info.original_filename}}</em>
		 		</div>
				<div class="card-block">
      		        <div class="pull-right">
      		             <button v-on:click.prevent="setImportForAllFields" class="btn btn-sm">Create new fields for all unrecognized</button>
      		        </div>
      		        
      		        <h3>Displaying first rows from <em>{{server_file_info.original_filename}}</em></h3>
      		        Import as <select name="import_info" v-model="import_as"><option v-for="(h,x) in data_types" :value="h.id">{{h.code}}</option></select>
      		        <br/>
      		        Ignore first row <input type="checkbox" v-model="ignore_first_row"/>
      		        
      		        <div class="item" style="padding: 10px 0">
                        <button v-on:click.prevent="importData" class="btn btn-primary" :disabled="!canImport">Import</button>
                        <a href="#" class="btn btn-secondary">Cancel</a>
                        <i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_importing"></i>
                    </div>

          			<div id="data-msg" class="alert alert-info" role="alert" v-show="message !== ''">{{message}}</div>
				</div>
				<div class="card-block" style="overflow: auto;">
      		        <table>
      		            <tr>
                            <th v-for="(h,i) in server_file_info.preview.headers">{{h}}</th>
      		            </tr>
      		            <tr>
                            <th v-for="(h,i) in server_file_info.preview.headers">
                                <select :name="'import_info_' + h" v-model="data_mapping[i]"><option v-for="(h,x) in mappingOptions['options'][i]" :value="mappingOptions['values'][i][x]">{{h}}</option></select>
                            </th>
      		            </tr>
      		            <tr v-for="(r, c) in server_file_info.preview.data">
      		                <td v-for="d in r" v-if="!ignore_first_row || (c > 0)">
      		                    {{d}}
      		                </td>
      		            </tr>
      		        </table>
      		    </div>
      		</div>
    	</div>
    	
    	<div class="col-sm-12" v-if="import_complete">
    	    <div class="card card-form">
      		    <div class="card-header text-center">
					Upload Data in <em>{{server_file_info.original_filename}}</em>
		 		</div>
				<div class="card-block">
      		        <h3>Import from <em>{{server_file_info.original_filename}}</em> completed</h3>
      		        
      		        <div class="item" style="padding: 10px 0">
                      <button v-on:submit.prevent="reset" v-on:click.prevent="reset" class="btn btn-primary">Do another import</button>
                    </div>
				</div>
				<div class="card-block" style="overflow: auto;">
				    <h4>Errors ({{import_results.error_count}})</h4>
      		        <div v-for="(errs, line) in importErrors">
      		            Line {{line}}: {{errs}}
      		        </div>
      		        
      		        <div v-if="import_results.counts.length > 0">
                        <h4>Counts</h4>
                        <div v-for="(c, t) in import_results.counts">
                            {{t}}: {{c}} items
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
      state: this.$store.state,
      data_file: null,
      allow_upload: false,
      is_uploading: false,
      is_importing: false,
      import_complete: false,
      upload_progress: 0,
      
      server_file_info: null,
      
      data_mapping: [],
      import_as: null,
      ignore_first_row: false,
      
      import_results: null
    }
  },
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
  },
  computed: {
    isLoggedIn: function() { return this.$store.getters.isLoggedIn; },
    data_types: function() { return this.$store.getters['schema/getDataTypes']; },
    field_data_types: function() { this.$store.getters['schema/getFieldDataTypeList']; },
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	
	canImport: function() {
	    return this.data_mapping.filter(function(v) {
	        return v != 0;
	    }).length > 0;
	},
	
	mappingOptions: function() {
	    var opts = [];
	    var vals = [];
	    
	    //console.log("import as ", this.import_as);
	    var data_types = this.data_types;
	    for(var i in this.server_file_info.preview.headers) {
            if (!opts[i]) { opts[i] = []; vals[i] = [] }
            
            var allowCreateNew = true;
            for(var j in data_types) {
                var dt = data_types[j];
                
                var match_id = null;
                if (parseInt(dt['id']) == parseInt(this.import_as)) {
                    // field for target type
                    for(var k in dt['fields']) {
                        if((dt['fields'][k]['code'] == this.server_file_info.preview.headers[i]) || (dt['fields'][k]['code'] == this.server_file_info.preview.headers[i])) {
                            allowCreateNew = false;
                            match_id = dt['fields'][k]['id'];
                            //console.log("match", dt['fields'][k]['code'], match_id);
                        }
                        
                        var f = this.data_mapping.indexOf(dt['fields'][k]['id']);
                        if ((f === -1) || (parseInt(f) === parseInt(i))) {
                            opts[i].unshift(dt['fields'][k]['name'] + " (" + data_types[j]['name'] + ")");
                            vals[i].unshift(dt['fields'][k]['id']);
                        }
                    }
            
                    if (allowCreateNew) {
                        opts[i].unshift("Create field " + this.server_file_info.preview.headers[i] + " (" + data_types[j]['name'] + ")");
                        vals[i].unshift(this.server_file_info.preview.headers[i].replace(/[^A-Za-z0-9_\-]+/, ""));
                    } else if (match_id) {
                        this.data_mapping[i] = match_id;
                        console.log("set", i , match_id);
                    }
                } else {
                    // related type
                    for(var k in dt['fields']) {
                        var f = this.data_mapping.indexOf(dt['fields'][k]['id']);
                        if ((f === -1) || (parseInt(f) === parseInt(i))) {
                            opts[i].push(dt['fields'][k]['name'] + " (related " + data_types[j]['name'] + ")");
                            vals[i].push(dt['fields'][k]['id']);
                        }
                    }
                }   
            }
            
            opts[i].unshift("Do not import");
            vals[i].unshift(0);
	    }
	    console.log("map", this.data_mapping);
	    return {"options": opts, "values": vals};
	},
	importErrors: function() {
	    if (!this.import_complete) { return []; }
	    
	    return _.mapValues(this.import_results.errors, function(v, k, o) { return v.join("; ") });
	}
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
                 
                self.import_as = self.data_types[0]['id'];
                self.data_mapping = Array(self.server_file_info.preview.headers.length).fill(0);
            });
        }
    },
    importData: function() {
        console.log("IMPORT", this.data_mapping);
        
        var self = this;
        this.is_importing = true;
        this.$store.dispatch('data/importData', {data: { repo_id: this.activeRepo.id, filename: this.server_file_info.filename, data_mapping: this.data_mapping.join("|"), type: this.import_as }}).then(function(data) {
            console.log("IMPORTED", data);
            
            self.import_results = {
                "errors": data.errors,
                "error_count": data.error_count,
                "counts": data.counts,
                "fields_created": data.fields_created
            };
            self.is_importing = false;
            self.import_complete = true;
            
            self.$store.dispatch('people/getRepos', {});    // reload stats... TODO: break repo stats out into a single repo-specific call
        });
    },
    reset: function() {
        this.import_complete = this.allow_upload = this.is_uploading = this.is_importing = false;
        this.upload_progress = 0;
        this.server_file_info = this.data_file = this.import_as = this.import_results = null;
        this.data_mapping = [];
    },
    setImportForAllFields: function() {
        for(var i in this.server_file_info.preview.headers) {
            if (!this.data_mapping[i]) {
                this.$set(this.data_mapping, i, this.mappingOptions['values'][i][1]);
            }
        }
        this.mappingOptions;
    }
  } 
  
}
</script>