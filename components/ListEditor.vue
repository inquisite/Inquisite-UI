<template>
<div id="list-editor">
    <div class="row">
	    <div class="col-sm-12">
	    	<flashmessage/>
	    </div>
	</div>
	<div class="row" v-if="!editorListIndex">
        <div class="col-sm-12 col-md-10 offset-md-1">
			<div class="row">
		        <div class="col-sm-6">
                    <h2>Lists</h2>
                </div>
                <div class="col-sm-6 text-right">
                    <div><a @click="addList" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> New List</a></div>
                </div>

            </div>
            <div class="row">
                <div class="col-12">
                    <hr/>
                </div>
            </div>
            <div id="list-types">
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-lg-4" v-for="list, i in repoLists">
                        <div class="card type-card" v-bind:class="[checkGreen(i)]">
                            <div class="card-header">
                                <h4>{{list.name}} (<em>{{list.code}}</em>)</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <p>{{list.description | truncateDescription}}</p>
                                    </div>
                                </div>
                                <div class="row schema-bottom-info">
                                    <div class="col-12">
                                        <a @click="editList(list.id)" class="btn btn-primary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
    </div>
    <div class="row" v-if="editorListIndex !== null">
    	<div class="col-12 col-sm-10 offset-sm-1">
    		<div class="pull-right">
    			<button v-on:submit.prevent="saveList" v-on:click.prevent="saveList" class="btn btn-primary btn-orange" :disabled="listNameError || listCodeError">Save</button>&nbsp;&nbsp;
                <click-confirm placement="left" style="display:inline;">
                    <button v-on:click.prevent="deleteList(formContent.id)" class="btn btn-danger">Delete</button>
                </click-confirm>
    			<button v-on:click.prevent="cancelListEdit" class="btn btn-cancel">Back</button>
            </div>
    		<H1 v-html="editorHeader"></H1>
            <div class="row">
                <div class="col-12">
                    <hr/>
                </div>
            </div>
    		<form id="listEditor-form" name="addRepo-form" method="POST" action="#">
            <div class="row">
                <div class="col-sm-8" v-if="(editorListIndex !== null) && (editorListIndex >= 0)">
                    <div class="row">
                        <div class="col-8">
                            <h4>List Items</h4>
                        </div>
                        <div class="col-4 text-right">
                            <a @click="addListItem" class="btn btn-primary btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> New List ITem</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center" v-if="!formContent.items || (formContent.items.length == 0)">
                            <p>No List Items defined</p>
                        </div>
                        <div class="col-12 list-group-scroll">
                            <div class="row">
                                <div class="col-xs-6 col-sm-4" v-for="f, i in formContent.items" v-if="formContent.items && (formContent.items.length > 0)">
                                    <div class="card card-gray schema-field-card">
                                        <button class="model-open-overlay text-center" data-toggle="modal" data-target="#edit-item-modal" v-on:click.prevent="setModalData(f, i)">
                                            <h5><i class="fa fa-pencil" aria-hidden="true"></i> Edit List Item</h5>
                                        </button>
                                        <div class="card-header schema-field-card-head">
                                            <div v-if="!f.id" class="btn btn-danger btn-sm">NEW</div>
                                            <span v-if="f.display"><strong>{{f.display}}</strong></span>
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
            	<div v-bind:class="((editorListIndex !== null) && (editorListIndex < 0)) ? 'col-sm-6 offset-sm-3' : 'col-sm-4'">
					<div class="card card-form">
						<div class="card-header text-center">Basic Information</div>
						<div class="card-body">

								<div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<label for="name" class="form-label">Name</label>
											<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="formContent.name" v-on:input="validateListInfo(editorListIndex)" v-bind:class="{'is-invalid': listNameError}">
                                            <div class="invalid-feedback">{{listNameError}}</div>
                                        </div>
									</div>
                                </div>
                                <div class="row">
									<div class="col-sm-12">
										<div class="form-group">
											<label for="code" class="form-label">Code</label>
											<input type="text" class="form-control" id="code" name="code" placeholder="Code" v-model="formContent.code" readonly v-bind:class="{'is-invalid': listCodeError}">
                                            <div class="invalid-feedback">{{listCodeError}}</div>
										</div>
									</div>
								</div>
                                <div class="row">
                                    <div class="col-sm-12">
    									<div class="form-group">
    										<label for="merge" class="form-label">Allow Merge?</label>
                                            <select v-model="formContent.merge_allowed" name="merge" id="merge" class="form-control" ><option value="1">Yes</option><option value="0">No</option></select>
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
        <div v-if="currentItem">
            <div class="modal fade" id="edit-item-modal" tabindex="-1" role="dialog" aria-labelledby="edit-item-label" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="edit-item-label">Edit List Item {{currentItem.display}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" :id="'item' + currentItem.id">
                        <div class="row">
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <label for="name" class="form-label">Name</label>
                                  <input type="text" class="form-control" :id="'field_' + currentItem.code" :name="'item_' + currentItem.code" placeholder="Name" v-model="currentItem.display" v-on:input="validateNameChange()" v-bind:class="{'is-invalid': itemNameError}">
                                  <div class="invalid-feedback">{{itemNameError}}</div>
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-group">
                                  <label for="code" class="form-label">Code</label>
                                  <input type="text" class="form-control" :id="'field_' + currentItem.code" :name="'field_' + currentItem.code" placeholder="Code" v-model="currentItem.code" readonly v-bind:class="{'is-invalid': itemCodeError}">
                                  <div class="invalid-feedback">{{itemCodeError}}</div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-12">
                              <div class="form-group">
                                  <label for="description" class="form-label">Description</label>
                                  <textarea type="text" class="form-control" rows="3" :id="'field_' + currentItem.code" :name="'field_' + currentItem.code" placeholder="Description" v-model="currentItem.description"></textarea>
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
                  </div>
                  <div class="modal-footer justify-content-between">
                    <click-confirm placement="left" style="display:inline;">
                      <button v-on:click.prevent="deleteListItem(currentItem.pos)" class="btn btn-danger" data-dismiss="modal">Delete</button>
                    </click-confirm>
                    <div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button v-on:submit.prevent="saveListItemEdit" v-on:click.prevent="saveListItemEdit" class="btn btn-primary btn-orange" data-dismiss="modal" :disabled="itemNameError || itemCodeError">Save</button>
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
  name: 'list-editor',
  data: function() {
    return {
        editorHeader: '',
        editorList: null,
        formContent: null,
        editorListIndex: null,
        state: this.$store.state,
        listCodeError: null,
        listNameError: null,
        itemCodeError: null,
        itemNameError: null,
        currentItem: null,
        showlistItemModal: false,
        fieldAlert: null
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
    addList: function() {
        this.editorHeader = "Add new list";
        this.formContent = {};
        this.editorListIndex = -1;
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
        var self = this;
        if (this.formContent.id > 0) {
            // edit existing type
            this.$store.dispatch('list/editList', this.formContent).then(function(response){
                self.editList(self.formContent.id);
            });
        } else {
            // add new type
            this.$store.dispatch('list/addList', this.formContent).then(function(response) {
                self.editList(response.type.id);
            });
        }
        this.$forceUpdate();
    },
    saveListItemEdit: function() {
        var item = this.currentItem;
        var pos = item['pos'];
        delete item['pos'];
        this.formContent.items[pos] = item;
        this.saveList();
    },
    cancelListEdit: function() {
        this.editorHeader = '';
        this.editorListIndex = null;
        this.formContent = {};
    },
    deleteList: function(list_id) {
      this.$store.dispatch('list/deleteList', list_id);
      this.cancelListEdit();
      //this.$forceUpdate()
    },
    // ------------------------------------
    // Fields form
    addListItem: function() {
        if (this.editorListIndex !== null) {
            this.formContent.items.unshift({});
            this.$forceUpdate();
        }
    },
    deleteListItem: function(index) {
         if (this.editorListIndex !== null) {
            var itemToDelete = this.formContent.items.splice(index, 1);
            if (itemToDelete && itemToDelete[0].id) {
                if(!this.formContent.itemsToDelete) { this.formContent.itemsToDelete = []; }
                this.formContent.itemsToDelete.push(itemToDelete[0].id);
            }
            this.saveList();
        }
    },
    checkGreen: function(i) {
        if(i % 3 == 0 || (i % 3) - 2 == 0){
            return "card-green";
        } else {
            return "card-gray";
        }
    },
    setModalData: function(item, i){
        this.currentItem = JSON.parse(JSON.stringify(item));
        this.currentItem['pos'] = i;
        this.showlistItemModal = true;
        this.itemNameError = null;
        this.itemCodeError = null;
    },
    validateNameChange: function(){
        var name = this.currentItem.display;
        if(name.length < 2){
            this.itemNameError = "List Item Name must be at least 2 characters long"
        } else {
            this.itemNameError = null;
            var new_code = name.replace(/[\s\-]+/g, '_');
            new_code = new_code.replace(/\W/g, '').toLowerCase();
            this.checkIfNameCodeExists(name, new_code, this.currentItem.pos)
            this.currentItem.code = new_code
        }
    },
    checkIfNameCodeExists: function(name, new_code, pos){
        var breaker = false;
        for(var i in this.formContent.items){
            if(pos == i){ continue; }
            var item = this.formContent.items[i];
            var item_name = item['display'];
            var item_code = item['code'];
            if(item_name.toLowerCase() == name.toLowerCase()){
                this.itemNameError = "List Item Name Already Exists! Please select another";
                breaker = true;
            }
            if(item_code.toLowerCase() == new_code.toLowerCase()){
                this.itemCodeError = "List Item Code Already Exists! Please select another";
                breaker = true;
            } else {
                this.itemCodeError = null;
            }
            if(breaker){ break; }
        }
    },
    validateListInfo: function(pos){
        var name = this.formContent.name;
        if(name.length < 4){
            this.listNameError = "List Name must be at least 4 characters long"
        } else {
            this.listNameError = null;
            var new_code = name.replace(/[\s\-]+/g, '_');
            new_code = new_code.replace(/\W/g, '').toLowerCase();
            this.formContent.code = new_code;
            this.checkIfListCodeExists(name, new_code, pos)

        }
    },
    checkIfListCodeExists: function(name, new_code, pos){
        var breaker = false;
        for(var i in this.repoLists){
            var list = this.repoLists[i];
            if(pos == list['id']){ continue; }
            var list_name = list['name'];
            var list_code = list['code'];
            if(list_name.toLowerCase() == name.toLowerCase()){
                this.listNameError = "List Name Already Exists! Please select another";
                breaker = true;
            }
            if(list_code.toLowerCase() == new_code.toLowerCase()){
                this.listCodeError = "List Code Already Exists! Please select another";
                breaker = true;
            } else {
                this.listCodeError = null;
            }
            if(breaker){ break; }
        }
    }
  }
}
</script>
