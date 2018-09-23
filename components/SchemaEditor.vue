<template>
<div id="schema-editor">
    <div class="row">
	    <div class="col-sm-12">
	    	<flashmessage/>
	    </div>
	</div>
	<div class="row" v-if="!editorDataTypeIndex">
	    <div class="col-sm-12 col-md-10 offset-md-1">
			<div class="row">
		        <div class="col-sm-6">
                    <h2>Data Types</h2>
                </div>
                <div class="col-sm-6 text-right">
                    <div><a @click="addDataType" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> New data type</a></div>
                </div>

            </div>
            <div class="row">
                <div class="col-12">
                    <hr/>
                </div>
            </div>
            <div id="data-types">
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-lg-4" v-for="dataType, i in dataTypes">
                        <div class="card type-card" v-bind:class="[checkGreen(i)]">
                            <div class="card-header">
                                <h4>{{dataType.name}} (<em>{{dataType.code}}</em>)</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <p>{{dataType.description | truncateDescription}}</p>
                                    </div>
                                </div>
                                <div class="row schema-bottom-info">
                                    <div class="col-12">

                                        <p><strong>{{dataType.fields.length}} Fields | {{dataType.data_count}} Records</strong></p>
                                    </div>
                                    <div class="col-12">
                                        <a @click="editDataType(dataType.id)" class="btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                                        <router-link :to="{path: '/export-data/' + activeRepoID + '/' + dataType.id}">
                                            <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-download" aria-hidden="true"></i> Export</button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
    </div>
    <div class="row" v-if="editorDataTypeIndex !== null">
    	<div class="col-12 col-sm-10 offset-sm-1">
    		<div class="pull-right">
    			<button v-on:submit.prevent="saveDataType" v-on:click.prevent="saveDataType" class="btn btn-primary btn-orange" :disabled="dataTypeNameError || dataTypeCodeError">Save</button>&nbsp;&nbsp;
                <click-confirm placement="left" style="display:inline;">
                    <button v-on:click.prevent="deleteDataType(formContent.id)" class="btn btn-danger">Delete</button>
                </click-confirm>
    			<button v-on:click="cancelDataTypeEdit" class="btn btn-cancel">Back</button>
            </div>
            <H1 v-if="showHeader == 'add'">Add new data type</H1>
    		<H1 v-if="showHeader == 'edit'">Editing data type: <em>{{editItem.name}}</em></H1>
            <div class="row">
                <div class="col-12">
                    <hr/>
                </div>
            </div>
    		<form id="schemaEditor-form" name="addRepo-form" method="POST" action="#">
            <div class="row">
                <div class="col-sm-8" v-if="(editorDataTypeIndex !== null) && (editorDataTypeIndex >= 0)">
                    <div class="row">
                        <div class="col-8">
                            <h4>Fields <a href="#" data-toggle="modal" data-target="#color-guide-modal"><i class="fa fa-info-circle"></i></a></h4>
                        </div>
                        <div class="col-4 text-right">
                            <a @click="addDataTypeField" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New Field</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center" v-if="!formContent.fields || (formContent.fields.length == 0)">
                            <p>No fields defined</p>
                        </div>
                        <div class="col-12 list-group-scroll">
                            <div class="row">
                                <div class="col-xs-6 col-sm-4" v-for="f, i in formContent.fields" v-if="formContent.fields && (formContent.fields.length > 0)">
                                    <div class="card schema-field-card" v-bind:class="typeCheck(f.type)">
                                        <button class="model-open-overlay text-center" data-toggle="modal" data-target="#edit-field-modal" v-on:click.prevent="setModalData(f, i)">
                                            <h5><i class="fa fa-pencil" aria-hidden="true"></i> Edit Field</h5>
                                        </button>
                                        <div class="card-header schema-field-card-head">
                                            <div v-if="!f.id" class="btn btn-danger btn-sm">NEW</div>
                                            <span v-if="f.name"><strong>{{f.name}}</strong></span>
                                        </div>
                						<div class="card-body schema-field-card-body">
                                            <div class="row">
                                                <div class="col-12">
                                                    <small>{{f.description}}<span v-if="!f.description"><em>No Description</em></span></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div><!-- end col -->
            	<div v-bind:class="((editorDataTypeIndex !== null) && (editorDataTypeIndex < 0)) ? 'col-sm-6 offset-sm-3' : 'col-sm-4'">
					<div class="card card-form">
						<div class="card-header text-center">Basic Information</div>
						<div class="card-body">

								<div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<label for="name" class="form-label">Name</label>
											<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="formContent.name" v-on:input="validateDataTypeInfo(editorDataTypeIndex)" v-bind:class="{'is-invalid': dataTypeNameError}">
                                            <div class="invalid-feedback">{{dataTypeNameError}}</div>
                                        </div>
									</div>
                                </div>
                                <div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<label for="code" class="form-label">Code</label>
											<input type="text" class="form-control" id="code" name="code" placeholder="Code" v-model="formContent.code" readonly v-bind:class="{'is-invalid': dataTypeCodeError}">
                                            <div class="invalid-feedback">{{dataTypeCodeError}}</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<label for="description" class="form-label">Description</label>
											<textarea class="form-control" rows="3" cols="80" v-model="formContent.description"></textarea>
										</div>
									</div>
								</div>
						 </div><!-- end card-body -->
					</div><!-- end card -->
				</div><!-- end col -->
			</div><!-- end row -->
        </form>
	    </div><!-- end col -->
        <div v-if="currentField">
            <div class="modal fade" id="edit-field-modal" tabindex="-1" role="dialog" aria-labelledby="edit-field-label" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="edit-field-label">Edit Field {{currentField.name}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" :id="'field' + currentField.id">
                        <div class="row">
                          <div class="col-sm-4">
                              <div class="form-group">
                                  <label for="name" class="form-label">Name</label>
                                  <input type="text" class="form-control" :id="'field_' + currentField.code" :name="'field_' + currentField.code" placeholder="Name" v-model="currentField.name" v-on:input="validateNameChange()" v-bind:class="{'is-invalid': fieldNameError}">
                                  <div class="invalid-feedback">{{fieldNameError}}</div>
                              </div>
                          </div>
                          <div class="col-sm-4">
                              <div class="form-group">
                                  <label for="code" class="form-label">Code</label>
                                  <input type="text" class="form-control" :id="'field_' + currentField.code" :name="'field_' + currentField.code" placeholder="Code" v-model="currentField.code" readonly v-bind:class="{'is-invalid': fieldCodeError}">
                                  <div class="invalid-feedback">{{fieldCodeError}}</div>
                              </div>
                          </div>
                          <div class="col-sm-4">
                              <div class="form-group">
                                  <label for="type" class="form-label">Type</label>
                                  <select v-model="currentField.type" class="custom-select form-control">
                                      <option v-for="t,k in fieldDataTypes" :value="k" :disabled="currentField.has_data">{{t.name}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-12">
                              <div class="form-group">
                                  <label for="description" class="form-label">Description</label>
                                  <textarea type="text" class="form-control" rows="3" :id="'field_' + currentField.code" :name="'field_' + currentField.code" placeholder="Description" v-model="currentField.description"></textarea>
                              </div>
                          </div>
                      </div>
                      <div v-if="fieldAlert" class="row">
                          <div class="col-sm-12">
                              <div class="alert alert-danger">
                                  {{fieldAlert}}
                              </div>
                          </div>
                      </div>
                      <div class="row" v-if="fieldDataTypes[currentField.type] && fieldDataTypes[currentField.type]['order']">
                          <div class="col-sm-12">
                              <div class="form-group">
                                  <label for="description" class="form-label">Settings</label>
                                  <div v-for="t in getFieldDataTypeSettingsForDisplay(currentField.type)">
                                      <div class="form-group row">
                                          <label :for="'settings_' + t.label" class="col-sm-3 col-formlabel">{{t.label}}</label>
                                          <div class="col-sm-3">
                                              <span v-if="(t.type == 'text') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + currentField.code" class="form-control" v-model="currentField['settings_' + t.code]" :style="'width:' + t.width"/></span>
                                              <span v-else-if="(t.type == 'text') && (t.render == 'select')"><select class="form-control" :name="'setting_' + currentField.code" v-model="currentField['settings_' + t.code]" v-on:change="settingAlert(t.code, i)"><option v-for="l in repoLists" :value="l.code">{{l.name}}</option></select></span>
                                              <span v-else-if="(t.type == 'integer') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + currentField.code" class="form-control" v-model="currentField['settings_' + t.code]" :style="'width:' + t.width"/></span>
                                              <span v-else-if="(t.type == 'integer') && (t.render == 'select')"><select class="form-control"></select></span>
                                              <span v-else-if="(t.type == 'float') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + currentField.code" class="form-control" v-model="currentField['settings_' + t.code]" :style="'width:' + t.width"/></span>
                                              <span v-else-if="(t.type == 'float') && (t.render == 'select')"><select class="form-control"></select></span>
                                              <span v-else-if="(t.type == 'boolean') && (t.render == 'select')"><select :name="'setting_' + currentField.code" class="form-control" v-model="currentField['settings_' + t.code]"><option value="1">Yes</option><option value="0">No</option></select></span>
                                              <span v-else-if="(t.type == 'list') && (t.render == 'select')"><select class="form-control"></select></span>
                                              <span v-else>???</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer justify-content-between">
                    <click-confirm placement="left" style="display:inline;">
                      <button v-on:click.prevent="deleteDataTypeField(currentField.pos)" class="btn btn-danger" data-dismiss="modal">Delete</button>
                    </click-confirm>
                    <div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button v-on:submit.prevent="saveFieldEdit" v-on:click.prevent="saveFieldEdit" class="btn btn-primary btn-orange" data-dismiss="modal" :disabled="fieldNameError || fieldCodeError">Save</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="modal fade" id="color-guide-modal" tabindex="-1" role="dialog" aria-labelledby="color-guide" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="edit-field-label">Field Type Color Guide</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <p>The colors of each Data Type Field provide a guide to the type of data that they contain:</p>
                  <div class="row color-row">
                      <div class="col-4 text-center">
                        <div style="background-color: #54b15c;" class="color-block"><h6>Text</h6></div>
                      </div>
                      <div class="col-4 text-center">
                        <div style="background-color: #798ae7;" class="color-block"><h6>Integer</h6></div>
                      </div>
                      <div class="col-4 text-center">
                        <div style="background-color: #e0462f;" class="color-block"><h6>Boolean</h6></div>
                      </div>
                  </div>
                  <div class="row color-row">
                      <div class="col-4 text-center">
                        <div style="background-color: #e08e33;" class="color-block"><h6>List</h6></div>
                      </div>
                      <div class="col-4 text-center">
                        <div style="background-color: #e0c14e;" class="color-block"><h6>Georeference</h6></div>
                      </div>
                      <div class="col-4 text-center">
                        <div style="background-color: #993456;" class="color-block"><h6>Float</h6></div>
                      </div>
                  </div>
                  <div class="row color-row">
                      <div class="col-4 text-center offset-sm-4">
                        <div style="background-color: #e49ae1;" class="color-block"><h6>Date</h6></div>
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

export default {
  name: 'schema-editor',
  data: function() {
    return {
        showHeader: false,
        formContent: null,
        editorDataTypeIndex: null,
        search_display_values: [],
        listArray: [],
        fieldAlert: null,
        currentField: null,
        showFieldModal: false,
        fieldNameError: null,
        fieldCodeError: null,
        dataTypeNameError: null,
        datatypeCodeError: null,
        state: this.$store.state
    }
  },
  props: [
      'id'
  ],
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
    this.$store.dispatch('list/getListsForRepo', this.$store.getters['repos/getActiveRepoID']);
  },
  created: function(){
      if(this.id){
          this.editDataType(this.id);
      }
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},

	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    activeRepoID: function() { return this.$store.getters['repos/getActiveRepoID']; },
	dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
	fieldTypes: function() { return this.$store.getters['schema/getFieldTypeList']; },
	fieldDataTypes: function() {
	    let rawTypes = this.$store.getters['schema/getFieldDataTypeList'];  // remove all non-datatype entries
	    return Object.keys(rawTypes).filter(key => key.match(/DataType$/)).reduce((obj, key) => { obj[key] = rawTypes[key]; return obj; }, {}); 
	},
    repoLists: function() { return this.$store.getters['list/getListsForRepo']; }
  },
  filters: {
      truncateDescription: function(desc){
          if(desc){
              if(desc.length > 90){
                  return desc.substr(0, 87) + '...';
              }
          }
          return desc;
      }
  },
  methods: {
    // ------------------------------------
    // Data type form
    addDataType: function() {
        this.showHeader = "add";
        this.formContent = {};
        this.editorDataTypeIndex = -1;
    },
    editDataType: function(id) {
        for(var i in this.dataTypes) {
            if (this.dataTypes[i].id == id) {
                this.showHeader = 'edit'; 
                this.editItem = this.dataTypes[i];
                this.formContent = this.dataTypes[i];
                this.dataTypeNameError = null;
                this.dataTypeCodeError = null;
                if(this.formContent['fields'].length > 0){
                    this.currentField = this.formContent['fields'][0];
                    this.currentField['pos'] = i;
                }
                for(var j in this.formContent.fields){
                    for(var k in this.formContent.fields[j]){
                        if(k.indexOf("settings_") > -1){
                            if(["0", "1"].indexOf(this.formContent.fields[j][k]) > -1){
                                this.formContent.fields[j][k] = parseInt(this.formContent.fields[j][k], 10);
                            }
                        }
                    }
                }
                this.editorDataTypeIndex = i;

                break;
            }
        }
    },
    saveDataType: function() {
        if (this.formContent.id > 0) {
            // edit existing type
            this.$store.dispatch('schema/editDataType', this.formContent);
        } else {
            // add new type
            var self = this;
            this.$store.dispatch('schema/addDataType', this.formContent).then(function(response) {
                self.editDataType(response.type.id);
            });
        }
        this.editItem = null;
        this.$forceUpdate();
    },
    saveFieldEdit: function() {
        var field = this.currentField;
        var pos = field['pos'];
        delete field['pos'];
        this.formContent.fields[pos] = field;
        this.saveDataType();
    },
    cancelDataTypeEdit: function() {
        this.showHeader = false;
        this.editorDataTypeIndex = null;
        this.formContent = null;
    },
    deleteDataType: function(type_id) {
      var self = this;
      this.$store.dispatch('schema/deleteDataType', type_id).then(function(response) {
          self.cancelDataTypeEdit();
      });
    },
    // ------------------------------------
    // Fields form
    addDataTypeField: function() {
        if (this.editorDataTypeIndex !== null) {
            var newField = {'type': 'TextDataType', 'code': '', 'description': '', 'has_data': false, 'name': ''}
            this.dataTypes[this.editorDataTypeIndex]['fields'].unshift(newField);
            var container = this.$el.querySelector("#schemaEditor-form");
			container.scrollTop = "1px";
            this.saveDataType();
        }
    },

    getFieldDataTypeSettings: function(dataType){
        var type = this.fieldDataTypes[dataType];
        var typeSettings = type['settings'];
        return typeSettings
    },
    deleteDataTypeField: function(index) {
         if (this.editorDataTypeIndex !== null) {
            var fieldToDelete = this.dataTypes[this.editorDataTypeIndex]['fields'].splice(index, 1);

            if (fieldToDelete && fieldToDelete[0].id) {
                if(!this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete']) { this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'] = []; }
                this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'].push(fieldToDelete[0].id);
            }
            this.saveDataType();
        }
    },
    // ------------------------------------
    getFieldDataTypeSettingsForDisplay: function(tid) {
	    var o = this.fieldDataTypes[tid]['order'];
		var s = this.fieldDataTypes[tid]['settings'];

	    if (!o || !s) { return null; }
        var acc = [];
	    for(var i in o) { acc.push(s[o[i]]); }
	    return acc;
	},
	// ------------------------------------
    settingAlert(setting_code, i){
        if(setting_code == "list_code"){
            this.fieldAlert = "WARNING! Changing the list associated with this field will cause existing values to be checked against the newly assigned list. If that list does not allow merging, non-matching values will be deleted! Please review your data and/or set the list being switched to allow merging."
        }
    },
    checkGreen: function(i) {
        if(i % 3 == 0 || (i % 3) - 2 == 0){
            return "card-green";
        } else {
            return "card-gray";
        }
    },
    typeCheck: function(type){
        var headerClass = 'card-gray';
        switch(type){
            case 'TextDataType':
                headerClass = 'card-schema-green';
                break;
            case 'IntegerDataType':
                headerClass = 'card-blue';
                break;
            case 'BooleanDataType':
                headerClass = 'card-red';
                break;
            case 'ListDataType':
                headerClass = 'card-orange';
                break;
            case 'GeorefDataType':
                headerClass = 'card-yellow';
                break;
            case 'FloatDataType':
                headerClass = 'card-purple';
                break;
            case 'DateDataType':
                headerClass = 'card-pink';
                break;
            default:
                break;
        }
        return headerClass;
    },
    setModalData: function(field, i){
        this.currentField = JSON.parse(JSON.stringify(field));
        this.currentField['pos'] = i;
        this.showFieldModal = true;
        this.fieldNameError = null;
        this.fieldCodeError = null;
        //this.validateNameChange();
    },
    validateNameChange: function(){
        var name = this.currentField.name;
        if(name.length < 2){
            this.fieldNameError = "Field Name must be at least 2 characters long"
        } else {
            this.fieldNameError = null;
            var new_code = name.replace(/[\s\-]+/g, '_');
            new_code = new_code.replace(/\W/g, '').toLowerCase();
            this.checkIfNameCodeExists(name, new_code, this.currentField.pos)
            this.currentField.code = new_code
        }
    },
    checkIfNameCodeExists: function(name, new_code, pos){
        var breaker = false;
        for(var i in this.formContent.fields){
            if(pos == i){ continue; }
            var field = this.formContent.fields[i];
            var field_name = field['name'];
            var field_code = field['code'];
            if(field_name.toLowerCase() == name.toLowerCase()){
                this.fieldNameError = "Field Name Already Exists! Please select another";
                breaker = true;
            }
            if(field_code.toLowerCase() == new_code.toLowerCase()){
                this.fieldCodeError = "Field Code Already Exists! Please select another";
                breaker = true;
            } else {
                this.fieldCodeError = null;
            }
            if(breaker){ break; }
        }
    },
    validateDataTypeInfo: function(pos){
        var name = this.formContent.name;
        if(name.length < 4){
            this.dataTypeNameError = "Data Type Name must be at least 4 characters long"
        } else {
            this.dataTypeNameError = null;
            var new_code = name.replace(/[\s\-]+/g, '_');
            new_code = new_code.replace(/\W/g, '').toLowerCase();
            this.formContent.code = new_code;
            this.checkIfDataTypeCodeExists(name, new_code, pos)

        }
    },
    checkIfDataTypeCodeExists: function(name, new_code, pos){
        var breaker = false;
        for(var i in this.dataTypes){
            if(pos == i){ continue; }
            var type = this.dataTypes[i];
            var type_name = type['name'];
            var type_code = type['code'];
            if(type_name.toLowerCase() == name.toLowerCase()){
                this.dataTypeNameError = "Field Name Already Exists! Please select another";
                breaker = true;
            }
            if(type_code.toLowerCase() == new_code.toLowerCase()){
                this.dataTypeCodeError = "Field Code Already Exists! Please select another";
                breaker = true;
            } else {
                this.dataTypeCodeError = null;
            }
            if(breaker){ break; }
        }
    }
  },
}
</script>
