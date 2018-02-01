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
					<div class="row">
						<div class="col-6">
							<h3>Displaying first rows from <em>{{server_file_info.original_filename}}</em></h3>
						</div>
						<div class="col-6">
							<div class="pull-right">
		      		             <button v-on:click.prevent="setImportForAllFields" class="btn btn-sm">Create new fields for all unrecognized</button>
		      		        </div>
						</div>
      		        </div>
					<div class="row">
						<div class="col-6">
							<div class="form-group row">
								<label class="col-3 col-form-label">Import as</label>
								<select name="import_info" v-model="import_as" @change="updateDataMapping"><option v-for="(h,x) in data_types" :value="h.id">{{h.code}}</option></select>
							</div>
							<div class="form-group row" v-if="import_as < 0">
								<label class="col-3 col-form-label">Name</label>
								<input v-model="new_schema_name" placeholder="New Schema Name"/>
							</div>
						</div>
						<div class="col-6">
							<div class="pull-right">
		                            <input type="checkbox" v-model="ignore_rows"/>
		                            Ignore first <input type="type" size="4" v-model="ignore_first_rows" v-if="ignore_rows"/> row(s)
		                    </div>
						</div>
      		        </div>
      		        <div class="item" style="padding: 10px 0">
                        <button v-on:click.prevent="importData" class="btn btn-primary" :disabled="!canImport">Import</button>
                        <a href="#" class="btn btn-secondary">Cancel</a>
                        <i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_importing"></i>
                    </div>
				</div>
				<div class="card-block basicStats">
					<h5>Basic Statistics</h5>
					<p><strong>File Size</strong> {{filesizeInKB}}</p>
					<p><strong>Total Columns</strong> {{server_file_info.total_columns}}</p>
					<p><strong>Total Rows</strong> {{server_file_info.total_rows}}</p>
				</div>
				<div class="card-block" style="overflow: auto;">
					<div class="row">
						<div class="col-sm-2">
							<h6>Column Title</h6>
						</div>
						<div class="col-sm-2"></div>
						<div class="col-sm-3">
							<h6>Import Field</h6>
						</div>
						<div class="col-sm-2">
							<h6>Data Type</h6>
						</div>
					</div>
					<div v-for="(h,i) in server_file_info.preview.headers" class="row">
						<div class="col-sm-2">
							<h6>{{h}}</h6>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-primary statsButton titleEditButton" data-toggle="modal" :data-target="'#' + h + 'editTitle'"><i class="fa fa-edit"></i></button>
							<button type="button" class="btn btn-primary statsButton" data-toggle="modal" :data-target="'#' + h + 'Stats'">Statistics</button>

							<!--Stats Modal-->
							<div class="modal fade" :id="h + 'Stats'" tabindex="-1" role="dialog" aria-labelledby="Statistics" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">{{h}} Stats</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
									  <ul>
										<li v-for="(t, s) in displayStatistics[h]"><strong>{{s}}: </strong>{{t}}</li>
  									</ul>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							      </div>
							    </div>
							  </div>
							</div>

							<!--Edit Title Modal-->
							<div class="modal fade" :id="h + 'editTitle'" tabindex="-1" role="dialog" aria-labelledby="Edit Title and Description" aria-hidden="true">
								<div class="modal-dialog" role="document">
							  		<div class="modal-content">
							      		<div class="modal-header">
							        		<h5 class="modal-title" id="exampleModalLabel">Edit Label &amp; Description for {{h}}</h5>
							        		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          			<span aria-hidden="true">&times;</span>
							        		</button>
							      		</div>
							      		<div class="modal-body">
											<div class="form-group row">
												<label :for="h + 'customTitle'" class="col-3 col-form-label">Field Title</label>
												<input :id="h + 'customTitle'" v-model="custom_field_title[i]" :placeholder="h" class="col-8" :disabled="allowCustomNameType(i)">
											</div>
											<div class="form-group row">
												<label :for="h + 'fieldDescription'" class="col-3 col-form-label">Field Description</label>
												<textarea :id="h + 'fieldDescription'" v-model="field_description[i]" placeholder="Description For Field" class="col-8"></textarea>
											</div>
							      		</div>
							      		<div class="modal-footer">
											<button v-on:click="updateFieldNames(h, i)" class="btn btn-primary" data-dismiss="modal">Update</button>
							        		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							      		</div>
							    	</div>
							  	</div>
							</div>
						</div>
						<div class="col-sm-3 columnSelect">
							<select :name="'import_info_' + h" v-model="data_mapping[i]"><option v-for="(h,x) in mappingOptions['options'][i]" :value="mappingOptions['values'][i][x]">{{h}}</option></select>
						</div>
						<div class="col-sm-2 columnSelect">
							<select :name="'field_type_' + h" v-model="dataTypeRecommended[h]" :disabled="allowCustomNameType(i)">
								<option v-for="(t,k) in fieldDataTypes" :value="k">{{t.name}}</option>
							</select>
						</div>
					</div>
      		        <table>
      		            <tr>
                            <th v-for="(h,i) in server_file_info.preview.headers">{{h}}</th>
      		            </tr>
      		            <tr v-for="(r, c) in server_file_info.preview.data">
      		                <td v-for="k,h in server_file_info.preview.headers" v-if="((!ignore_rows && (c >= 0)) || (ignore_rows && (c > ignore_first_rows)))">
      		                    {{r[k]}}
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
      ignore_rows: false,
      ignore_first_rows: 0,

      import_results: null,

	  type_mapping: [],
	  field_description: [],
	  custom_field_title: [],
	  display_stats: [],
	  editable_field_names: [],
	  mapping_options: {},
	  new_schema_name: null
    }
  },
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
  },
  computed: {
    isLoggedIn: function() { return this.$store.getters.isLoggedIn; },
    data_types: function() {
        var t = this.$store.getters['schema/getDataTypes'];
		console.log("xxx", t);
        t.push({'id': -1, 'code': "< Create new type >"});
        return t;
    },
    fieldDataTypes: function() { return this.$store.getters['schema/getFieldDataTypeList']; },
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },

	canImport: function() {
	    return this.data_mapping.filter(function(v) {
	        return v != 0;
	    }).length > 0;
	},
	filesizeInKB: function(){
		var bytes = this.server_file_info.filesize;
		var kb = (bytes/1000).toFixed(2);
		return kb + ' kB';
	},
	dataTypeRecommended: function(){
		var stats = this.server_file_info.column_stats;
		for(var stat in stats){
			if(stats[stat]['type'] == 'Georeference'){
				this.type_mapping[stat] = 'GeorefDataType';
			} else if(stats[stat]['type'] == 'Date range'){
				this.type_mapping[stat] = 'DateRangeDataType';
			} else {
				this.type_mapping[stat] = stats[stat]['type'] + 'DataType';
			}
		}
		return this.type_mapping;
	},
	displayStatistics: function(){
		var stats = this.server_file_info.column_stats;
		var statDisplay = {};
		for(var statCont in stats){
			var rowStats = stats[statCont];
			statDisplay[statCont] = {};
			for(var stat in rowStats){
				if(["type", "value_array"].indexOf(stat) >= 0){
					continue;
				} else if(stat == "frequent_values"){
					var freqStrings = [];
					for(var val in rowStats[stat]){
						freqStrings.push(rowStats[stat][val][0] + ": " + rowStats[stat][val][1]);
					}
					statDisplay[statCont]["Frequent Values"] = freqStrings.join(", ");
					continue;
				}
				statDisplay[statCont][stat] = rowStats[stat];
			}
		}
		return statDisplay;
	},
	mappingOptions: function() {
	    var opts = [];
	    var vals = [];
	    var data_types = this.data_types;
	    for(var i in this.server_file_info.preview.headers) {
			if (!opts[i]) { opts[i] = []; vals[i] = [] }

            var allowCreateNew = true;
            for(var j in data_types) {
                var dt = data_types[j];

                var match_id = null;
                if (this.import_as < 0) {
					var optionName = '';
					var optionVal = '';
					if(!this.editable_field_names[i]){
						this.editable_field_names[i] = this.server_file_info.preview.headers[i];
						optionName = this.server_file_info.preview.headers[i];
						optionVal = this.server_file_info.preview.headers[i].replace(/[^A-Za-z0-9_\-]+/, "")
					} else {
						optionName = this.editable_field_names[i];
						optionVal = this.editable_field_names[i].replace(/[^A-Za-z0-9_\-]+/, "")
					}
					opts[i].unshift("Create field " + optionName);
                    vals[i].unshift(optionVal);
                } else if (parseInt(dt['id']) == parseInt(this.import_as)) {
                    // field for target type
                    for(var k in dt['fields']) {
                        if(dt['fields'][k]['code'] == this.server_file_info.preview.headers[i]) {
                            allowCreateNew = false;
							opts[i].unshift(dt['fields'][k]['name'] + " (" + data_types[j]['name'] + ")");
                            vals[i].unshift(dt['fields'][k]['id']);
                        }
                    }

                    if (allowCreateNew) {
						var optionName = '';
						var optionVal = '';
						if(!this.editable_field_names[i]){
							this.editable_field_names[i] = this.server_file_info.preview.headers[i];
							optionName = this.server_file_info.preview.headers[i];
							optionVal = this.server_file_info.preview.headers[i].replace(/[^A-Za-z0-9_\-]+/, "")
						} else {
							optionName = this.editable_field_names[i];
							optionVal = this.editable_field_names[i].replace(/[^A-Za-z0-9_\-]+/, "")
						}
						opts[i].unshift("Create field " + optionName);
	                    vals[i].unshift(optionVal);
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
		this.mapping_options = {"options": opts, "values": vals}
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
				self.updateDataMapping();
            });
        }
    },
    importData: function() {
        var self = this;
        this.is_importing = true;
		console.log(this.data_mapping);
        this.$store.dispatch('data/importData', {data: { repo_id: this.activeRepo.id, filename: this.server_file_info.filename, data_mapping: this.data_mapping.join("|"), type: this.import_as, ignore_first: this.ignore_first_rows, original_filename: this.server_file_info.original_filename, field_names: this.editable_field_names }}).then(function(data) {
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
    },
	updateFieldNames: function(h, i){
		if(this.editable_field_names[i]){
			this.editable_field_names[i] = this.custom_field_title[i];
			var selectVal = h.replace(/[^A-Za-z0-9_\-]+/, "");
			var createIndex = this.mapping_options["values"][i].indexOf(selectVal);
			this.mapping_options["options"][i][createIndex] = "Create field " + this.custom_field_title[i];
			this.data_mapping[i] = this.mapping_options["values"][i][1];
			this.mappingOptions;
			this.$forceUpdate();
		}
	},
	updateDataMapping: function(){
		this.mappingOptions;
		for(var i in this.mapping_options["values"]){
			this.data_mapping[i] = this.mapping_options["values"][i][1];
		}
	},
	allowCustomNameType: function(i){
		if(this.data_mapping[i] == 0){ return true; }
		for(var j in this.data_types) {
			for(var k in this.data_types[j]['fields']){
				if(this.data_types[j]['fields'][k]['id'] == this.data_mapping[i]){
					return true;
				}
			}
		}
		return false;
	}
  }
}
</script>
