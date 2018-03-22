<template>
<div id="schema-editor">
    <div class="row">
	    <div class="col-sm-12">
	    	<flashmessage/>
	    </div>
	</div>
	<div class="row" v-if="!editorDataTypeIndex">
	    <div class="col-sm-8 offset-sm-2">
			<div class="card card-gray">
				<div class="card-header card-header-with-tabs">
    				<ul class="nav nav-tabs card-header-tabs" role="tablist">
						<li role="presentation" class="nav-item"><a href="#data-types" aria-controls="data-types" role="tab" data-toggle="tab" class="nav-link active"> Data types</a></li>
						<!--<li role="presentation" class="nav-item"><a href="#relationship-types" aria-controls="relationship-types" role="tab" data-toggle="tab" class="nav-link"> Relationship types</a></li>-->
					</ul>
				</div>

				<div class="tab-content">
                	<div role="tabpanel" class="tab-pane active" id="data-types">
                	   	<ul class="list-group list-group-flush" v-if="repos.length">
							<li class="list-group-item justify-content-between">
								<div></div><div><a @click="addDataType" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New data type</a></div>
							</li>
							<li class="list-group-item justify-content-between" v-for="dataType in dataTypes">
								<div>{{dataType.name}} (<em>{{dataType.code}}</em>)<br/>
									<small>{{dataType.description}}</small>
								</div>
								<div>
									<a @click="editDataType(dataType.id)" class="btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
									<click-confirm placement="top" style="display:inline;">
										<a @click="deleteDataType(dataType.id)" class="btn btn-orange  btn-sm"><i class="fa fa-times-circle" aria-hidden="true"></i> Delete</a>
									</click-confirm>
								</div>
							</li>
						</ul>
					</div>
                	<div role="tabpanel" class="tab-pane" id="relationship-types">
                	    <ul class="list-group list-group-flush">
                	        <li class="list-group-item justify-content-between">Relationship type list goes here </li>
                	    </ul>
                	</div>
              	</div>
			</div>
        </div>
    </div>
    <div class="row" v-if="editorDataTypeIndex !== null">
    	<div class="col-sm-10 offset-sm-1">
    		<div class="pull-right">
    			<button v-on:submit.prevent="saveDataType" v-on:click.prevent="saveDataType" class="btn btn-primary btn-orange">Save</button>&nbsp;&nbsp;
    			<button v-on:click.prevent="cancelDataTypeEdit" class="btn btn-cancel">Back</button>
            </div>
    		<H1 v-html="editorHeader"></H1>
    		<form id="schemaEditor-form" name="addRepo-form" method="POST" action="#">
            <div class="row">
            	<div class="col-sm-12">
					<div class="card card-form">
						<div class="card-header text-center">Basic Information</div>
						<div class="card-block">

								<div class="row">
									<div class="col-sm-6">
										<div class="form-group">
											<label for="name" class="form-label">Name</label>
											<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="formContent.name">
										</div>
									</div>
									<div class="col-sm-6">
										<div class="form-group">
											<label for="code" class="form-label">Code</label>
											<input type="text" class="form-control" id="code" name="code" placeholder="Code" v-model="formContent.code">
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
						 </div><!-- end card-block -->
					</div><!-- end card -->
				</div><!-- end col -->
			</div><!-- end row -->
			<div class="row">
				<div class="col-sm-12" v-if="(editorDataTypeIndex !== null) && (editorDataTypeIndex >= 0)">
					<div class="card card-form">
						<div class="card-header text-center">Fields</div>

							<div class="card-block">
										<div>
											<a @click="addDataTypeField" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New Field</a>
										</div>
										<p class="text-center" v-if="!formContent.fields || (formContent.fields.length == 0)">
											No fields defined
										</p>
							</div><!-- end card-block -->
							<div class="list-group-scroll">
								<ul id="fieldList" class="list-group list-group-flush">
									<li class="list-group-item" v-for="f, i in formContent.fields" v-if="formContent.fields && (formContent.fields.length > 0)">
										<div class="container">
											<div class="row">

												<div class="col-sm-8">
													<div v-if="!f.id" class="btn btn-danger btn-sm">NEW</div>
													<span v-if="f.name"><strong>{{f.name}}</strong> ({{f.code}})</span>
												</div>
												<div class="col-sm-4 text-right">
													<button class="btn btn-primary btn-sm" type="button" data-toggle="collapse" v-if="f.id" :data-target="'#field' + f.id"  @click="$event.target.classList.toggle('inactive')"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
													&nbsp;&nbsp;<click-confirm placement="top" style="display:inline;">
														<a @click="deleteDataTypeField(i)" class="btn btn-orange btn-sm"><i class="fa fa-times-circle" aria-hidden="true"></i> Delete</a>
													</click-confirm>
												</div>
											</div>
										</div>
										<div class="container bg-lt-gray-form" v-bind:class="{ collapse: f.id}" :id="'field' + f.id">
											<div class="row">
												<div class="col-sm-4">
													<div class="form-group">
														<label for="name" class="form-label">Name</label>
														<input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Name" v-model="f.name">
													</div>
												</div>
												<div class="col-sm-4">
													<div class="form-group">
														<label for="code" class="form-label">Code</label>
														<input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Code" v-model="f.code">
													</div>
												</div>
												<div class="col-sm-4">
													<div class="form-group">
														<label for="type" class="form-label">Type</label>
														<select v-model="f.type" class="custom-select form-control">
															<option v-for="t,k in fieldDataTypes" :value="k">{{t.name}}</option>
														</select>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-12">
													<div class="form-group">
														<label for="description" class="form-label">Description</label>
														<textarea type="text" class="form-control" rows="3" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Description" v-model="f.description"></textarea>
													</div>
												</div>
											</div>
											<div class="row" v-if="fieldDataTypes[f.type] && fieldDataTypes[f.type]['order']">
												<div class="col-sm-12">
													<div class="form-group">
														<label for="description" class="form-label">Settings</label>
                                                        <div v-for="t in getFieldDataTypeSettingsForDisplay(f.type)">
                                                            <div class="form-group row">
                                                                <label :for="'settings_' + t.label" class="col-sm-3 col-formlabel">{{t.label}}</label>
                                                                <div class="col-sm-3">
        														    <span v-if="(t.type == 'text') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + f.code" class="form-control" v-model="f['settings_' + t.code]" :style="'width:' + t.width"/></span>
        														    <span v-else-if="(t.type == 'text') && (t.render == 'select')"><select class="form-control"></select></span>
        														    <span v-else-if="(t.type == 'integer') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + f.code" class="form-control" v-model="f['settings_' + t.code]" :style="'width:' + t.width"/></span>
        														    <span v-else-if="(t.type == 'integer') && (t.render == 'select')"><select class="form-control"></select></span>
        														    <span v-else-if="(t.type == 'float') && (t.render == 'field')"><input type="text" :id="'setting_' + t.code" :name="'setting_' + f.code" class="form-control" v-model="f['settings_' + t.code]" :style="'width:' + t.width"/></span>
        														    <span v-else-if="(t.type == 'float') && (t.render == 'select')"><select class="form-control"></select></span>
        														    <span v-else-if="(t.type == 'boolean') && (t.render == 'select')"><select :name="'setting_' + f.code" class="form-control" v-model="f['settings_' + t.code]"><option value="1">Yes</option><option value="0">No</option></select></span>
        														    <span v-else-if="(t.type == 'list') && (t.render == 'select')"><select class="form-control"></select></span>
        														    <span v-else>???</span>
                                                                </div>
                                                            </div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
						</div><!-- end scroll -->
                    </div><!-- end card -->
				</div><!-- end col -->
             </div><!-- end row -->
             <div class="row">
				<div class="col-sm-12">
					<p class="text-center">
						<button v-on:submit.prevent="saveDataType" v-on:click.prevent="saveDataType" class="btn btn-primary btn-orange">Save</button>&nbsp;&nbsp;
						<button v-on:click.prevent="cancelDataTypeEdit" class="btn btn-cancel">Back</button>
					</p>
				</div>
			</div>
        </form>
	    </div><!-- end col -->
    </div>
