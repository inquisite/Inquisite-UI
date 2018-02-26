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
            <div v-for="r,t in results">
                <div class="row">
                    <div class="col-12">
                        <h2>{{t}} ({{counts[t]}})</h2>
                    </div>
                </div>
                <div class="row">
                    <div v-if="t == 'Data'" v-for="v, k in r" class="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-6 text-left">
                                        <strong>Repository</strong><br/><em><u>{{v.__repo_name}}</u></em>
                                    </div>
                                    <div class="col-6 text-right">
                                        <strong>Schema</strong><br/><em><u>{{v.__schema_name}}</u></em>
                                    </div>
                                </div>
                            </div>
                            <div class="card-block">
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
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-12">
                                        <router-link class="btn btn-primary btn-block" :to="'/data/edit/' + v.__id">Edit</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ol>
                    <li v-if="t == 'Repository'" v-for="v, k in r"><router-link class="btn btn-primary btn-sm" :to="'/data/edit/' + v.__id">View</router-link> {{v.name}}{{v}}</li>
                    <li v-if="t == 'Person'" v-for="v, k in r">{{v.forename}} {{v.surname}} ({{v.email}})</li>
                </ol>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

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
	    return this.$store.getters['search/getResults'];
	},
	counts: function() {
	    return this.$store.getters['search/getCounts'];
	},
	count: function() {
	    return this.$store.getters['search/getCount'];
	},
	expression: function() {
	    return this.$store.getters['search/getLastSearch'];
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
