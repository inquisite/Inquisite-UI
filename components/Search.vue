<template>
<div id="seach">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <div class="card card-form">
        <div class="card-header text-center">
			Search results
		 </div>
        <div class="card-block">

          <div id="search-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
            <div>Found {{count}}</div>
            <ul>
                <li v-for="r, k in results"><strong>From repository <u>{{r.repository_name}}</u>:</strong> {{r.display}}</li>
            </ul>
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
