
<template>
<div id="search">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-form">
        <div class="card-header text-center">
			Search results<span v-if="expression">: <em>{{expression}}</em></span>
		 </div>
        <div class="card-body">

          <flashmessage/>
            <div v-if="results.length == 0"><h2>Nothing found</h2></div>
            <div v-else>
                <tabs :options="{useUrlFragment: false}">
                    <tab v-if="counts[t] > 0" :key="t" v-for="r,t in results" :name="t + ' (' + totalCounts[t] + ')'">
                        <div class="row paging-buttons" v-if="totalCounts[t] > 12">
                            <div class="col-6">
                                <button type="button" class="btn btn-primary" @click="storeExportRecords"><i class="fa fa-download" aria-hidden="true"></i> Export {{exportCount}} Records</button>
                            </div>
                            <div class="col-6 text-right">
                                <button v-on:click.prevent="loadPage(expression, t, slices[t][0]-13, (slices[t][0]-1))" class="btn btn-primary btn-orange" :disabled="(slices[t][0]-12 < 0)">Prev</button>
                                <h6 class="paging-counts">{{slices[t][0]}} - {{slices[t][1]}}</h6>
                                <button v-on:click.prevent="loadPage(expression, t, slices[t][1], (slices[t][1]+12))" class="btn btn-primary btn-orange" :disabled="(slices[t][0]+12 > totalCounts[t])">Next</button>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="v, k in r" class="col-12 col-sm-12 col-md-6 col-lg-3">
                                <div v-bind:class="'card ' + [exportRecords.indexOf(v.__id) >= 0 ? 'export-card' : '']">
                                    <div class="card-body search-result-block">
                                        <div class="row">
                                            <div v-if="t != 'Person'" class="col-5 text-left search-result-text">
                                                <strong>Repository</strong><br/><em><u>{{v.__repo_name}}</u></em><br/>
                                                <div v-if="t != 'Repository'" class="search-result-text">
                                                    <strong>Schema</strong><br/><em><u>{{v.__schema_name}}</u></em>
                                                </div>
                                            </div>
                                            <div v-else class="col-12 text-left search-result-text">
                                                <strong>Repositories</strong>
                                                <div v-for="z in v.__repos" class="search-result-text">
                                                    {{z}}
                                                </div>
                                                <div v-if="!('__repos' in v)" class="search-result-text">
                                                    None
                                                </div>
                                            </div>
                                            <div v-if="t != 'Person'" class="col-6 text-right search-result-text">
                                                <router-link v-if="t == 'Data'" class="btn btn-primary btn-block" :to="'/data/edit/' + v.__id">Edit</router-link>
                                                <router-link v-if="(t == 'SchemaField' || t == 'SchemaType') && v.__repo_id == activeRepoID" class="btn btn-primary btn-block" :to="'/schema/edit/' + v['__schema_id']">Edit</router-link>
                                                <button v-if="v.__repo_id != activeRepoID && t != 'Data'" class="btn btn-secondary" disabled><small>Load Repo</small></button>
                                                <button v-if="t == 'Data'" class="btn btn-primary btn-sm btn-block" v-on:click="addToExport(v.__id)"><small>Export</small></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body search-result-block">
                                        <div class="row">
                                            <div class="col-12">
                                                <div v-for="x, y in displayDataForNode(v)" class="row">
                                                    <div class="col-12 search-result-text">
                                                        <h6>{{y}}</h6>
                                                        <p>{{x}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tab>
                </tabs>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style>
  @import "~vue-tabs-component/docs/resources/tabs-component.css";
</style>

<script>

export default {
  name: 'search',
  data: function() {
    return {
      state: this.$store.state,
      initialTab: false,
      exportRecords: [],
      exportCount: 0
    }
  },
  computed: {
	results: function() {
	    return this.$store.getters['search/getResults'];
	},
	counts: function() {
	    return this.$store.getters['search/getCounts'];
	},
    totalCounts: function() {
        return this.$store.getters['search/getTotalCounts'];
    },
    slices: function() {
        return this.$store.getters['search/getSlices'];
    },
	count: function() {
	    return this.$store.getters['search/getCount'];
	},
	expression: function() {
	    return this.$store.getters['search/getLastSearch'];
	},
    activeRepoID: function() {
        return this.$store.getters['repos/getActiveRepoID'];
    },
    userInfo: function(){
        return this.$store.getters['people/getUserInfo'];
    }
  },
  updated: function(){
    var clicked = false;
    if(!this.initialTab){
        var tab_els = document.querySelectorAll("a[role='tab']");
        for(var i = 0; i < tab_els.legnth; i++){
            if(tab_els[i].href.indexOf('Data') > -1){
                var tab_el = tab_els[i];
                tab_el.click();
                clicked = true;
                break;
            }
        }
        if(!clicked){
            tab_els[0].click();
        }
    }
    this.initialTab = true;
  },
  methods: {
    displayDataForNode: function(v) {
	    var disp = {};
	    for(var i in v) {
	        i = i + "";
	        if (i.substr(0,2) == '__') { continue; }
            if(!v[i] || v[i] == ''){
                v[i] = 'EMPTY';
            }
            disp[i] = v[i];
	    }
	    return disp;
	},
    loadPage: function(exp, node, start, end) {
        this.$store.dispatch('search/pagingSearch', [exp, node, start, end]);
    },
    addToExport:function(data_id){
        var data_pos = this.exportRecords.indexOf(data_id);
        if(data_pos < 0){
            this.exportRecords.push(data_id);
        } else {
            this.exportRecords.splice(data_pos, 1);
        }
        this.exportCount = this.exportRecords.length;
    },
    storeExportRecords:function(){
        var self = this;
        this.$store.dispatch('export_data/storeExportRecords', [this.expression, this.exportRecords, this.userInfo.email]).then(function(){
            self.$router.push('export-data');
        });
    }
  }
}
</script>
