<template>
<div id="portal" class="container">
    <div v-if="!repoDisplay">
        <div class="row bg-lt-gray mb-3">
            <div class="col-sm-10 offset-sm-1 text-center">
                <h1>Welcome to the Inquisite Data Portal!</h1>
                <p>Users can manage, collaborate and publish their data in Inquisite and this is where you can explore what other users have created and published.</p>
            </div>
        </div>
        <div class="row portal-search-bar">
            <div class="col-sm-10 offset-sm-1 text-center">
                <form>
                    <input id="portal-search" class="form-control text-center" type="text" placeholder="Search what's been published in Inquisite!" v-model="searchQuery" v-on:input="queryInquisite()"/>
                </form>
                <div class="row mt-3">
                    <div class="col-sm-12 col-md-4 text-center">
                        <button class="btn btn-primary" v-on:click="browseInquisite('featured')"><i class="fa fa-flag"></i> Featured</button>
                    </div>
                    <div class="col-sm-12 col-md-4 text-center">
                        <button class="btn btn-primary" v-on:click="browseInquisite('updated')"><i class="fa fa-clock-o"></i> Recently Updated</button>
                    </div>
                    <div class="col-sm-12 col-md-4 text-center">
                        <button class="btn btn-primary" v-on:click="browseInquisite('created')"><i class="fa fa-check"></i> Recently Created</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="searching">
            <div class="col-sm-8 offset-sm-2 text-center">
                <h5>Searching Inquisite <i class="fa fa-circle-o-notch fa-spin"></i></h5>
            </div>
        </div>
        <div class="row" v-if="noResults">
            <div class="col-sm-8 offset-sm-2 text-center">
                <h5>No Results Found</h5>
            </div>
        </div>
        <div class="row" v-if="searchResponse && searchResponse.length > 0">
            <div class="col-sm-10 offset-sm-1 portal-result-scroll">
                <div class="row">
                    <div class="col-xs-12 col-md-4 col-lg-3" v-for="d,i in searchResponse">
                        <div class="card type-card" v-bind:class="[setColor(d.type)]">
                            <div class="card-header">
                                <h4>{{d.type}}</h4>
                            </div>
                            <div v-if="d.type == 'Repository'">
                                <div class="card-block portal-search-block">
                                    <div class="row">
                                        <div class="col-12">
                                            <h6>Name</h6><p>{{d.name}}</p>
                                            <h6>Description</h6><p>{{d.description}}</p>
                                        </div>
                                    </div>
                                    <div class="row schema-bottom-info">
                                        <div class="col-12">
                                            <a v-on:click="loadRepo(d.id)" class="btn btn-primary btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View Repository</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="card-block portal-search-block">
                                    <div class="row">
                                        <div class="col-12">
                                            <h6>Repository</h6><p>{{d.repo_name}}</p>
                                            <h6>Data Matches</h6>
                                            <div v-for="hit in d.hits">
                                                <div v-for="h,f in hit">
                                                    <p><strong>{{f}}: </strong>
                                                    <span v-html="mergeHits(h)"></span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row schema-bottom-info">
                                        <div class="col-12">
                                            <a v-on:click="loadRepo(d.repo_id)" class="btn btn-primary btn-sm"><i class="fa fa-eye" aria-hidden="true"></i> View Repository</a>
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
    <div v-else>
        <div class="row">
            <div class="col-sm-6">
                <h6>Repository</h6>
                <h2>{{activeRepo.repo_name}}</h2>
                <p>{{activeRepo.description}}</p>
                <h6>Owner</h6>
                <h2>{{activeRepo.owner}}</h2>
            </div>
            <div class="col-sm-6 text-right">
                <div class="mb-2"><button class="btn btn-primary" v-on:click="backToSearch()">Back to Main Portal</button></div>
                <div><button class="btn btn-orange" v-on:click="exportToJSON(activeRepo.repo, activeRepo.repo_name)">Export All Data</button></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <hr/>
                <h4>Data Sample (First 48 Rows)</h4>
            </div>
        </div>
        <div class="row portal-result-scroll">
            <div class="col-sm-6 col-md-3" v-for="d,i in activeRepo.data">
                <div class="card portal-data-card">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item portal-repo-data-item" v-for="(text,field) in d" v-if="field != 'uuid'">
                          <p><strong>{{field}}</strong> {{text}}</p>
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    var marked = require('marked');

	export default {
		name: 'portal',
        data: function() {
          return {
                state: this.$store.state,
                searchQuery: '',
                searchResponse: [],
                searching: false,
                noResults: false,
                repoDisplay: null,
                activeRepo: {}
          }
        },
		computed: {

		},
        methods: {
            queryInquisite: function() {
                var self = this;
                if(this.searchQuery.length > 3){
                    this.searching = true;
                    self.noResults = false;
                    this.$store.dispatch('search/portalSearch', this.searchQuery).then(function(data){
                        console.log(data['nodes']);
                        if(data['nodes'].length == 0){
                            self.noResults = true;
                            self.searching = false;
                        } else {
                            self.searchResponse = data['nodes'];
                            self.searching = false;
                            self.noResults = false;
                        }
                    });
                } else {
                    this.searchResponse = [];
                }
            },
            browseInquisite: function(type){
                    if(type == 'featured'){
                        return false;
                    } else {
                        return false;
                    }
            },
            mergeHits: function(hits) {
                var hitHTML = '';
                for(var i = 0; i < hits.length; i++){
                    hitHTML += hits[i];
                    if(i < (hits.length - 1)){
                        hitHTML += ', ';
                    }
                }
                return hitHTML;
            },
            setColor: function(type) {
                if(type == 'Data'){
                    return "data-card";
                } else {
                    return "repo-card";
                }
            },
            loadRepo: function(repo_id){
                this.repoDisplay = repo_id;
                var self = this;
                this.$store.dispatch('repos/getRepoForPortal', repo_id).then(function(data){
                    self.activeRepo = data;
                });
            },
            backToSearch: function(){
                this.repoDisplay = null;
            },
            exportToJSON: function(repo_id, repo_name){
                var self = this;
                this.$store.dispatch('export_data/createExportSource', {"type": "Repository", "repo": repo_id});
                this.$store.dispatch('export_data/storeExportInfo', [repo_name, "portal_user"]);
                this.$store.dispatch('export_data/portalExport', repo_name + " export.json");
            }
        }
	}

</script>
