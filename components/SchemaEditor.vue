<template>
<div id="schema-editor">
    <div id="schema-editor-msg" class="alert alert-danger" role="alert" v-show="message !== ''" v-html="message"></div>
	<div class="row">
	    <div class="col-sm-6">
			<div class="card card-gray">
				<div class="card-header card-header-with-tabs">
    				<ul class="nav nav-tabs card-header-tabs" role="tablist">
						<li role="presentation" class="nav-item"><a href="#data-types" aria-controls="data-types" role="tab" data-toggle="tab" class="nav-link active"> Data types</a></li>
						<!--<li role="presentation" class="nav-item"><a href="#relationship-types" aria-controls="relationship-types" role="tab" data-toggle="tab" class="nav-link"> Relationship types</a></li>-->
					</ul>
				</div>
			
				<div class="tab-content">
                	<div role="tabpanel" class="tab-pane active" id="data-types">   
                        <div class="pull-right">
                            <a @click="addDataType" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> Add</a>
                        </div>               
						<ul class="list-group list-group-flush" v-if="repos.length">
							<li class="list-group-item justify-content-between" v-for="dataType in dataTypes">
								<div>{{dataType.name}}<br/>
									<small>{{dataType.code}} {{dataType.description}}</small>
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
    	<div class="col-sm-6">
            <div class="card card-gray" v-if="editor_header">
                <div class="card-header text-center" v-html="editor_header"></div>
                <div class="card-block">

                    <form id="schemaEditor-form" name="addRepo-form" method="POST" action="#">

                        <div class="item form-item">
                            <div class="ui fluid input content">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="formContent.name">
                            </div>
                        </div>
                        
                        <div class="item form-item">
                            <div class="ui fluid input content">
                                <input type="text" class="form-control" id="code" name="code" placeholder="Code" v-model="formContent.code">
                            </div>
                        </div>

                        <div class="item form-item">
                            <div class="ui fluid input content">
                                <textarea class="form-control" :value="description" rows="3" cols="80" v-model="formContent.description"></textarea>
                            </div>
                        </div>
                        
                        <h2>Fields</h2>
                        <div v-if="formContent.fields && (formContent.fields.length > 0)">
                            <div v-for="f in formContent.fields">
                               Name
                                <div class="ui fluid input content">
                                    <input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Name" v-model="f.name">
                                    <input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Code" v-model="f.code">
                                    <input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Description" v-model="f.description">
                            
                                    <select v-model="f.type">
                                        <option v-for="t,k in fieldTypes" :value="k">{{t.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            No fields defined
                        </div>

                        <div class="item" style="padding: 10px 0">
                            <button v-on:submit.prevent="saveDataType" v-on:click.prevent="saveDataType" class="btn btn-primary">Save</button>
                            <button v-on:click.prevent="cancelDataTypeEdit" class="btn btn-cancel pull-right">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
	    </div><!-- end col -->
    </div>
</div>

</template>

<script>

export default { 
  name: 'schema-editor',
  data: function() {
    return {
        editor_header: '',
        formContent: null,
        state: this.$store.state,
    }
  },
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},
	
	message: function() { return this.$store.state.msg; },
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
	fieldTypes: function() { return this.$store.getters['schema/getFieldTypeList']; }
  }, 
  methods: {
    addDataType: function() {
        this.editor_header = "Add new data type";
        this.formContent = {};
    },
    editDataType: function(id) {
        for(var i in this.dataTypes) {
            if (this.dataTypes[i].id == id) {
                this.editor_header = "Edit <em>" + this.dataTypes[i].name + "</em>";
                this.formContent = this.dataTypes[i];
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
        this.editor_header = '';
    },
    deleteDataType: function(type_id) {
      this.$store.dispatch('schema/deleteDataType', type_id);
      this.cancelDataTypeEdit();
    }
  },
}
</script>