<template>
<div id="schema-editor">
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
                    <div id="repo-msg" class="alert alert-danger" role="alert" v-show="formMessage !== ''">{{formMessage}}</div>

                    <form id="addRepo-form" name="addRepo-form" method="POST" action="#">

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
                                <textarea class="form-control" :value="description" rows="10" cols="80" v-model="formContent.description"></textarea>
                            </div>
                        </div>

                        <div class="item" style="padding: 10px 0">
                            <button v-on:submit.prevent="editDataType" v-on:click.prevent="editDataType" class="btn btn-primary">Save</button>
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
        formMessage: '',
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
	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	dataTypes: function() { return this.$store.getters['schema/getDataTypes']; }
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
    cancelDataTypeEdit: function() {
        this.editor_header = '';
    },
    deleteDataType: function(repo_id) {
      this.$store.dispatch('schema/deleteDataType', { data: { repo_id: repo_id }});
    }
  },
}
</script>