</div>

</template>

<script>

export default {
  name: 'schema-editor',
  data: function() {
    return {
        editorHeader: '',
        formContent: null,
        editorDataTypeIndex: null,
        search_display_values: [],
        state: this.$store.state
    }
  },
  props: [
      'id'
  ],
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
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
	dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
	fieldTypes: function() { return this.$store.getters['schema/getFieldTypeList']; },
	fieldDataTypes: function() { return this.$store.getters['schema/getFieldDataTypeList']; }
  },
  methods: {
    // ------------------------------------
    // Data type form
    addDataType: function() {
        this.editorHeader = "Add new data type";
        this.formContent = {};
        this.editorDataTypeIndex = -1;
    },
    editDataType: function(id) {
        for(var i in this.dataTypes) {
            if (this.dataTypes[i].id == id) {
                this.editorHeader = "Editing Data Type: <em>" + this.dataTypes[i].name + "</em>";
                this.formContent = this.dataTypes[i];
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
    },
    cancelDataTypeEdit: function() {
        this.editorHeader = '';
        this.editorDataTypeIndex = null;
        this.formContent = {};
    },
    deleteDataType: function(type_id) {
      this.$store.dispatch('schema/deleteDataType', type_id);
      this.cancelDataTypeEdit();
    },
    // ------------------------------------
    // Fields form
    addDataTypeField: function() {
        if (this.editorDataTypeIndex !== null) {
            this.dataTypes[this.editorDataTypeIndex]['fields'].unshift({'type': 'TextDataType'});
            var container = this.$el.querySelector("#fieldList");
			container.scrollTop = "1px";
        }
    },
    deleteDataTypeField: function(index) {
         if (this.editorDataTypeIndex !== null) {
            var fieldToDelete = this.dataTypes[this.editorDataTypeIndex]['fields'].splice(index, 1);

            if (fieldToDelete && fieldToDelete[0].id) {
                if(!this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete']) { this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'] = []; }
                this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'].push(fieldToDelete[0].id);
            }
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
	}
	// ------------------------------------
  },
}
</script>
