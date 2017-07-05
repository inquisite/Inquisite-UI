<template>
<div id="search">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-form">
        <div class="card-header text-center">
			Search results
		 </div>
        <div class="card-block">

          <div id="search-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
            <h2>{{count}} found</h2>
            <ol>
                <li v-for="r, k in results"><router-link class="btn btn-primary btn-sm" :to="'/data/edit/' + r.data_id">Edit</router-link> <strong>From repository <u>{{r.repository_name}}</u>:</strong> {{r.display}}</li>
            </ol>
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
	count: function() {
	    return this.results.length;
	}
  },
  methods: {

  }   
}
</script>
