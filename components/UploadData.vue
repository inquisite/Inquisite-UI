<template>
	<div class="row">
		<div class="col-sm-6 offset-sm-3" v-if="(server_file_info === null) && !import_complete">
			<div class="card card-form">
				<div class="card-header text-center">
					Upload Data
		 		</div>
				<div class="card-body">
       				<p>Adding data to <em>{{activeRepo.name}}</em></p>

                    <flashmessage/>
				</div>
				<div class="card-body">
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
				<div class="card-body">
					<div class="teaser-container" v-if="is_uploading">
						<!--<p><i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_uploading"></i> Upload {{upload_progress}}% complete</p>-->
						<div class="progress">
							<div class="progress-bar" role="progressbar" :style="'width: ' + upload_step_pos + '%'" :aria-valuenow="upload_step_pos"></div>
						</div>
						<h6>{{upload_step}}</h6>
						<div class="progress">
							<div class="progress-bar" role="progressbar" :style="'width: ' + upload_pos + '%'" :aria-valuenow="upload_pos"></div>
						</div>
						<h6>{{upload_status}}</h6>
					</div>
				</div>
      		</div>
      	</div>
      	<div class="col-sm-12" v-if="(server_file_info !== null) && !import_complete">
      		<div class="card card-form">
      		    <div class="card-header text-center">
					Upload Data in <em>{{server_file_info.original_filename}}</em>
		 		</div>
				<div class="card-body">
					<div class="row">
						<div class="col-12">
							<h3>Displaying first rows from <em>{{server_file_info.original_filename}}</em></h3>
						</div>
      		        </div>
					<div class="row schemaForm">
						<div class="col-12 col-sm-8">
							<div class="form-group row rowInput">
								<label class="col-4 col-sm-2 col-form-label">Import as</label>
								<select name="import_info" class="col-7 col-sm-5" v-model="import_as" @change="updateDataMapping"><option v-for="(h,x) in data_types" :value="h.id">{{h.code}}</option></select>
							</div>
							<div class="form-group row rowInput" v-if="import_as < 0">
								<label class="col-4 col-sm-2 col-form-label">Name</label>
								<input class="col-7 col-sm-5" v-model="new_schema_name" placeholder="New Schema Name"/>
							</div>
							<h6>Recommended Schema: {{server_file_info.recommended_schema['name']}}</h6>
						</div>
						<div class="col-12 col-sm-4">
						</div>
      		        </div>
				</div>
				<div class="card-body basicStats">
					<div class="row">
						<div class="col-12 col-sm-6">
							<h5>Basic Statistics</h5>
							<strong>File Size</strong> {{filesizeInKB}} | <strong>Total Columns</strong> {{server_file_info.total_columns}} | <strong>Total Rows</strong> {{server_file_info.total_rows}}
						</div>
						<div class="col-12 col-sm-6">
							<div class="row">
								<div class="col-12">
		      		             	<button v-on:click.prevent="setImportForAllFields" class="pull-right btn btn-sm btn-primary">Create new fields for all unrecognized</button>
							 	</div>
							</div>
							<div class="row ">
								<div class="col-12 rowInput">
								 	<div class="pull-right"><input type="checkbox" v-model="ignore_rows"/>
								 	Ignore first <input type="type" size="4" v-model="ignore_first_rows" v-if="ignore_rows"/> row(s)</div>
								</div>
		      		        </div>
						</div>
					</div>
				</div>
				<div class="card-body" style="overflow: auto;">
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
						<div class="col-sm-1">
							<h6>Search Display?</h6>
						</div>
						<div class="col-sm-1">
							<h6>List Merge?</h6>
						</div>
					</div>
					<div v-for="(h,i) in server_file_info.preview.headers" class="row">
						<div class="col-sm-2 dataOutlineLabel">
							<h6>{{h}}</h6>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-primary statsButton titleEditButton" data-toggle="modal" :data-target="'#' + h.replace(/[\[\]]+/g, '').split(' ').join('_') + 'editTitle'"><i class="fa fa-edit"></i></button>
							<button type="button" class="btn btn-primary statsButton" data-toggle="modal" :data-target="'#' + h.replace(/[\[\]]+/g, '').split(' ').join('_') + 'Stats'">Statistics</button>

							<!--Stats Modal-->
							<div class="modal fade" :id="h.replace(/[\[\]]+/g, '').split(' ').join('_') + 'Stats'" tabindex="-1" role="dialog" aria-labelledby="Statistics" aria-hidden="true">
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
										<li v-if="displayStatistics[h]" v-for="(t, s) in displayStatistics[h]"><strong>{{s}}: </strong>{{t}}</li>
										<li v-if="displayStatistics[i]" v-for="(t, s) in displayStatistics[i]"><strong>{{s}}: </strong>{{t}}</li>
  									</ul>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							      </div>
							    </div>
							  </div>
							</div>

							<!--Edit Title Modal-->
							<div class="modal fade" :id="h.replace(/[\[\]]+/g, '').split(' ').join('_') + 'editTitle'" tabindex="-1" role="dialog" aria-labelledby="Edit Title and Description" aria-hidden="true">
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
							<select :name="'field_type_' + h" v-model="data_type_recommended[i]" :disabled="allowCustomNameType(i)">
								<option v-for="(t,k) in fieldDataTypes" :value="k">{{t.name}}</option>
							</select>
						</div>
						<div class="col-sm-1 columnSelect">
							<select v-model="search_result_include[i]" :name="'search_include_' + h"><option value="1">Yes</option><option value="0">No</option></select>
						</div>
						<div class="col-sm-1 columnSelect">
							<select v-model="allow_list_merge[i]" :name="'list_merge_' + h" :disabled="checkIfList(i)"><option value="1">Yes</option><option value="0">No</option></select>
						</div>
					</div>
					<div class="row">
						<div class="col-12 col-md-7">
							<div class="card-body">
								<div class="teaser-container" v-if="is_importing">
									<!--<p><i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_uploading"></i> Upload {{upload_progress}}% complete</p>-->
									<h3>Import Step</h3>
									<div class="progress">
										<div class="progress-bar" role="progressbar" :style="'width: ' + import_step_pos + '%'" :aria-valuenow="import_step_pos"></div>
									</div>
									<h6>{{import_step}}</h6>
									<h3>Status</h3>
									<div class="progress">
										<div class="progress-bar" role="progressbar" :style="'width: ' + import_pos + '%'" :aria-valuenow="import_pos" :aria-valuemax="server_file_info.total_rows"></div>
									</div>
									<h6>{{import_status}}</h6>
									<h3>Errors</h3>
									<div class="progress">
										<div class="progress-bar" role="progressbar" :style="'width: ' + error_pos + '%'" :aria-valuenow="error_pos" :aria-valuemax="server_file_info.total_rows"></div>
									</div>
									<h6>{{error_status}}</h6>
								</div>
								<!--<i class="fa fa-cog fa-spin fa-2x fa-fw" v-if="is_importing"></i>-->
							</div>
						</div>
						<div class="col-12 col-md-5">
							<div class="item pull-right" style="padding: 10px 0">
								<a v-on:click="togglePreview" class="btn btn-secondary">Preview Data</a>
								<button v-on:click.prevent="importData" class="btn btn-primary" :disabled="!canImport">Import</button>
		                        <a href="#" v-on:click.prevent="reset" class="btn btn-secondary">Cancel</a>
		                    </div>
						</div>
					</div>
					<div class="row containerBorder" v-show="display_preview">
						<div id="previewContainer" class="col-12">
		      		        <table>
		      		            <tr>
		                            <th v-for="(h,i) in server_file_info.preview.headers">{{h}}</th>
		      		            </tr>
		      		            <tr v-for="(r, c) in server_file_info.preview.data">
		      		                <td v-for="k,h in server_file_info.preview.headers" v-if="((!ignore_rows && (c >= 0)) || (ignore_rows && (c >= ignore_first_rows)))">
		      		                    {{r[h]}}{{r[k]}}
		      		                </td>
		      		            </tr>
		      		        </table>
						</div>
					</div>
      		    </div>
      		</div>
    	</div>

    	<div class="col-sm-12" v-if="import_complete">
    	    <div class="card card-form">
      		    <div class="card-header text-center">
					Upload Data in <em>{{server_file_info.original_filename}}</em>
		 		</div>
				<div class="card-body">
					<div class="row">
						<div class="col-12 col-sm-8">
      		        		<h3>Import from <em>{{server_file_info.original_filename}}</em> completed</h3>
						</div>
						<div class="col-12 col-sm-4">
							<div class="item pull-right">
		                      <button v-on:submit.prevent="reset" v-on:click.prevent="reset" class="btn btn-primary">Do another import</button>
		                    </div>
						</div>
					</div>


				</div>
				<div class="card-body">
					<div>
						<div class="row">
							<div class="col-12 col-sm-8">
		                        <h4>Import Results</h4>
								<h5>Imported {{import_results.counts.total}} {{import_results.counts.type}} Records | {{import_results.error_count}} Errors | {{ignore_first_rows}} Skipped | {{import_results.counts.source_total}} Total Rows</h5>
							</div>
							<div class="col-12 col-sm-4 text-right">
								<h4>View Data</h4>
								<router-link to="/visualize/maps">
					              <button type="button" class="btn btn-primary">Map</button>
					            </router-link>
								<router-link to="/visualize/sheets">
					              <button type="button" class="btn btn-primary">Sheet</button>
					            </router-link>
								<router-link to="/visualize/nodes">
					              <button type="button" class="btn btn-primary">Nodes</button>
					            </router-link>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-sm-6 resultChart">
								<div :is="current_chart" :data="result_chart_data" :options="{responsive: false, maintainAspectRatio: false, scales: {yAxes: [{display: true, ticks: {beginAtZero: true}}]}}" :height="400"></div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="row" v-if="import_results.error_count > 0">
									<div class="col-10">
										<h4>Errors ({{import_results.error_count}})</h4>
									</div>
							    	<div class="col-2">
										<button v-on:click.prevent="showErrors" class="btn btn-primary"><i class="fa fa-arrows-v"></i></button>
									</div>
								</div>
								<div class="row" v-else>
									<h4>No Errors</h4>
								</div>
								<div id="importErrorList" v-if="show_errors">
				      		        <div v-for="(errs, line) in importErrors">
				      		            Row {{line}}: {{errs}}
				      		        </div>
								</div>
							</div>
						</div>
                    </div>
      		    </div>
      		</div>
    	</div>
	</div>
