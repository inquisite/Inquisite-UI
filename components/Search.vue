<template>
<div id="search">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-form">
        <div class="card-header text-center">
			Search results<span v-if="expression">: <em>{{expression}}</em></span>
		 </div>
        <div class="card-block">

          <div id="search-msg" class="alert alert-info" role="alert" v-show="message !== ''">{{message}}</div>
            <div v-if="results.length == 0"><h2>Nothing found</h2></div>
            <div v-for="r,t in results">
                <h2>{{t}} ({{counts[t]}})</h2>
                <ol>
                    <li v-if="t == 'Data'" v-for="v, k in r"><router-link class="btn btn-primary btn-sm" :to="'/data/edit/' + v.__id">Edit</router-link> <strong>From repository <em><u>{{v.__repo_name}}</u></em>:</strong> 
                        {{displayDataForNode(v)}}
                    </li>
                    <li v-if="t == 'Repository'" v-for="v, k in r"><router-link class="btn btn-primary btn-sm" :to="'/data/edit/' + v.__id">View</router-link> {{v.name}}</li>
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
	message: function() { return this.$store.state.msg; },
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
	    var disp = [];
	    for(var i in v) {
	        i = i + "";
	        if (i.substr(0,2) == '__') { continue; }
	        disp.push(i + "=" + v[i]);
	    }
	    return disp.join("; ");
	}
  }   
}
</script>
