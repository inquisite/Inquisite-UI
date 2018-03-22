
<template>
<div id="search">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-form">
        <div class="card-header text-center">
			Search results<span v-if="expression">: <em>{{expression}}</em></span>
		 </div>
        <div class="card-block">

          <flashmessage/>
            <div v-if="results.length == 0"><h2>Nothing found</h2></div>
            <div v-else>
                <tabs>
                    <tab v-if="counts[t] > 0" v-for="r,t in results" :name="t + ' (' + counts[t] + ' of ' + totalCounts[t] + ')'">
                        <div class="row">
                            <div v-for="v, k in r" class="col-12 col-sm-12 col-md-6 col-lg-3">
                                <div class="card">
                                    <div class="card-block search-result-block">
                                        <div class="row">
                                            <div class="col-5 text-left search-result-text">
                                                <strong>Repository</strong><br/><em><u>{{v.__repo_name}}</u></em><br/>
                                                <strong>Schema</strong><br/><em><u>{{v.__schema_name}}</u></em>
                                            </div>
                                            <div class="col-6 text-right search-result-text">
                                                <router-link v-if="t == 'Data'" class="btn btn-primary btn-block" :to="'/data/edit/' + v.__id">Edit</router-link>
                                                <router-link v-if="(t == 'SchemaField' || t == 'SchemaType') && v.__repo_id == activeRepoID" class="btn btn-primary btn-block" :to="'/schema/edit/' + v['__schema_id']">Edit</router-link>
                                                <button v-if="v.__repo_id != activeRepoID && t != 'Data'" class="btn btn-secondary" disabled><small>Load Repo</small></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-block search-result-block">
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
      state: this.$store.state
    }
  },
  computed: {
	results: function() {
        console.log("hello", this.$store.getters['search/getResults']);
	    return this.$store.getters['search/getResults'];
	},
	counts: function() {
	    return this.$store.getters['search/getCounts'];
	},
    totalCounts: function() {
        return this.$store.getters['search/getTotalCounts'];
    },
	count: function() {
	    return this.$store.getters['search/getCount'];
	},
	expression: function() {
	    return this.$store.getters['search/getLastSearch'];
	},
    activeRepoID: function() {
        return this.$store.getters['repos/getActiveRepoID'];
    }
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
	}
  }
}
</script>
