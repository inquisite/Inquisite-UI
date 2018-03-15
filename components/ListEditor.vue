<template>
<div id="list-editor">
    <div class="row">
	    <div class="col-sm-12">
	    	<flashmessage/>
	    </div>
	</div>
	<div class="row" v-if="!editorListIndex">
	    <div class="col-sm-8 offset-sm-2">
			<div class="card card-gray">
				<div class="card-header card-header-with-tabs">
    				<ul class="nav nav-tabs card-header-tabs" role="tablist">
						<li role="presentation" class="nav-item"><a href="#list-types" aria-controls="data-types" role="tab" data-toggle="tab" class="nav-link active"> Lists</a></li>
					</ul>
				</div>

				<div class="tab-content">
                	<div role="tabpanel" class="tab-pane active" id="list-types">
                	   	<ul class="list-group list-group-flush" v-if="repos.length">
							<li class="list-group-item justify-content-between">
								<div></div><div><a @click="addList" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New List</a></div>
							</li>
							<li class="list-group-item justify-content-between" v-for="list in repoLists">
								<div>{{list.name}} {{l}} (<em>{{list.code}}</em>)<br/>
									<small>{{list.description}}</small>
								</div>
								<div>
									<a @click="editList(list.id)" class="btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
									<click-confirm placement="top" style="display:inline;">
										<a @click="deleteList(list.id)" class="btn btn-orange  btn-sm"><i class="fa fa-times-circle" aria-hidden="true"></i> Delete</a>
									</click-confirm>
								</div>
							</li>
						</ul>
					</div>
              	</div>
			</div>
        </div>
    </div>
    <div class="row" v-if="editorListIndex !== null">
    	<div class="col-sm-10 offset-sm-1">
    		<div class="pull-right">
    			<button v-on:submit.prevent="saveList" v-on:click.prevent="saveList" class="btn btn-primary btn-orange">Save</button>&nbsp;&nbsp;
    			<button v-on:click.prevent="cancelListEdit" class="btn btn-cancel">Back</button>
            </div>
    		<H1 v-html="editorHeader"></H1>
    		<form id="listEditor-form" name="addList-form" method="POST" action="#">
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
				<div class="col-sm-12" v-if="(editorListIndex !== null) && (editorListIndex >= 0)">
					<div class="card card-form">
						<div class="card-header text-center">List Items</div>

							<div class="card-block">
										<div>
											<a @click="addListItem" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New List Item</a>
										</div>
										<p class="text-center" v-if="!formContent.items || (formContent.items.length == 0)">
											No List Items defined
                                            {{formContent}}
										</p>
							</div><!-- end card-block -->
							<div class="list-group-scroll">
								<ul id="itemList" class="list-group list-group-flush">
									<li class="list-group-item" v-for="f, i in formContent.items" v-if="formContent.items && (formContent.items.length > 0)">
										<div class="container">
											<div class="row">

												<div class="col-sm-8">
													<div v-if="!f.id" class="btn btn-danger btn-sm">NEW</div>
													<span v-if="f.display"><strong>{{f.display}}</strong> ({{f.code}})</span>
												</div>
												<div class="col-sm-4 text-right">
													<button class="btn btn-primary btn-sm" type="button" data-toggle="collapse" v-if="f.id" :data-target="'#field' + f.id"  @click="$event.target.classList.toggle('inactive')"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
													&nbsp;&nbsp;<click-confirm placement="top" style="display:inline;">
														<a @click="deleteListItem(i)" class="btn btn-orange btn-sm"><i class="fa fa-times-circle" aria-hidden="true"></i> Delete</a>
													</click-confirm>
												</div>
											</div>
										</div>
										<div class="container bg-lt-gray-form" v-bind:class="{ collapse: f.id}" :id="'field' + f.id">
											<div class="row">
												<div class="col-sm-4">
													<div class="form-group">
														<label for="name" class="form-label">Name</label>
														<input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Name" v-model="f.display">
													</div>
												</div>
												<div class="col-sm-4">
													<div class="form-group">
														<label for="code" class="form-label">Code</label>
														<input type="text" class="form-control" :id="'field_' + f.code" :name="'field_' + f.code" placeholder="Code" v-model="f.code">
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
						<button v-on:submit.prevent="saveList" v-on:click.prevent="saveList" class="btn btn-primary btn-orange">Save</button>&nbsp;&nbsp;
						<button v-on:click.prevent="cancelListEdit" class="btn btn-cancel">Back</button>
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
  name: 'list-editor',
  data: function() {
    return {
        editorHeader: '',
        editorList: null,
        formContent: null,
        editorListIndex: null,
        state: this.$store.state
    }
  },
  mounted: function(){
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
    this.$store.dispatch('schema/getFieldDataTypeList');
    this.$store.dispatch('list/getListsForRepo', this.$store.getters['repos/getActiveRepoID']);
  },
  computed: {
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
	},

	repos: function() { return this.$store.getters['people/getUserRepos']; },
	user: function() { return this.$store.getters['people/getUserInfo']; },
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	repoLists: function() { return this.$store.getters['list/getListsForRepo']; }
  },
  methods: {
    // ------------------------------------
    // Data type form
    addList: function() {
        this.editorHeader = "Add new list";
        this.formContent = {};
        this.editorDataTypeIndex = -1;
    },
    editList: function(id) {
        for(var i in this.repoLists) {
            var list = this.repoLists[i];
            if (list.id == id) {
                this.editorHeader = "Editing List: <em>" + list.name + "</em>";
                this.formContent = list;
                var tmp_items = [];
                var self = this;
                this.$store.dispatch('list/getListItemsForList', list.id).then(function(response){
                    for(var j in response.items){
                        tmp_items.push(response.items[j])
                    }
                    self.formContent['items'] = tmp_items;
                    self.editorListIndex = id
                });
                break;
            }
        }
    },
    saveList: function() {
        if (this.formContent.id > 0) {
            // edit existing type
            this.$store.dispatch('list/editList', this.formContent);
        } else {
            // add new type
            var self = this;
            this.$store.dispatch('list/addList', this.formContent).then(function(response) {
                self.editList(response.type.id);
            });
        }
    },
    cancelListEdit: function() {
        this.editorHeader = '';
        this.editorListIndex = null;
        this.formContent = {};
    },
    deleteList: function(list_id) {
      this.$store.dispatch('list/deleteList', list_id);
      this.cancelListEdit();
    },
    // ------------------------------------
    // Fields form
    addListItem: function() {
        if (this.editorListIndex !== null) {
            //this.dataTypes[this.editorDataTypeIndex]['fields'].unshift({'type': 'TextDataType'});
            var container = this.$el.querySelector("#itemList");
			container.scrollTop = "1px";
        }
    },
    deleteListItem: function(index) {
         if (this.editorListIndex !== null) {
             console.log(index);
            //var fieldToDelete = this.dataTypes[this.editorDataTypeIndex]['fields'].splice(index, 1);

            //if (fieldToDelete && fieldToDelete[0].id) {
            //    if(!this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete']) { this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'] = []; }
            //    this.dataTypes[this.editorDataTypeIndex]['fieldsToDelete'].push(fieldToDelete[0].id);
            //}
        }
    }
  }
}
</script>