</div>

</template>

<script>
import ImportResults from './charts/ImportResults.vue';

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
      ignore_first_rows: 1,

      import_results: null,

	  type_mapping: [],
	  field_description: [],
	  custom_field_title: [],
	  display_stats: [],
	  editable_field_names: [],
	  data_type_recommended: [],
	  search_result_include: [],
	  allow_list_merge: [],
	  mapping_options: {},
	  new_schema_name: null,
	  display_preview: false,
	  show_errors: false,
	  current_chart: null,
	  result_chart_data: null,

	  upload_pos: 0,
	  upload_status: '',
	  upload_step: '',
	  upload_step_pos: 0,
	  import_pos: 0,
	  import_status: '',
	  import_step: '',
	  import_step_pos: 0,
	  error_status: '',
	  error_pos: 0
    }
  },
  components: {
	  'result-chart': ImportResults
  },
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
	this.$store.dispatch('list/getListsForRepo', this.$store.getters['repos/getActiveRepoID']);
  },
  computed: {
    isLoggedIn: function() { return this.$store.getters.isLoggedIn; },
    data_types: function() {
        var t = this.$store.getters['schema/getDataTypes'];
        t.push({'id': -1, 'code': "< Create new type >"});
        return t;
    },
    fieldDataTypes: function() { return this.$store.getters['schema/getFieldDataTypeList']; },
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	lists: function() { return this.$store.getters['list/getListsForRepo']; },
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
		for(var j in stats){
			var quote_trim = new RegExp('^"|"$', "g");
			var clean_header = j.replace(quote_trim, "");
			stats[clean_header] = stats[j];
		}
		for(var i in this.server_file_info.preview.headers) {

			try{
				var column_type = stats[i]['type'];
			} catch(error) {
				var column_type = stats[this.server_file_info.preview.headers[i]]['type'];
			}
			if(column_type == 'Georeference'){
				this.data_type_recommended[i] = 'GeorefDataType';
			} else if(column_type == 'Date range'){
				this.data_type_recommended[i] = 'DateRangeDataType';
			} else {
				this.data_type_recommended[i] = column_type + 'DataType';
			}
		}
		return this.data_type_recommended;
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
		var types = [];
	    var data_types = this.data_types;
	    for(var i in this.server_file_info.preview.headers) {
			if (!opts[i]) { opts[i] = []; vals[i] = []; types[i] = []; }

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
					types[i].unshift(this.data_type_recommended[i])
					if(this.data_type_recommended[i] == 'ListDataType'){ this.allow_list_merge[i] = "0"; }
					break;
                } else if (parseInt(dt['id']) == parseInt(this.import_as)) {
                    // field for target type
                    for(var k in dt['fields']) {
						var fieldRegEx = new RegExp("[^A-Za-z0-9_]+", "g")
						if(dt['fields'][k]['code'] == this.server_file_info.preview.headers[i].replace(fieldRegEx, "_").toLowerCase()) {
                            allowCreateNew = false;
							opts[i].unshift(dt['fields'][k]['name'] + " (" + data_types[j]['name'] + ")");
                            vals[i].unshift(dt['fields'][k]['id']);
							types[i].unshift(dt['fields'][k]['type']);
							if(dt['fields'][k]['type'] == 'ListDataType'){
								var list_code = dt['fields'][k]['settings_list_code'];
								for(var l in this.lists){
									if(this.lists[l]['code'] == list_code){
										var list = this.lists[l];
										var allow_merge = list['merge_allowed'];
										if(!allow_merge){ allow_merge = "0"; }
										this.allow_list_merge[i] = allow_merge;
									}
								}
							}
							this.search_result_include[i] = dt['fields'][k]['settings_search_display'];
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

		this.mapping_options = {"options": opts, "values": vals}
		this.data_type_recommended = types.map(type => type[0]);
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
				self.upload_pos = p;
            }}).then(function(data) {
                if (data['filename']) { self.server_file_info = data; }
				self.is_uploading = false;
                //self.import_as = self.data_types[0]['id'];
				self.setRecommendedSchema();
				self.data_mapping = Array(self.server_file_info.preview.headers.length).fill(0);
				self.search_result_include = Array(self.server_file_info.preview.headers.length).fill(0);
				self.allow_list_merge = Array(self.server_file_info.preview.headers.length).fill(null);
				self.dataTypeRecommended;
				self.updateDataMapping();
				self.emptyFieldDescriptions();
            });

        }
		this.import_status = '';
		this.import_pos = 0;
		this.import_step = '';
		this.import_step_pos = 0;
		this.error_status = '';
		this.error_pos = 0;
    },
    importData: function() {
        var self = this;
        this.is_importing = true;
		var chartData = null;
		this.$store.dispatch('data/getDataCounts', {data: {repo_id: this.activeRepo.id}}).then(function(data){
			var labels = [];
			var dataCounts = [];
			for(var schema in data.data){
				labels.push(schema);
				dataCounts.push(data.data[schema]);
			}
			self.result_chart_data = {"labels": labels, "datasets": [{"label": "Pre-Import Data", "backgroundColor": "#1CB2C6", "data": dataCounts}]}
		});


		this.$store.dispatch('data/importData', {data: { repo_id: this.activeRepo.id, filename: this.server_file_info.filename, data_mapping: this.data_mapping.join("|"), type: this.import_as, ignore_first: this.ignore_first_rows, original_filename: this.server_file_info.original_filename, field_names: this.editable_field_names.join("|"), schema_name: this.new_schema_name, column_types: this.data_type_recommended.join("|"), field_descriptions: this.field_description.join("|"), field_search_display: this.search_result_include.join("|"), allow_list_merge: this.allow_list_merge.join("|") }}).then(function(data) {
            self.import_results = {
                "errors": data.errors,
                "error_count": data.error_count,
                "counts": data.counts,
                "fields_created": data.fields_created
            };
            self.is_importing = false;
            self.import_complete = true;

            self.$store.dispatch('people/getRepos', {});    // reload stats... TODO: break repo stats out into a single repo-specific call
			var postImportStats = self.$store.dispatch('data/getDataCounts', {data: {repo_id: self.activeRepo.id}}).then(function(data){
				var postData = {"label": "Post-Import Data", "backgroundColor": "#F79D59", "data": []}
				for(var schema in data.data){
					if(self.result_chart_data.labels.indexOf(schema) < 0){
						self.result_chart_data.labels.push(schema)
					}
					var dataPos = self.result_chart_data.labels.indexOf(schema);
					postData.data[dataPos] = data.data[schema];
				}
				self.result_chart_data.datasets.push(postData);
				self.current_chart = 'result-chart';
			});
			self.$store.dispatch('schema/getDataTypes', self.activeRepo.id);
        });
    },
    reset: function() {
        this.import_complete = false;
		this.allow_upload = false;
		this.is_uploading = false;
		this.is_importing = false;
		this.display_preview = false;
        this.upload_progress = 0;
        this.server_file_info = null;
		this.data_file = null;
		this.import_as = null;
		this.import_results = null;
		this.import_as = null;
		this.new_schema_name  = null;
        this.data_mapping = [];
		this.type_mapping = [];
		this.field_description = [];
		this.custom_field_title = [];
		this.display_stats = [];
		this.editable_field_names = [];
		this.data_type_recommended = [];
		this.search_result_include = [];
		this.allow_list_merge = [];
        this.ignore_rows = false;
        this.ignore_first_rows = 1;
  	  	this.mapping_options = {};
  	  	this.upload_pos = 0;
		this.upload_step_pos = 0;
		this.import_pos = 0;
		this.import_step_pos = 0;
		this.error_pos = 0;
  	  	this.upload_status = '';
		this.upload_step = '';
		this.import_status = '';
		this.import_step = '';
		this.error_status = '';
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

		if(this.custom_field_title[i] || this.custom_field_title[i] != ''){
			this.editable_field_names[i] = this.custom_field_title[i];
		} else {
			this.editable_field_names[i] = this.server_file_info.preview.headers[i];
		}
		var selectVal = h.replace(/[^A-Za-z0-9_\-]+/, "");
		var createIndex = this.mapping_options["values"][i].indexOf(selectVal);
		this.mapping_options["options"][i][createIndex] = "Create field " + this.editable_field_names[i]
		this.data_mapping[i] = this.mapping_options["values"][i][1];
		this.mappingOptions;
		this.$forceUpdate();
	},
	updateDataMapping: function(){
		this.mappingOptions;
		for(var i in this.mapping_options["values"]){
			this.data_mapping[i] = this.mapping_options["values"][i][1];
		}
	},
	setRecommendedSchema: function(){
		if(!this.server_file_info.recommended_schema){
			this.import_as = -1;
		} else {
			this.import_as = this.server_file_info.recommended_schema['id'];
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
	},
	checkIfList: function(i){
		if(this.data_type_recommended[i] == 'ListDataType'){
			return false;
		}
		return true;
	},
	togglePreview: function(){
		this.display_preview = !this.display_preview;
	},
	emptyFieldDescriptions: function(){
		for(var i in this.server_file_info.preview.headers){
			this.field_description[i] = null;
		}
	},
	showErrors: function(){
		this.show_errors = !this.show_errors;
	}
  },
  sockets: {
    upload_status: function(data){
		this.upload_pos = data.pos;
		this.upload_status = data.status;
    },
	upload_step: function(data){
		this.upload_step_pos = data.pos;
		this.upload_step = data.step;
	},
	import_status: function(data){
		this.import_pos = data.pos;
		this.import_status = data.status;
    },
	import_step: function(data){
		this.import_step_pos = data.pos;
		this.import_step = data.step;
	},
	error_status: function(data){
		this.error_pos = data.pos;
		this.error_status = data.status;
	}
  }
}
</script>
